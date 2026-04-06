export type PipelineStage = 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired';
export type ApplicationStatus = 'New' | 'In Review' | 'Shortlisted' | 'Rejected';
export type QualificationLevel = 'Any' | 'Junior' | 'Mid' | 'Senior' | 'Lead';
export type ScoreThreshold = '>70%' | '>80%' | '>90%' | 'Any';

export type CandidateStatus =
  | 'New'
  | 'Screen Call'
  | 'Assignment'
  | 'Ass. Center'
  | 'Ex. Interview'
  | 'Offer'
  | 'Hired';

export type ScoreBadge = 'Badge' | 'Past Applicant' | 'Silver Medalist' | null;

export interface Candidate {
  id: number;
  name: string;
  role: string;
  company: string;
  experienceYears: string;
  score: number;
  scoreBadge: ScoreBadge;
  city: string;
  country: string;
  apDate: string;
  status: CandidateStatus;
  skills: string;
  email: string;
  phone: string;
}

export interface ColumnConfig {
  experience: boolean;
  score: boolean;
  location: boolean;
  apDate: boolean;
  status: boolean;
  skills: boolean;
  contactInfo: boolean;
  actions: boolean;
}

export interface ActionConfig {
  thumbsUp: boolean;
  thumbsDown: boolean;
  share: boolean;
  contact: boolean;
  moreActions: boolean;
  quickNote: boolean;
  promote: boolean;
  reject: boolean;
  archive: boolean;
}

export interface Filters {
  pipelineStages: PipelineStage[];
  applicationStatuses: CandidateStatus[];
  matchScoreMin: number;
  matchScoreMax: number;
  scoreThreshold: ScoreThreshold;
  qualificationLevels: QualificationLevel[];
  locations: string[];
}

export type SortKey = keyof Pick<Candidate, 'name' | 'experienceYears' | 'score' | 'city' | 'apDate' | 'status'>;
export type SortDir = 'asc' | 'desc' | null;
