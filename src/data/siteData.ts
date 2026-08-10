import { ServiceItem, AdvisoryModule, CaseStudy } from '../types';

export const KOHILYN_CREDENTIALS = [
  { abbr: 'FCCA', title: 'Fellow of the Association of Chartered Certified Accountants' },
  { abbr: 'CA(M)', title: 'Chartered Accountant, Malaysian Institute of Accountants' },
  { abbr: 'BA(Hons) UK', title: 'Bachelor of Arts with Honours (United Kingdom)' },
  { abbr: 'Oxford Certified', title: 'Oxford Certified Sustainable Corporations Expert' }
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: 'sustainability',
    pillar: 'sustainability',
    title: '1) Sustainability',
    subtitle: 'Embed Sustainability in Design, Industry Carbon Benchmarking & Standards Assessment',
    description: 'Comprehensive sustainability counsel covering eco-design integration, carbon emission benchmarking against industry baselines, and gap checks against recognized standards (GRI, ISSB, Bursa Malaysia).',
    deliverables: [
      'Embed sustainability directly into product and operational design',
      'Scope 1, 2 & 3 carbon emission calculation & industry baseline benchmarking',
      'Compliance gap check against Bursa Malaysia, ISSB (IFRS S1/S2) & GRI standards',
      'Annual ESG disclosure roadmap & sustainability reporting pack'
    ],
    impactMetric: 'RM 45,000 / annum',
    details: 'Our Oxford Certified Sustainable Corporations Expert practice assists leadership in embedding eco-design into corporate operations, benchmarking GHG emissions against sector peers, and ensuring compliance with regulatory reporting standards.'
  },
  {
    id: 'accounting',
    pillar: 'accounting',
    title: '2) Accounting and Book-keeping',
    subtitle: 'Full-Scope General Ledger, SST Compliance & E-Invoicing Integration',
    description: 'Complete corporate accounting and bookkeeping management, covering monthly general ledger closes, Sales & Service Tax (SST) filing, and seamless e-invoicing workflow readiness under standard guidelines.',
    deliverables: [
      'Full-scope general ledger maintenance & month-end closing',
      'Sales & Service Tax (SST) computation, reconciliation & submission',
      'LHDN E-Invoicing integration, workflow alignment & audit trail',
      'Statutory-compliant annual financial statements & audit prep'
    ],
    impactMetric: 'RM 24,000 / annum',
    details: 'Led by Fellow ACCA and CA(M) expertise, we maintain high-precision bookkeeping, ensure full SST statutory compliance, and implement LHDN e-invoicing workflows tailored for Malaysian enterprises.'
  },
  {
    id: 'analytics',
    pillar: 'analytics',
    title: '3) Data Analytics for Company',
    subtitle: 'Financial Health Benchmark Ratios & Executive Performance Analytics',
    description: 'Transform financial and ledger data into actionable executive insights with financial health benchmark ratios, solvency metrics, liquidity analytics, and performance monitoring dashboards.',
    deliverables: [
      'Financial health benchmark ratios (Liquidity, Solvency, Efficiency & Profitability)',
      'Cross-company financial performance comparison & trend analytics',
      'Automated ledger & ERP data synthesis for executive dashboards',
      'Quarterly C-Suite financial health diagnostic & ratio commentary'
    ],
    impactMetric: 'RM 10,000 / annum',
    details: 'We build tailored financial data analytics suites to evaluate your company’s financial health ratios against industry benchmarks, giving directors clear, real-time metrics for strategic decision-making.'
  }
];

