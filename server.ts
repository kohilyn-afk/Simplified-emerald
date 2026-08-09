import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Diagnostic API route
app.post('/api/diagnostic', async (req, res) => {
  try {
    const { companyName, industry, employeeCount, annualRevenue, region, primaryGoal, currentChallenges } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback static analysis if no key or error
    if (!apiKey) {
      return res.json({
        success: true,
        isFallback: true,
        data: {
          scores: {
            sustainability: 64,
            accounting: 78,
            analytics: 52,
            overall: 65,
          },
          tier: "Bursa Main Market Compliance Tier 2",
          executiveSummary: `Based on ${companyName || 'your organization'}'s profile in ${industry || 'your industry'} (${region || 'Malaysia'}), you possess established MFRS financial accounting baseline controls, but face critical compliance vulnerabilities regarding Bursa Malaysia Scope 1-3 carbon reporting and automated TNB utility invoice tracking.`,
          gaps: [
            "Incomplete Scope 3 GHG carbon inventory across Tier-1 regional suppliers under Bursa Sustainability Framework.",
            "Manual PDF utility & TNB invoice processing creating financial reporting restatement risk under MFRS.",
            "Lack of real-time data integration connecting SAP/SQL Accounting ERP ledgers to C-Suite reporting endpoints.",
            "Unquantified CBAM and Shadow Carbon risk exposure for regional cross-border commerce."
          ],
          roadmap: [
            {
              phase: "Phase 1 (Days 1 - 30)",
              title: "Scope 1-3 Baseline & ISSB Gap Audit",
              description: "Establish verifiable GHG Protocol baseline, audit general ledger for carbon liabilities, and conduct Bursa Malaysia gap assessment."
            },
            {
              phase: "Phase 2 (Days 31 - 60)",
              title: "MFRS Controls & TNB Utility Pipeline Integration",
              description: "Embed carbon accounting into month-end closing, automate TNB OCR extraction, and link ERP data to Snowflake."
            },
            {
              phase: "Phase 3 (Days 61 - 90)",
              title: "Executive Suite & Board Sign-Off Pack",
              description: "Deploy PowerBI executive suite, verify audit trails, and prepare Bursa Malaysia ESG portal submission pack."
            }
          ],
          projectedSavings: "RM 420,000 - RM 1.2M",
          paybackMonths: 9
        }
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `
You are Koh I-Lyn, FCCA, CA(M), Oxford-Certified Sustainability Specialist & Independent C-Suite Advisor for Malaysian enterprise clients.
Analyze the following enterprise profile for Bursa Malaysia ESG reporting, MFRS financial controls, and Data Analytics readiness:

Company Name: ${companyName || 'Malaysian Enterprise Client'}
Industry: ${industry || 'Manufacturing'}
Employee Count: ${employeeCount || '500 - 2,500 Employees'}
Annual Revenue: ${annualRevenue || 'RM 100M - RM 500M'}
Region: ${region || 'Malaysia'}
Primary Goal: ${primaryGoal || 'Bursa ESG Compliance & TNB Energy Optimization'}
Current Challenges: ${currentChallenges || 'Manual spreadsheet closes and fragmented Scope 3 supplier data'}

Respond ONLY with valid JSON (no markdown block wrappers or backticks) matching this structure:
{
  "scores": {
    "sustainability": <number 0-100>,
    "accounting": <number 0-100>,
    "analytics": <number 0-100>,
    "overall": <number 0-100>
  },
  "tier": "<e.g. Bursa Main Market Compliance Tier 1 or Tier 2>",
  "executiveSummary": "<2-3 sentences succinct, authoritative executive summary incorporating MFRS standards and Bursa ESG guidelines>",
  "gaps": [
    "<specific regulatory gap 1>",
    "<specific regulatory gap 2>",
    "<specific regulatory gap 3>",
    "<specific regulatory gap 4>"
  ],
  "roadmap": [
    {
      "phase": "Phase 1 (Days 1 - 30)",
      "title": "<title>",
      "description": "<description>"
    },
    {
      "phase": "Phase 2 (Days 31 - 60)",
      "title": "<title>",
      "description": "<description>"
    },
    {
      "phase": "Phase 3 (Days 61 - 90)",
      "title": "<title>",
      "description": "<description>"
    }
  ],
  "projectedSavings": "<e.g. RM 480,000 - RM 1.4M>",
  "paybackMonths": <number e.g. 8>
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from AI model');
    }

    const parsedData = JSON.parse(text);
    return res.json({
      success: true,
      isFallback: false,
      data: parsedData
    });

  } catch (error) {
    console.error('Diagnostic generation error:', error);
    // Return structured default on error
    return res.json({
      success: true,
      isFallback: true,
      data: {
        scores: {
          sustainability: 62,
          accounting: 75,
          analytics: 50,
          overall: 62,
        },
        tier: "Bursa Main Market Compliance Tier 2",
        executiveSummary: `Based on your organization's profile, you possess established MFRS financial accounting baseline controls, but face key compliance vulnerabilities regarding Bursa Malaysia Scope 1-3 disclosures and energy management.`,
        gaps: [
          "Incomplete Scope 3 GHG carbon inventory across tier-1 regional suppliers under Bursa Sustainability Framework.",
          "Manual PDF utility & TNB invoice processing creating financial reporting restatement risk.",
          "Manual tracking of energy management and carbon data creating operational inefficiencies.",
          "Exposure to CBAM tariffs and shadow carbon liabilities in cross-border supply chains."
        ],
        roadmap: [
          {
            phase: "Phase 1 (Days 1 - 30)",
            title: "Scope 1-3 Baseline & ISSB Alignment",
            description: "Establish verifiable GHG Protocol baseline and conduct Bursa Malaysia gap assessment."
          },
          {
            phase: "Phase 2 (Days 31 - 60)",
            title: "MFRS Integrated ESG Controls",
            description: "Embed carbon liabilities into month-end general ledger closing under MFRS standards."
          },
          {
            phase: "Phase 3 (Days 61 - 90)",
            title: "Automated Utility Pipeline & PowerBI Suite",
            description: "Deploy automated utility OCR and ERP pipelines into Snowflake & C-Suite PowerBI dashboards."
          }
        ],
        projectedSavings: "RM 350,000 - RM 1.1M",
        paybackMonths: 10
      }
    });
  }
});

// Contact Endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, company, pillar, message } = req.body;
  console.log(`Received contact request from ${name} (${email}, ${company}): [${pillar}] ${message}`);
  return res.json({
    success: true,
    message: "Thank you for reaching out to Koh I-Lyn Advisory. Your message has been logged. Koh I-Lyn will respond directly within 24 hours."
  });
});

// Server Initialization
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Koh I-Lyn & Co Dark Forest Server running on http://localhost:${PORT}`);
  });
}

startServer();
