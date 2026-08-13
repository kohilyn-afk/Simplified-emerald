import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// --- VISITOR COUNTER STATE & REAL SESSION PERSISTENCE ---
const STATS_FILE = path.join(process.cwd(), 'visitor-stats.json');

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

let visitorState = {
  totalVisitors: 1,
  todayVisitors: 1,
  lastResetDate: getTodayString(),
};

// In-memory real active sessions map: clientId -> lastActiveTimestamp
const activeSessionsMap = new Map<string, number>();
const ACTIVE_SESSION_TIMEOUT_MS = 3 * 60 * 1000; // 3 minutes

function cleanStaleSessions(): number {
  const now = Date.now();
  for (const [clientId, lastSeen] of activeSessionsMap.entries()) {
    if (now - lastSeen > ACTIVE_SESSION_TIMEOUT_MS) {
      activeSessionsMap.delete(clientId);
    }
  }
  return Math.max(1, activeSessionsMap.size);
}

// Load saved stats from filesystem if available
if (fs.existsSync(STATS_FILE)) {
  try {
    const raw = fs.readFileSync(STATS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.totalVisitors === 'number') {
      visitorState.totalVisitors = parsed.totalVisitors;
      visitorState.todayVisitors = typeof parsed.todayVisitors === 'number' ? parsed.todayVisitors : 1;
      visitorState.lastResetDate = parsed.lastResetDate || getTodayString();
    }
  } catch (err) {
    console.error('Error reading visitor stats:', err);
  }
}

// Reset today count if date changed
if (visitorState.lastResetDate !== getTodayString()) {
  visitorState.todayVisitors = 1;
  visitorState.lastResetDate = getTodayString();
}

function saveVisitorStats() {
  try {
    fs.writeFileSync(
      STATS_FILE,
      JSON.stringify(
        {
          totalVisitors: visitorState.totalVisitors,
          todayVisitors: visitorState.todayVisitors,
          lastResetDate: visitorState.lastResetDate,
        },
        null,
        2
      )
    );
  } catch (err) {
    console.error('Error saving visitor stats:', err);
  }
}

function recordActivity(req: express.Request): string {
  const clientId =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    req.socket.remoteAddress ||
    'anon_client';
  activeSessionsMap.set(clientId, Date.now());
  return clientId;
}

// GET /api/visitor-count
app.get('/api/visitor-count', (req, res) => {
  recordActivity(req);
  const activeCount = cleanStaleSessions();

  if (visitorState.lastResetDate !== getTodayString()) {
    visitorState.todayVisitors = 1;
    visitorState.lastResetDate = getTodayString();
    saveVisitorStats();
  }

  res.json({
    success: true,
    totalVisitors: visitorState.totalVisitors,
    todayVisitors: visitorState.todayVisitors,
    activeSessions: activeCount,
    lastUpdated: new Date().toISOString(),
  });
});

// POST /api/visitor-count/increment
app.post('/api/visitor-count/increment', (req, res) => {
  recordActivity(req);

  if (visitorState.lastResetDate !== getTodayString()) {
    visitorState.todayVisitors = 0;
    visitorState.lastResetDate = getTodayString();
  }

  visitorState.totalVisitors += 1;
  visitorState.todayVisitors += 1;
  saveVisitorStats();

  const activeCount = cleanStaleSessions();

  res.json({
    success: true,
    totalVisitors: visitorState.totalVisitors,
    todayVisitors: visitorState.todayVisitors,
    activeSessions: activeCount,
  });
});

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

// Visitor AI Chatbot Endpoint using Gemini 3.6 Flash
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userContext } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback static AI response if no API key present
    if (!apiKey) {
      const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';
      let reply = "Welcome to Koh I-Lyn & Co. I am the C-Suite Advisory Assistant. How can I assist you today with Bursa ESG compliance, MFRS financial accounting, or C-Suite data analytics?";

      if (lastUserMsg.includes('bursa') || lastUserMsg.includes('scope') || lastUserMsg.includes('esg')) {
        reply = "Bursa Malaysia requires Main Market listed companies to report Scope 1 and Scope 2 GHG emissions, with progressive mandates extending to Scope 3 supplier data and TCFD/ISSB climate risks. Koh I-Lyn, FCCA, CA(M), provides direct gap assessments and verifiable carbon accounting frameworks. Would you like to use our interactive Scope Planner to build a customized engagement proposal?";
      } else if (lastUserMsg.includes('mfrs') || lastUserMsg.includes('accounting') || lastUserMsg.includes('audit')) {
        reply = "Under MFRS and statutory reporting standards, carbon accounting and energy liabilities must directly reconcile with general ledgers. Koh I-Lyn specializes in establishing MFRS-compliant month-end closing controls and pre-audit data packages to avoid financial restatements.";
      } else if (lastUserMsg.includes('tnb') || lastUserMsg.includes('ocr') || lastUserMsg.includes('data') || lastUserMsg.includes('analytics')) {
        reply = "Our automated analytics pipelines extract line-item data from PDF TNB utility invoices via OCR and feed them directly into SQL/Snowflake databases and C-Suite PowerBI dashboards for real-time carbon and energy tracking.";
      } else if (lastUserMsg.includes('proposal') || lastUserMsg.includes('contact') || lastUserMsg.includes('consult')) {
        reply = "You can request an official executive proposal directly through this platform! Simply click 'Request Proposal' or fill out our interactive Scope Planner below to receive a formal consultation timeline from Koh I-Lyn.";
      }

      return res.json({
        success: true,
        isFallback: true,
        reply
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

    const systemInstruction = `
You are the executive AI Advisory Concierge for Koh I-Lyn & Co (kohilyn.com), an elite Malaysian C-Suite Advisory Practice.
The firm is led by Koh I-Lyn, FCCA, CA(M), Oxford-Certified Sustainability Specialist.

Key Expertise & Offerings of the Firm:
1. Sustainability & Carbon Accounting: Scope 1, 2, and 3 GHG Protocol reporting, Bursa Malaysia Sustainability Reporting Framework, CBAM readiness, TNB energy optimization, ISSB/TCFD alignment.
2. MFRS Financial Accounting & Controls: Malaysian Financial Reporting Standards, statutory audit readiness, general ledger carbon provisions, month-end financial statement reconciliation.
3. Data Analytics & C-Suite Dashboards: Automated PDF TNB/utility invoice OCR pipelines, SQL/Snowflake data warehousing, PowerBI executive dashboards, ERP integration (SAP, SQL Accounting, AutoCount).
4. Sustainable Forestry & Carbon Economics: Timber inventory valuation, carbon offset accounting, sustainable forestry financial models.

Behavioral Guidelines:
- Tone: Executive, concise, authoritative, professional, courteous, and warm.
- Be direct and informative. Keep responses under 150 words unless detailed technical explanation is requested.
- When helpful, encourage the user to explore the interactive "Executive Scope Planner" or click "Request Proposal" to connect with Koh I-Lyn directly.
- Context provided by user: ${JSON.stringify(userContext || {})}
`;

    // Convert message history for Gemini model
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text || "I am available to answer any questions regarding Bursa Malaysia ESG compliance, MFRS accounting, or data analytics.";

    return res.json({
      success: true,
      isFallback: false,
      reply
    });

  } catch (error) {
    console.error('Visitor Chat API error:', error);
    return res.json({
      success: true,
      isFallback: true,
      reply: "Thank you for reaching out. I am currently offline briefly, but Koh I-Lyn is available directly for C-suite consultations. Please click 'Request Proposal' or use our Scope Planner to submit your inquiry."
    });
  }
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