export const ADVISORY_MODULES: AdvisoryModule[] = [
  {
    id: 'sustainability',
    pillar: 'sustainability',
    name: '1) Sustainability',
    description: 'Embed sustainability in design, carbon emission calculation & industry benchmarking, and checks against standards (GRI/ISSB/Bursa).',
    basePrice: 45000
  },
  {
    id: 'accounting',
    pillar: 'accounting',
    name: '2) Accounting and Book-keeping',
    description: 'Full-scope accounting and bookkeeping, SST compliance and statutory filing, plus e-invoicing workflow readiness.',
    basePrice: 24000
  },
  {
    id: 'analytics',
    pillar: 'analytics',
    name: '3) Data Analytics for Company',
    description: 'Company data analytics featuring financial health benchmark ratios, liquidity & solvency metrics, and executive insights.',
    basePrice: 10000
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-bursa-plc',
    client: 'Bursa Main Market Consumer Goods PLC',
    industry: 'Consumer Goods & Retail',
    impact: 'Achieved Full ISSB & Bursa Readiness in 60 Days',
    description: 'Audited corporate governance and environmental data against ISSB IFRS S1/S2 and Bursa Sustainability Guide, closing 18 key disclosure gaps ahead of mandatory filing.',
    metrics: [
      { label: 'Gaps Closed', value: '18 / 18' },
      { label: 'Time to Filing', value: '60 Days' },
      { label: 'Audit Compliance', value: '100%' }
    ]
  },
  {
    id: 'cs-johor-agri',
    client: 'Johor Agricultural Processing Conglomerate',
    industry: 'Agriculture & Processing',
    impact: 'Diverted 8,200 Tonnes Waste & Cut Costs by RM 1.4M',
    description: 'Converted biomass processing byproducts into bio-fertilizer and renewable heat, eliminating landfill fees and qualifying for MIDA Green Tax Incentives (GITA).',
    metrics: [
      { label: 'Annual Savings', value: 'RM 1.4M' },
      { label: 'Waste Diverted', value: '8,200 Tonnes' },
      { label: 'MIDA Tax Yield', value: 'RM 580K' }
    ]
  },
  {
    id: 'cs-tech-enterprise',
    client: 'Malaysian Technology Services Enterprise',
    industry: 'IT & Data Infrastructure',
    impact: 'Seamless Mandatory Filing Sign-Off in 45 Days',
    description: 'Delivered inaugural Bursa-aligned ESG disclosure report in 45 days, receiving top-tier rating from corporate stakeholders and institutional investors.',
    metrics: [
      { label: 'Turnaround', value: '45 Days' },
      { label: 'Investor Rating', value: 'Top Tier' },
      { label: 'Data Accuracy', value: '99.8%' }
    ]
  },
  {
    id: 'cs-kl-retail',
    client: 'Kuala Lumpur Multi-Branch Retail Group',
    industry: 'Multi-Unit Retail',
    impact: 'Reduced Month-End Close Time by 60%',
    description: 'Restructured chart of accounts and general ledger workflows, establishing error-free monthly financial statements and automated TNB energy tracking across 42 branches.',
    metrics: [
      { label: 'Close Reduction', value: '60% Faster' },
      { label: 'Branches Integrated', value: '42 Units' },
      { label: 'Error Rate', value: '0.00%' }
    ]
  }
];

export const INDUSTRIES = [
  'Manufacturing & Industrial Products',
  'Agriculture & Plantation Processing',
  'Technology & Digital Infrastructure',
  'Consumer Goods & Multi-Unit Retail',
  'Energy, Utilities & Utilities OCR',
  'Real Estate & Construction',
  'Financial Services & Logistics'
];

export const REGIONS = [
  'Malaysia - Klang Valley / Selangor',
  'Malaysia - Johor & Southern Hub',
  'Malaysia - Penang & Northern Belt',
  'Malaysia - East Malaysia (Sabah/Sarawak)',
  'Regional ASEAN Commerce'
];

export const PROTOTYPE_PLANT_DATA = [
  { month: 'Jan', revenueRM: 1420, utilityRM: 182, carbonTaxRM: 24, CO2Tonnes: 410 },
  { month: 'Feb', revenueRM: 1580, utilityRM: 195, carbonTaxRM: 26, CO2Tonnes: 435 },
  { month: 'Mar', revenueRM: 1650, utilityRM: 188, carbonTaxRM: 22, CO2Tonnes: 390 },
  { month: 'Apr', revenueRM: 1720, utilityRM: 170, carbonTaxRM: 18, CO2Tonnes: 350 },
  { month: 'May', revenueRM: 1890, utilityRM: 162, carbonTaxRM: 15, CO2Tonnes: 320 },
  { month: 'Jun', revenueRM: 2050, utilityRM: 154, carbonTaxRM: 12, CO2Tonnes: 295 },
];
