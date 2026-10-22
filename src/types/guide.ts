 export type DifficultyLevel = 'Low' | 'Medium' | 'High' | 'Extreme';

export type EvidenceStatus =
  | 'VERIFIED'
  | 'ESTIMATE'
  | 'CONDITIONAL'
  | 'UNVERIFIED';

export interface ContextFactor {
  factor:
    | 'App Type'
    | 'User Type (Internal vs External)'
    | 'Requested Scopes'
    | 'Dev/Testing vs Production'
    | 'Public Distribution';
  summary: string;
  impact: string;
}

export interface AppFlowVariant {
  appType:
    | 'Web Server (Confidential Client)'
    | 'Single Page App / Client-Side (Public Client)'
    | 'Mobile / Desktop (Native PKCE)'
    | 'Service / Daemon (Machine-to-Machine)';
  flowName: string;
  clientSecretRequired: boolean;
  pkceRequired: boolean;
  redirectUriRules: string;
  notes: string;
}

export type FindingCategory =
  | 'Provider-Specific Evidence'
  | 'General OAuth Standards'
  | 'Product Estimates';

export interface EvidenceFinding {
  finding: string;
  category: FindingCategory;
  status: EvidenceStatus;
  sourceTitle: string;
  sourceUrl: string;
  lastChecked: string;
  basisOrNotes: string;
}

export interface EffortBreakdownItem {
  task: string;
  hours: string;
  note: string;
  status?: EvidenceStatus;
}

export interface ApprovalStage {
  stage: string;
  duration: string;
  durationStatus: EvidenceStatus;
  details: string;
  requiredFor: string;
  conditionNote?: string;
}

export interface ChecklistStep {
  id: string;
  phase: 'Console Setup' | 'Scopes & Consent' | 'Code & Exchange' | 'Review & Production';
  title: string;
  description: string;
  actor: 'developer' | 'agent' | 'hybrid';
  actorLabel: string;
  evidenceStatus: EvidenceStatus;
  details?: string[];
  snippet?: {
    language: string;
    code: string;
    label: string;
  };
  links?: {
    title: string;
    url: string;
  }[];
  required: boolean;
}

export interface CommonBlocker {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium';
  symptom: string;
  rootCause: string;
  resolution: string;
  evidenceStatus: EvidenceStatus;
  affectedScopes?: string[];
}

export interface RaciItem {
  task: string;
  developerRole: string;
  agentRole: string;
  category: 'Compliance & Legal' | 'Console Configuration' | 'Runtime & Tokens';
  rationale: string;
}

export interface EvidenceSource {
  title: string;
  url: string;
  status: EvidenceStatus;
  lastChecked: string;
  verifiedFact: string;
  quoteOrSnippet?: string;
}

export interface OAuthGuide {
  id: string;
  name: string;
  provider: string;
  category: string;
  tagline: string;
  overview: string;
  icon: string;
  difficulty: DifficultyLevel;
  difficultyReason: string;
  authProtocol: string;
  tokenEndpoints: {
    authorizationUrl: string;
    tokenUrl: string;
    revocationUrl?: string;
    userInfoUrl?: string;
  };
  whatChangesTheAnswer: ContextFactor[];
  flowVariants: AppFlowVariant[];
  handsOnEffort: {
    minHours: number;
    maxHours: number;
    label: string;
    evidenceStatus: EvidenceStatus;
    basisNotes: string;
    breakdown: EffortBreakdownItem[];
  };
  approvalWaitTime: {
    timeline: string;
    tier: string;
    evidenceStatus: EvidenceStatus;
    distinctionNotice: string;
    basisNotes: string;
    isBlockerRisk: boolean;
    estimatedCost?: string;
    costEvidenceStatus?: EvidenceStatus;
    stages: ApprovalStage[];
  };
  composioAdvantage: {
    timeWithComposio: string;
    linesOfCode: string;
    handledForYou: string[];
    benefitSummary: string;
  };
  recommendedScopes: {
    scope: string;
    description: string;
    riskLevel: 'Normal' | 'Sensitive' | 'Restricted';
    verificationImpact: string;
  }[];
  checklist: ChecklistStep[];
  blockers: CommonBlocker[];
  raci: RaciItem[];
  evidenceFindings: EvidenceFinding[];
  evidenceSources: EvidenceSource[];
  auditDisclaimer: string;
  disclaimerText: string;
  isAiGenerated?: boolean;
  isLiveGrounding?: boolean;
  researchMechanism?: string;
  generatedAt?: string;
}

export interface ResearchRequest {
  query: string;
  url?: string;
}

export interface ResearchResponse {
  guide: OAuthGuide;
  groundingUrls?: { title: string; url: string }[];
  sourceModel?: string;
}
