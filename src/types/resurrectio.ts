export type JourneyStage = 'pre_release' | 'stabilization' | 'growth' | 'flourishing' | 'alumni';

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  facility: string;
  releaseDate: string;
  stage: JourneyStage;
  mentorId: string | null;
  housingStatus: 'shelter' | 'transitional' | 'permanent' | 'family' | 'none' | 'pending';
  employmentStatus: 'unemployed' | 'searching' | 'placed' | 'retained' | 'self_employed';
  daysInStage: number;
  lastActivity: string;
  phone: string;
  email: string;
  paroleOfficer: string;
  notes: string;
}

export interface CaseNote {
  id: string;
  personId: string;
  personName: string;
  type: 'mentor_meeting' | 'milestone' | 'concern' | 'celebration' | 'check_in' | 'referral';
  title: string;
  content: string;
  author: string;
  date: string;
}

export interface Milestone {
  id: string;
  personId: string;
  personName: string;
  category: 'housing_secured' | 'employment_started' | 'ninety_day_retention' | 'program_completion' | 'family_reunification' | 'compliance_clear' | 'drivers_license' | 'bank_account';
  title: string;
  date: string;
  verified: boolean;
}

export interface FamilyMember {
  id: string;
  personId: string;
  personName: string;
  name: string;
  relationship: 'spouse' | 'child' | 'parent' | 'sibling' | 'other';
  contactStatus: 'connected' | 'attempting' | 'not_ready' | 'no_contact';
  reunificationMilestone: string | null;
  lastContact: string | null;
  notes: string;
}

export interface HousingRecord {
  id: string;
  personId: string;
  personName: string;
  type: 'transitional' | 'permanent' | 'family' | 'shelter' | 'sober_living';
  provider: string;
  moveInDate: string;
  stabilityScore: number;
  monthlyRent: number;
  subsidized: boolean;
  notes: string;
}

export interface EmploymentRecord {
  id: string;
  personId: string;
  personName: string;
  employer: string;
  role: string;
  startDate: string;
  wage: number;
  retentionDays: number;
  status: 'active' | 'ended' | 'on_leave';
  notes: string;
}

export interface ComplianceItem {
  id: string;
  personId: string;
  personName: string;
  type: 'court_date' | 'parole_check_in' | 'drug_test' | 'program_mandate' | 'community_service';
  title: string;
  date: string;
  status: 'upcoming' | 'completed' | 'overdue' | 'excused';
  notes: string;
}

export interface Program {
  id: string;
  name: string;
  type: 'guild_course' | 'bible_study' | 'ged_prep' | 'support_group' | 'life_skills' | 'job_readiness';
  enrolledCount: number;
  completionRate: number;
  nextSession: string;
  facilitator: string;
  description: string;
  recentGraduates: string[];
}

export interface Mentor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  trainingStatus: 'active' | 'in_training' | 'inactive';
  matchedMentees: string[];
  totalHours: number;
  specialization: string;
  joinDate: string;
  parish: string;
}

export interface Partner {
  id: string;
  name: string;
  type: 'court' | 'employer' | 'housing' | 'funder' | 'church' | 'legal' | 'treatment' | 'education';
  contact: string;
  phone: string;
  email: string;
  activePeopleServed: number;
  lastActivity: string;
  address: string;
  notes: string;
}

export interface NriSignal {
  id: string;
  type: string;
  personId: string;
  personName: string;
  title: string;
  description: string;
  confidence: 'high' | 'medium' | 'low';
  evidence: string[];
  date: string;
  dismissed: boolean;
}

export interface ResurrectioEvent {
  id: string;
  name: string;
  type: 'mentoring_circle' | 'family_day' | 'job_fair' | 'worship' | 'training' | 'celebration';
  date: string;
  time: string;
  location: string;
  attendeeCount: number;
  maxCapacity: number;
  description: string;
}

export interface Story {
  id: string;
  personInitial: string;
  stage: JourneyStage;
  title: string;
  excerpt: string;
  fullStory: string;
  dateShared: string;
  tags: string[];
}

export interface Territory {
  id: string;
  name: string;
  facilitiesCovered: string[];
  activePeople: number;
  mentorsAssigned: number;
  partners: number;
}

export interface Template {
  id: string;
  name: string;
  type: 'intake_form' | 'referral' | 'reentry_playbook' | 'mentor_agreement' | 'progress_report' | 'service_plan';
  description: string;
  lastUpdated: string;
  usageCount: number;
}

export interface ActivityEntry {
  id: string;
  type: 'call' | 'visit' | 'email' | 'meeting' | 'referral' | 'note' | 'milestone';
  description: string;
  personId: string;
  personName: string;
  author: string;
  date: string;
  partnerId?: string;
  partnerName?: string;
}

export interface DashboardStats {
  activePeople: number;
  activeMentors: number;
  housingPlacementRate: number;
  employmentRate: number;
  activePrograms: number;
  activeSignals: number;
  pipeline: Record<JourneyStage, number>;
}

export const STAGE_LABELS: Record<JourneyStage, string> = {
  pre_release: 'Pre-Release',
  stabilization: 'Stabilization',
  growth: 'Growth',
  flourishing: 'Flourishing',
  alumni: 'Alumni',
};

export const STAGE_COLORS: Record<JourneyStage, string> = {
  pre_release: 'bg-purple-700 text-white',
  stabilization: 'bg-violet-500 text-white',
  growth: 'bg-emerald-600 text-white',
  flourishing: 'bg-amber-500 text-white',
  alumni: 'bg-purple-300 text-purple-900',
};

export const STAGE_BADGE_CLASSES: Record<JourneyStage, string> = {
  pre_release: 'stage-pre-release',
  stabilization: 'stage-stabilization',
  growth: 'stage-growth',
  flourishing: 'stage-flourishing',
  alumni: 'stage-alumni',
};

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  category: 'legal_rights' | 'housing_resources' | 'employment_tips' | 'family_reconciliation' | 'spiritual_formation';
  description: string;
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  description: string;
  downloadCount: number;
}
