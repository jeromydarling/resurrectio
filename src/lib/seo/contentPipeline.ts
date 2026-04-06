/**
 * Resurrectio Content Pipeline — SEO & Content Strategy
 *
 * WHAT: Defines the content topics, keywords, and editorial calendar
 *       for the Resurrectio marketing site and knowledge base.
 * WHERE: Used by Gardener Console Content Studio + SEO Dashboard.
 * WHY: Prison ministry and reentry organizations search for specific
 *       topics. This pipeline ensures Resurrectio ranks for them.
 *
 * WHEN MOVING TO LOVABLE: This config drives the Content Studio and
 * Pub Calendar in the Gardener Console. Map these topics to blog posts,
 * knowledge base articles, and landing pages.
 */

/* ─── Primary Keyword Clusters ────────────────────── */

export const SEO_KEYWORD_CLUSTERS = {
  /** High-intent keywords — people actively searching for solutions */
  high_intent: [
    'reentry case management software',
    'prison ministry software',
    'reentry program management',
    'returning citizen tracking',
    'case management for reentry organizations',
    'nonprofit reentry software',
    'faith-based reentry tools',
    'second chance case management',
    'reentry services coordination',
    'prison ministry CRM',
  ],

  /** Mid-funnel — people researching the problem space */
  mid_funnel: [
    'reentry program best practices',
    'how to start a prison ministry',
    'reentry services for formerly incarcerated',
    'reducing recidivism faith-based programs',
    'mentor matching for reentry',
    'housing for returning citizens',
    'employment for formerly incarcerated',
    'reentry case management best practices',
    'tracking outcomes reentry programs',
    'funder reporting reentry organizations',
    'CCHD reentry grants',
    'Second Chance Act grants',
  ],

  /** Top-of-funnel — awareness and education */
  top_funnel: [
    'what is restorative justice',
    'recidivism rates United States',
    'barriers to reentry after incarceration',
    'ban the box laws by state',
    'voting rights restoration after felony',
    'housing rights formerly incarcerated',
    'SNAP benefits after incarceration',
    'Medicaid enrollment after release',
    'drivers license reinstatement after prison',
    'record expungement process',
    'work opportunity tax credit WOTC',
    'prison ministry volunteer training',
  ],

  /** Competitor keywords — people comparing solutions */
  competitor: [
    'Bonterra Apricot alternative',
    'CorrectTech alternative',
    'Salesforce for nonprofits alternative',
    'Apricot case management alternative',
    'reentry software comparison',
    'prison ministry tools comparison',
  ],

  /** Long-tail / niche */
  long_tail: [
    'how to track housing stability for returning citizens',
    'NRI narrative intelligence reentry',
    'warm handoff prison to community',
    'guild training for formerly incarcerated',
    'worker cooperative formerly incarcerated',
    'community land trust reentry housing',
    'parole compliance tracking software',
    'mentor management reentry ministry',
    'transformation stories reentry program',
    'family reunification after incarceration software',
  ],
} as const;

/* ─── Content Topics for Blog / Authority ─────────── */

