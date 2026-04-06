/**
 * connectorRegistry — Registry of platform connectors for Relatio.
 *
 * WHAT: Defines supported platforms, their auth methods, polling cadence, and domains.
 * WHERE: Used by integration setup, Settings, relatio-sync-runner.
 * WHY: Resurrectio acts as a Narrative Companion — bringing existing data into the platform.
 */

export interface ChmsConnectorConfig {
  label: string;
  description: string;
  auth: 'api_key' | 'oauth2' | 'oauth1' | 'csv_only';
  polling: 'nightly' | 'hourly' | '5min' | 'daily' | 'manual';
  webhook?: boolean;
  domains: string[];
  rateLimit?: number;
  icon: string;
  /** full = API sync + narrative signals, partial = contacts + activities, minimal = CSV migration only */
  coverageMode: 'full' | 'partial' | 'minimal';
}

export const CHMS_CONNECTORS: Record<string, ChmsConnectorConfig> = {
  salesforce: {
    label: 'Salesforce',
    description: 'The world\'s most popular CRM — contacts, accounts, opportunities, tasks.',
    auth: 'oauth2',
    polling: 'hourly',
    domains: ['contacts', 'accounts', 'opportunities', 'tasks', 'events', 'notes'],
    rateLimit: 100,
    icon: 'cloud',
    coverageMode: 'full',
  },
  hubspot: {
    label: 'HubSpot',
    description: 'Marketing & CRM platform — contacts, companies, deals, activities.',
    auth: 'api_key',
    polling: 'hourly',
    domains: ['contacts', 'companies', 'deals', 'tickets', 'activities'],
    rateLimit: 500,
    icon: 'target',
    coverageMode: 'full',
  },
  airtable: {
    label: 'Airtable',
    description: 'Flexible database platform — any table structure, records, and relationships.',
    auth: 'api_key',
    polling: 'daily',
    webhook: true,
    domains: ['records', 'tables', 'relationships', 'attachments'],
    rateLimit: 5,
    icon: 'table',
    coverageMode: 'partial',
  },
  bloomerang: {
    label: 'Bloomerang',
    description: 'Donor CRM — constituents, donations, interactions, and campaigns.',
    auth: 'api_key',
    polling: 'daily',
    domains: ['constituents', 'donations', 'interactions', 'campaigns', 'funds'],
    icon: 'heart',
    coverageMode: 'full',
  },
  neoncrm: {
    label: 'NeonCRM',
    description: 'Nonprofit CRM — accounts, donations, events, memberships, and volunteers.',
    auth: 'api_key',
    polling: 'daily',
    webhook: true,
    domains: ['accounts', 'donations', 'events', 'memberships', 'households', 'volunteers'],
    icon: 'sparkles',
    coverageMode: 'full',
  },
  lgl: {
    label: 'Little Green Light',
    description: 'Donor management — constituents, gifts, appeals, and groups.',
    auth: 'api_key',
    polling: 'daily',
    domains: ['constituents', 'gifts', 'appeals', 'groups', 'notes'],
    icon: 'leaf',
    coverageMode: 'partial',
  },
  donorperfect: {
    label: 'DonorPerfect',
    description: 'Fundraising software — donors, gifts, pledges, and contacts (XML API).',
    auth: 'api_key',
    polling: 'daily',
    domains: ['donors', 'gifts', 'pledges', 'contacts'],
    icon: 'gem',
    coverageMode: 'partial',
  },
  kindful: {
    label: 'Kindful',
    description: 'Nonprofit CRM — contacts, transactions, campaigns, and groups.',
    auth: 'oauth2',
    polling: 'daily',
    domains: ['contacts', 'transactions', 'campaigns', 'groups', 'pledges'],
    icon: 'hand-heart',
    coverageMode: 'partial',
  },
  virtuous: {
    label: 'Virtuous CRM',
    description: 'Responsive fundraising platform — contacts, gifts, projects, and automation.',
    auth: 'api_key',
    polling: 'daily',
    domains: ['contacts', 'gifts', 'projects', 'tasks', 'notes'],
    rateLimit: 500,
    icon: 'heart-handshake',
    coverageMode: 'full',
  },
  zoho: {
    label: 'Zoho CRM',
    description: 'General CRM — contacts, accounts, deals, activities, and custom modules.',
    auth: 'oauth2',
    polling: 'hourly',
    domains: ['contacts', 'accounts', 'deals', 'activities', 'notes'],
    rateLimit: 100,
    icon: 'zap',
    coverageMode: 'full',
  },
  fluentcrm: {
    label: 'FluentCRM',
    description: 'Self-hosted WordPress email marketing & contact management — lists, tags, automations.',
    auth: 'api_key',
    polling: 'daily',
    domains: ['contacts', 'lists', 'tags', 'campaigns', 'companies'],
    rateLimit: 60,
    icon: 'mail',
    coverageMode: 'partial',
  },
  jetpackcrm: {
    label: 'Jetpack CRM',
    description: 'Lightweight WordPress CRM by Automattic — contacts, invoices, transactions, events.',
    auth: 'api_key',
    polling: 'daily',
    domains: ['contacts', 'transactions', 'invoices', 'events', 'quotes'],
    rateLimit: 60,
    icon: 'rocket',
    coverageMode: 'partial',
  },
  wperp: {
    label: 'WP ERP',
    description: 'WordPress ERP suite — CRM contacts, companies, activity logs, and lifecycle stages.',
    auth: 'api_key',
    polling: 'daily',
    domains: ['contacts', 'companies', 'activities', 'groups'],
    rateLimit: 30,
    icon: 'briefcase',
    coverageMode: 'partial',
  },
  wildapricot: {
    label: 'Wild Apricot',
    description: 'Cloud membership management by Personify — contacts, events, memberships, donations.',
    auth: 'oauth2',
    polling: 'daily',
    domains: ['contacts', 'events', 'memberships', 'donations', 'invoices'],
    rateLimit: 60,
    icon: 'flower-2',
    coverageMode: 'full',
  },
  oracle: {
    label: 'Oracle CRM',
    description: 'Enterprise CRM (Oracle CX Cloud) — contacts, accounts, opportunities, activities, campaigns.',
    auth: 'oauth2',
    polling: 'hourly',
    domains: ['contacts', 'accounts', 'opportunities', 'activities', 'campaigns', 'households', 'notes'],
    rateLimit: 500,
    icon: 'database',
    coverageMode: 'full',
  },
  blackbaud: {
    label: 'Blackbaud RE NXT',
    description: 'Fundraising & constituent management — constituents, gifts, actions, events, notes via SKY API.',
    auth: 'oauth2',
    polling: 'hourly',
    webhook: true,
    domains: ['constituents', 'gifts', 'actions', 'events', 'notes', 'households', 'campaigns'],
    rateLimit: 500,
    icon: 'heart-handshake',
    coverageMode: 'full',
  },
  google_contacts: {
    label: 'Google Contacts',
    description: 'Personal & organizational contacts via Google People API — contacts, groups, labels.',
    auth: 'oauth2',
    polling: 'daily',
    domains: ['contacts', 'groups', 'labels'],
    rateLimit: 90,
    icon: 'mail',
    coverageMode: 'partial',
  },
  outlook_contacts: {
    label: 'Microsoft Outlook Contacts',
    description: 'Outlook / Microsoft 365 contacts via Microsoft Graph API — contacts, folders, categories.',
    auth: 'oauth2',
    polling: 'daily',
    domains: ['contacts', 'folders', 'categories'],
    rateLimit: 100,
    icon: 'mail',
    coverageMode: 'partial',
  },
  apple_contacts: {
    label: 'Apple Contacts / iCloud',
    description: 'Apple Contacts via vCard export from iCloud — contacts, groups. No public API — CSV/vCard migration only.',
    auth: 'csv_only',
    polling: 'manual',
    domains: ['contacts', 'groups'],
    icon: 'smartphone',
    coverageMode: 'minimal',
  },
  monicacrm: {
    label: 'Monica CRM',
    description: 'Open-source personal relationship manager — contacts, activities, notes, reminders, debts.',
    auth: 'api_key',
    polling: 'daily',
    domains: ['contacts', 'activities', 'notes', 'reminders', 'tasks'],
    rateLimit: 60,
    icon: 'heart',
    coverageMode: 'partial',
  },
  contactsplus: {
    label: 'Contacts+',
    description: 'Unified address book — contacts, tags, notes, social profiles. Formerly FullContact.',
    auth: 'api_key',
    polling: 'daily',
    domains: ['contacts', 'tags', 'notes', 'companies'],
    rateLimit: 60,
    icon: 'contact',
    coverageMode: 'partial',
  },
  civicrm: {
    label: 'CiviCRM',
    description: 'Open-source nonprofit CRM — contacts, activities, events, cases, contributions (read-only), volunteers via APIv4.',
    auth: 'api_key',
    polling: 'hourly',
    domains: ['contacts', 'activities', 'events', 'cases', 'contributions', 'groups', 'tags', 'volunteers'],
    rateLimit: 100,
    icon: 'heart-handshake',
    coverageMode: 'full',
  },
};

export type ChmsConnectorKey = keyof typeof CHMS_CONNECTORS;

/**
 * Returns human-friendly connector name.
 */
export function getConnectorLabel(key: string): string {
  return CHMS_CONNECTORS[key]?.label ?? key;
}

/**
 * Returns all connector keys suitable for a given archetype.
 */
export function getConnectorsForArchetype(_archetype?: string | null): string[] {
  return Object.keys(CHMS_CONNECTORS);
}

/** Returns human-readable coverage label */
export function getCoverageLabel(mode: ChmsConnectorConfig['coverageMode']): string {
  switch (mode) {
    case 'full': return 'API Sync';
    case 'partial': return 'Partial Sync';
    case 'minimal': return 'CSV Migration';
  }
}

/** Returns coverage mode badge color class */
export function getCoverageColor(mode: ChmsConnectorConfig['coverageMode']): string {
  switch (mode) {
    case 'full': return 'bg-emerald-100 text-emerald-700';
    case 'partial': return 'bg-amber-100 text-amber-700';
    case 'minimal': return 'bg-slate-100 text-slate-600';
  }
}
