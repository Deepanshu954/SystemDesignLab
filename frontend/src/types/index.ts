export interface CaseStudySummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: string;
  readingTimeMinutes: number;
  createdAt: string;
}

export interface CaseStudyDetail extends CaseStudySummary {
  architectureDiagramJson?: string;
  capacityMathJson?: string;
  fullContentMarkdown: string;
  updatedAt: string;
}

export interface ConceptSummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  difficulty: string;
  readingTimeMinutes: number;
  createdAt: string;
}

export interface ConceptDetail extends ConceptSummary {
  keyTakeawaysJson?: string;
  fullContentMarkdown: string;
  updatedAt: string;
}

export interface InterviewQuestion {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  questionText: string;
  answerGuide: string;
  keyPointsJson?: string;
  createdAt: string;
}

export interface CapacityCalculationRequest {
  dailyActiveUsers: number;
  requestsPerUserDay: number;
  readWriteRatio: number;
  payloadSizeBytes: number;
  retentionYears: number;
  peakMultiplier?: number;
}

export interface CapacityCalculationResponse {
  totalRequestsPerDay: number;
  avgQps: number;
  peakQps: number;
  writeQps: number;
  readQps: number;
  dailyStorageGb: number;
  fiveYearStorageTb: number;
  ingressBandwidthMbps: number;
  egressBandwidthMbps: number;
  ramCacheRequiredGb: number;
}

export interface SystemTemplate {
  id: string;
  name: string;
  description: string;
  dailyActiveUsers: number;
  requestsPerUserDay: number;
  readWriteRatio: number;
  payloadSizeBytes: number;
  retentionYears: number;
  peakMultiplier: number;
}

export interface Bookmark {
  id: string;
  userId: string;
  itemType: string;
  itemId: string;
  itemTitle: string;
  itemSlug: string;
  createdAt: string;
}

export interface FeedbackSubmission {
  pageUrl: string;
  rating: number;
  category: string;
  comment?: string;
}