export const CONTENT_TOPICS = [
  // Reentry Program Operations
  { topic: 'How to Build a Reentry Intake Process That Centers Dignity', category: 'operations', priority: 1, targetKeywords: ['reentry intake process', 'reentry best practices'] },
  { topic: 'Warm Handoffs: Why Transitions Between Services Are Where People Fall Through', category: 'operations', priority: 1, targetKeywords: ['warm handoff reentry', 'reentry service coordination'] },
  { topic: 'Measuring What Matters: Impact Metrics That Funders Actually Want', category: 'operations', priority: 1, targetKeywords: ['reentry program outcomes', 'funder reporting reentry'] },
  { topic: 'From Spreadsheets to Systems: When It\'s Time to Upgrade Your Tracking', category: 'operations', priority: 2, targetKeywords: ['reentry case management software', 'prison ministry software'] },

  // Legal & Policy
  { topic: 'Ban the Box Laws: A State-by-State Guide for Reentry Organizations', category: 'legal', priority: 1, targetKeywords: ['ban the box laws by state', 'fair chance hiring'] },
  { topic: 'The Second Chance Act: What It Funds and How to Apply', category: 'legal', priority: 1, targetKeywords: ['Second Chance Act grants', 'reentry funding'] },
  { topic: 'Record Expungement: A Guide for Case Managers', category: 'legal', priority: 2, targetKeywords: ['record expungement process', 'clean slate laws'] },
  { topic: 'Voting Rights Restoration After a Felony Conviction', category: 'legal', priority: 2, targetKeywords: ['voting rights restoration', 'felony disenfranchisement'] },
  { topic: 'Understanding the 44,000 Legal Barriers to Reentry', category: 'legal', priority: 1, targetKeywords: ['barriers to reentry', 'collateral consequences'] },

  // Housing
  { topic: 'Finding Housing with a Criminal Record: A Practical Guide', category: 'housing', priority: 1, targetKeywords: ['housing for returning citizens', 'housing with criminal record'] },
  { topic: 'Section 8, VASH, and Housing Vouchers for Returning Citizens', category: 'housing', priority: 2, targetKeywords: ['Section 8 formerly incarcerated', 'housing vouchers reentry'] },
  { topic: 'Community Land Trusts as Permanent Reentry Housing', category: 'housing', priority: 3, targetKeywords: ['community land trust reentry', 'affordable housing reentry'] },

  // Employment
  { topic: 'The Work Opportunity Tax Credit: A Guide for Employers Hiring Returning Citizens', category: 'employment', priority: 1, targetKeywords: ['WOTC tax credit', 'hiring formerly incarcerated'] },
  { topic: 'Job Readiness Programs That Actually Work', category: 'employment', priority: 2, targetKeywords: ['job readiness reentry', 'employment training incarcerated'] },
  { topic: 'From Employment to Ownership: The Worker Cooperative Path', category: 'employment', priority: 3, targetKeywords: ['worker cooperative formerly incarcerated', 'economic empowerment reentry'] },

  // Ministry & Faith
  { topic: 'Starting a Prison Ministry: A Step-by-Step Guide', category: 'ministry', priority: 1, targetKeywords: ['how to start a prison ministry', 'prison ministry guide'] },
  { topic: 'Mentor Training for Reentry Ministry: What Volunteers Need to Know', category: 'ministry', priority: 1, targetKeywords: ['prison ministry volunteer training', 'reentry mentor training'] },
  { topic: 'CCHD Grants for Reentry Organizations: Eligibility and Application', category: 'ministry', priority: 2, targetKeywords: ['CCHD reentry grants', 'Catholic reentry funding'] },
  { topic: 'Second Chance Month: How Your Ministry Can Participate', category: 'ministry', priority: 2, targetKeywords: ['Second Chance Month', 'reentry awareness'] },

  // Technology & Data
  { topic: 'Why Reentry Organizations Need More Than a Spreadsheet', category: 'technology', priority: 1, targetKeywords: ['reentry case management software', 'reentry program management'] },
  { topic: 'NRI: How Narrative Intelligence Detects Drift Risk Before It\'s Too Late', category: 'technology', priority: 2, targetKeywords: ['NRI narrative intelligence', 'predictive analytics reentry'] },
  { topic: 'Data Security for Reentry Organizations: What You Need to Know', category: 'technology', priority: 2, targetKeywords: ['data security reentry', 'CJIS compliance nonprofit'] },

  // Family & Wellness
  { topic: 'Family Reunification After Incarceration: A Case Manager\'s Guide', category: 'family', priority: 1, targetKeywords: ['family reunification incarceration', 'family reentry support'] },
  { topic: 'Substance Recovery and Reentry: Coordinating MAT with Case Management', category: 'wellness', priority: 2, targetKeywords: ['substance recovery reentry', 'MAT incarceration'] },
  { topic: 'Mental Health Support for Returning Citizens: Resources and Referrals', category: 'wellness', priority: 2, targetKeywords: ['mental health reentry', 'trauma-informed reentry'] },

  // Benefits & Financial
  { topic: 'SNAP, Medicaid, and SSI After Incarceration: Eligibility Guide', category: 'benefits', priority: 1, targetKeywords: ['SNAP benefits after incarceration', 'Medicaid after prison'] },
  { topic: 'Financial Literacy for Returning Citizens: Banking, Credit, and Avoiding Predators', category: 'benefits', priority: 2, targetKeywords: ['financial literacy reentry', 'banking after incarceration'] },
] as const;

/* ─── Editorial Calendar Template ─────────────────── */

export const EDITORIAL_CADENCE = {
  blog: {
    frequency: '2x per month',
    targetLength: '1,200-2,000 words',
    voice: 'Warm, practical, human. Write for case managers and program directors, not policymakers. Use plain language. Center the person, not the system.',
  },
  knowledge_base: {
    frequency: 'Monthly updates',
    targetLength: '500-800 words per article',
    voice: 'Clear, actionable, step-by-step. Write so a case manager can hand this to a returning citizen and they can follow it.',
  },
  social: {
    frequency: 'Weekly',
    platforms: ['LinkedIn', 'Facebook Groups (prison ministry communities)'],
    voice: 'Share stories (with permission), celebrate milestones, highlight legal changes. Never clinical, always human.',
  },
} as const;

/* ─── Target Audiences for Content ────────────────── */

export const CONTENT_AUDIENCES = [
  { audience: 'Case Managers', needs: 'Practical tools, workflow guides, compliance tracking tips', content_angle: 'How-to guides, checklists, workflow templates' },
  { audience: 'Program Directors', needs: 'Funder reporting, outcome metrics, program comparison', content_angle: 'Impact reports, case studies, ROI of technology' },
  { audience: 'Mentors / Volunteers', needs: 'Training, boundaries, what to expect', content_angle: 'Mentor guides, relationship-building tips, burnout prevention' },
  { audience: 'Ministry Leaders / Pastors', needs: 'Theology of restoration, starting a ministry, CCHD grants', content_angle: 'Vision pieces, ministry startup guides, funding opportunities' },
  { audience: 'Returning Citizens (indirect)', needs: 'Legal rights, housing, employment, benefits', content_angle: 'Knowledge base articles that case managers share with the people they serve' },
  { audience: 'Funders / Grant Officers', needs: 'Evidence of impact, data integrity, outcome reporting', content_angle: 'White papers, impact summaries, platform security documentation' },
] as const;

export type ContentTopic = typeof CONTENT_TOPICS[number];
export type KeywordCluster = keyof typeof SEO_KEYWORD_CLUSTERS;
