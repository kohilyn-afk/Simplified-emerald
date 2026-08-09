export type PillarType = 'sustainability' | 'accounting' | 'analytics';

export interface ServiceItem {
  id: string;
  pillar: PillarType;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  impactMetric: string;
  details: string;
}

export interface AdvisoryModule {
  id: string;
  pillar: PillarType;
  name: string;
  description: string;
  basePrice: number; // in RM
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  impact: string;
  description: string;
  metrics: { label: string; value: string }[];
}

export interface RoiState {
  targetReductionPercent: number; // e.g. 10 - 70%
  annualComplianceHours: number; // e.g. 100 - 2000
  annualUtilitySpend: number; // in RM
  cbamRiskFactor: 'Low' | 'Medium' | 'High';
}
