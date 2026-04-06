// Resurrectio Brand Constants
// Reentry/Restorative Justice Platform powered by CROS/NRI

export const brand = {
  appName: 'Resurrectio',
  fullName: 'Resurrectio — The Rising',
  assistantName: 'Neary',
  assistantFullName: 'NRI — Narrative Relational Intelligence',
  tagline: 'From incarceration to restoration',
  positioning: 'Resurrectio is a CROS/NRI-powered platform for prison ministries and reentry organizations — walking with returning citizens from release to flourishing.',
  domain: 'resurrectio.app',
} as const;

export const modules = {
  journeys: { label: 'Journeys', description: 'Track restoration arcs — people, milestones, family reconnection' },
  services: { label: 'Services', description: 'Coordinate housing, employment, compliance, and programs' },
  community: { label: 'Community', description: 'Mentors, stories, events, and the relational layer' },
  organize: { label: 'Organize', description: 'Partners, activities, territories, and templates' },
  intelligence: { label: 'Intelligence', description: 'NRI signals, reports, and ecosystem visualization' },
} as const;

export const tiers = {
  core: {
    name: 'Resurrectio Core',
    tagline: 'The foundation for relationship-centered reentry work.',
    capacity: 'Up to 50 active people',
    price: '$49/mo',
    includes: [
      'People & Journey Tracking',
      'Case Notes & Milestones',
      'Service Coordination',
      'Housing & Employment Tracking',
      'Compliance Management',
      'Mentor Matching',
      'Events & Calendar',
      'Basic Reports',
      'CSV Import',
      'Unlimited team members',
    ],
  },
  insight: {
    name: 'Resurrectio Insight',
    tagline: 'Intelligence that amplifies human judgment.',
    capacity: 'Up to 150 active people',
    price: '$99/mo',
    includes: [
      'Everything in Core',
      'NRI Signal Detection (19 types)',
      'Drift Risk & Crisis Alerts',
      'Transformation Momentum Tracking',
      'Impact Reporting with narrative outcomes',
      'Testimonium storytelling',
      '5 platform integrations',
      'Grants tracking & discovery',
    ],
  },
  story: {
    name: 'Resurrectio Story',
    tagline: 'The full vision — from incarceration to belonging.',
    capacity: 'Unlimited active people',
    price: '$149/mo',
    includes: [
      'Everything in Insight',
      'Presentation Mode for funder meetings',
      'Garden Pulse ecosystem visualization',
      'Unlimited integrations (20+ platforms)',
      'Communio cross-app bridge',
      'Impulsus impact journal',
      'Campaigns & outreach',
      'Priority support',
    ],
  },
} as const;

export const archetypes = {
  volunteer: {
    name: 'Volunteer',
    tagline: 'I visit or write to incarcerated people.',
  },
  mentor: {
    name: 'Mentor',
    tagline: 'I walk with returning citizens through reentry.',
  },
  case_manager: {
    name: 'Case Manager',
    tagline: 'I coordinate services for multiple people.',
  },
  program_lead: {
    name: 'Program Lead',
    tagline: 'I run a ministry or reentry organization.',
  },
  gardener: {
    name: 'Gardener',
    tagline: 'I manage the Resurrectio platform.',
  },
} as const;

export const signalTypes = {
  transformation_momentum: { label: 'Transformation Momentum', color: '#059669', description: 'Person consistently meeting milestones' },
  drift_risk: { label: 'Drift Risk', color: '#ef4444', description: 'Missed meetings, engagement dropping, compliance deadlines approaching' },
  fabrica_ready: { label: 'Fabrica Ready', color: '#b91c1c', description: 'Stability + motivation aligned for guild training warm handoff' },
  retention_risk: { label: 'Retention Risk', color: '#f59e0b', description: 'Employer or housing signals suggest instability' },
  family_reconnection: { label: 'Family Reconnection', color: '#059669', description: 'Positive family contact patterns emerging' },
  community_growing: { label: 'Community Growing', color: '#991b1b', description: 'New mentors, referrals increasing, enrollment trending up' },
  compliance_upcoming: { label: 'Compliance Upcoming', color: '#f59e0b', description: 'Parole review, court date approaching' },
  employment_milestone: { label: 'Employment Milestone', color: '#059669', description: 'Job tenure, promotion, wage increase' },
  communis_ready: { label: 'Communis Ready', color: '#b91c1c', description: 'Full pipeline completion approaching (cooperative membership)' },
  pre_release_intake: { label: 'Pre-Release Intake', color: '#991b1b', description: 'Release date approaching, intake process needed' },
  substance_relapse_risk: { label: 'Substance Relapse Risk', color: '#ef4444', description: 'Missed recovery meetings, behavioral pattern changes, or self-reported triggers detected' },
  mental_health_crisis: { label: 'Mental Health Crisis', color: '#ef4444', description: 'Withdrawal from activities, missed appointments, or escalating distress indicators' },
  parole_violation_risk: { label: 'Parole Violation Risk', color: '#ef4444', description: 'Multiple missed check-ins, failed drug tests, or curfew violations approaching threshold' },
  housing_eviction_warning: { label: 'Housing Eviction Warning', color: '#f59e0b', description: 'Rent arrears, landlord complaints, or lease violations flagged by housing provider' },
  employment_termination_risk: { label: 'Employment Termination Risk', color: '#f59e0b', description: 'Attendance issues, employer concerns, or performance warnings reported' },
  program_dropout_risk: { label: 'Program Dropout Risk', color: '#f59e0b', description: 'Declining attendance, missed assignments, or disengagement from cohort activities' },
  benefit_enrollment_window: { label: 'Benefit Enrollment Window', color: '#059669', description: 'Time-sensitive eligibility for SNAP, Medicaid, SSI, or housing voucher approaching' },
  mentor_burnout_risk: { label: 'Mentor Burnout Risk', color: '#f59e0b', description: 'Mentor logging fewer hours, canceling meetings, or requesting reassignment signals' },
  reincarceration_risk: { label: 'Re-Incarceration Risk', color: '#ef4444', description: 'Composite score from multiple risk factors indicates elevated probability of return to custody' },
} as const;

export type ArchetypeKey = keyof typeof archetypes;
export type TierKey = keyof typeof tiers;
export type ModuleKey = keyof typeof modules;
export type SignalTypeKey = keyof typeof signalTypes;
