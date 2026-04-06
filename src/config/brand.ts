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
    includes: [
      'People & Journey Tracking',
      'Case Notes & Milestones',
      'Service Coordination',
      'Housing & Employment Tracking',
      'Compliance Management',
      'Mentor Matching',
      'Events & Calendar',
      'Basic Reports',
    ],
  },
  insight: {
    name: 'Resurrectio Insight',
    tagline: 'Understand patterns across your ministry.',
    includes: [
      'Everything in Core',
      'NRI Signal Detection',
      'Drift Risk Alerts',
      'Transformation Momentum Tracking',
      'Family Reconnection Signals',
      'Impact Reporting',
    ],
  },
  story: {
    name: 'Resurrectio Story',
    tagline: 'Turn daily ministry into lasting impact narratives.',
    includes: [
      'Everything in Insight',
      'Presentation Mode',
      'Funder Report Generation',
      'Transformation Stories',
      'Garden Pulse Visualization',
      'Cross-app Pipeline (Fabrica, Communis, Propria)',
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
} as const;

export type ArchetypeKey = keyof typeof archetypes;
export type TierKey = keyof typeof tiers;
export type ModuleKey = keyof typeof modules;
export type SignalTypeKey = keyof typeof signalTypes;
