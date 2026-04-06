import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  FileSpreadsheet,
  Building2,
  Shield,
  FileText,
  Settings2,
  FilePlus2,
  ArrowRight,
  ClipboardCheck,
  MousePointerClick,
  PenLine,
  Briefcase,
  Upload,
  Database,
  Copy,
  Check,
} from 'lucide-react';

const reports = [
  {
    name: 'OJP PMT',
    fullName: 'Office of Justice Programs Performance Measurement Tool',
    icon: FileSpreadsheet,
    requiredBy: 'Second Chance Act grantees',
    description:
      'Quarterly performance measures — participants served, services delivered, recidivism outcomes.',
    format: 'CSV matching PMT field specifications',
    statusLabel: 'Ready to Export',
    statusVariant: 'default' as const,
    buttonLabel: 'Generate OJP Report',
    lastExported: 'March 28, 2026',
  },
  {
    name: 'HMIS',
    fullName: 'Homeless Management Information System',
    icon: Building2,
    requiredBy: 'HUD-funded housing programs',
    description:
      'Client demographics, housing placements, length of stay, exit destinations.',
    format: 'HUD CSV Data Standards (HMIS Data Dictionary)',
    statusLabel: 'Ready to Export',
    statusVariant: 'default' as const,
    buttonLabel: 'Generate HMIS Export',
    lastExported: 'March 28, 2026',
  },
  {
    name: 'SPARS',
    fullName: 'SAMHSA Performance Accountability & Reporting System',
    icon: FileText,
    requiredBy: 'Substance abuse / mental health grant recipients',
    description:
      'GPRA/NOMS data — substance use, employment, housing, criminal justice involvement.',
    format: 'GPRA intake/follow-up/discharge templates',
    statusLabel: 'Ready to Export',
    statusVariant: 'default' as const,
    buttonLabel: 'Generate SPARS Report',
    lastExported: 'March 28, 2026',
  },
  {
    name: 'WIPS / PIRL',
    fullName: 'Workforce Integrated Performance System — DOL ETA',
    icon: Upload,
    requiredBy: 'DOL Reentry Employment Opportunities (REO) grantees',
    description:
      'Generate PIRL-compliant CSV files (ETA-9172) with ~400 data elements — demographics, housing, employment, services, credentials, outcomes. Upload directly to WIPS for quarterly performance reports.',
    format: 'PIRL CSV (ETA-9172) — direct upload to WIPS',
    statusLabel: 'Direct Upload',
    statusVariant: 'default' as const,
    buttonLabel: 'Generate PIRL CSV',
    lastExported: 'March 31, 2026',
  },
  {
    name: 'REO-GPMS',
    fullName: 'Reentry Employment Opportunities Grantee Performance Management System',
    icon: Database,
    requiredBy: 'DOL REO grantees (Growth Opportunities, Pathway Home, etc.)',
    description:
      'Pre-formatted participant data for GPMS entry — intake, enrollment, individual development plans, assessments, services delivered, and exit data. Print or copy-paste into GPMS fields.',
    format: 'Printable field-matched worksheets for GPMS data entry',
    statusLabel: 'Ready to Print',
    statusVariant: 'default' as const,
    buttonLabel: 'Generate GPMS Worksheets',
    lastExported: 'March 31, 2026',
  },
  {
    name: 'QPR / QNR',
    fullName: 'Quarterly Performance Report & Quarterly Narrative Report',
    icon: Briefcase,
    requiredBy: 'All DOL ETA reentry grantees',
    description:
      'Auto-generated quarterly narrative reports with WIOA performance indicators — measurable skill gains, credential attainment, employment rate, median quarterly earnings.',
    format: 'PDF narrative + PIRL data file for WIPS submission',
    statusLabel: 'Ready to Export',
    statusVariant: 'default' as const,
    buttonLabel: 'Generate Quarterly Report',
    lastExported: 'March 31, 2026',
  },
  {
    name: 'Workforce One (WF1)',
    fullName: 'Minnesota DEED Workforce One Case Management System',
    icon: Database,
    requiredBy: 'Minnesota DEED-funded reentry programs (ACP, Pilot Re-Entry)',
    description:
      'Print field-matched worksheets for WF1 data entry — participant enrollment, eligibility, case notes, services, activities, and outcomes. All data must be in WF1 within 15 business days or it doesn\'t count for performance measures.',
    format: 'Printable worksheets matching WF1 page fields + EDS document prep',
    statusLabel: 'Ready to Print',
    statusVariant: 'default' as const,
    buttonLabel: 'Generate WF1 Worksheets',
    lastExported: 'March 31, 2026',
  },
  {
    name: 'State DOC Reporting',
    fullName: 'State Department of Corrections',
    icon: Settings2,
    requiredBy: 'State-contracted reentry service providers',
    description:
      'Participant enrollment, program completion, supervision compliance, outcome metrics.',
    format: 'State-specific templates (configurable)',
    statusLabel: 'Configure State',
    statusVariant: 'secondary' as const,
    buttonLabel: 'Set Up State Template',
    lastExported: 'March 28, 2026',
  },
  {
    name: 'CJIS Compliance',
    fullName: 'Criminal Justice Information Services',
    icon: Shield,
    requiredBy: 'Organizations accessing criminal justice information',
    description:
      'Security audit documentation, access logs, policy compliance.',
    format: 'CJIS Security Policy compliance checklist',
    statusLabel: 'Audit Ready',
    statusVariant: 'outline' as const,
    buttonLabel: 'View Compliance Status',
    lastExported: 'March 28, 2026',
  },
  {
    name: 'Custom Funder Reports',
    fullName: 'Configurable Grant Reporting',
    icon: FilePlus2,
    requiredBy: 'Any grant-funded organization',
    description:
      'Custom field mapping from Resurrectio data to any funder\'s required format.',
    format: 'Configurable CSV/PDF templates',
    statusLabel: 'Template Builder',
    statusVariant: 'secondary' as const,
    buttonLabel: 'Create Template',
    lastExported: 'March 28, 2026',
  },
];

const steps = [
  {
    icon: PenLine,
    title: 'You enter data once',
    description:
      'Into Resurrectio, while doing your actual case management work.',
  },
  {
    icon: ClipboardCheck,
    title: 'We map your fields',
    description:
      'Resurrectio knows which of your data fields match which government fields.',
  },
  {
    icon: MousePointerClick,
    title: 'Export in one click',
    description:
      'Download a CSV/PDF formatted exactly how the government portal expects it. Upload and done.',
  },
];

/** Click-to-copy field — the core UX for manual-entry systems */
function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-red-50/50 group transition-colors border-b border-border/50 last:border-0">
      <div className="min-w-0 flex-1">
        <span className="text-xs text-muted-foreground block">{label}</span>
        <span className="text-sm font-medium text-foreground">{value}</span>
      </div>
      <button
        onClick={handleCopy}
        className="ml-3 p-1.5 rounded-md text-muted-foreground hover:text-red-800 hover:bg-red-100 transition-colors shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100"
        title={`Copy "${value}"`}
      >
        {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

/** Sample worksheet fields for the preview (matches WF1/GPMS structure) */
const sampleWorksheet = {
  participant: [
    { label: 'First Name', value: 'Marcus' },
    { label: 'Last Name', value: 'Johnson' },
    { label: 'Date of Birth', value: '03/15/1988' },
    { label: 'SSN (Last 4)', value: '4827' },
    { label: 'Gender', value: 'Male' },
    { label: 'Race/Ethnicity', value: 'Black or African American' },
    { label: 'Veteran Status', value: 'No' },
    { label: 'Disability Status', value: 'No' },
  ],
  enrollment: [
    { label: 'Enrollment Date', value: '01/14/2026' },
    { label: 'Program', value: 'Adult Career Pathways — Reentry' },
    { label: 'Referral Source', value: 'Cook County DOC' },
    { label: 'Release Date', value: '01/08/2026' },
    { label: 'Facility', value: 'Cook County Jail' },
    { label: 'Parole Officer', value: 'Officer M. Davis' },
    { label: 'Housing at Entry', value: 'Transitional Housing' },
    { label: 'Employment at Entry', value: 'Unemployed' },
  ],
  services: [
    { label: 'Service Type', value: 'Job Readiness Training' },
    { label: 'Service Start Date', value: '01/21/2026' },
    { label: 'Provider', value: 'St. Vincent de Paul Reentry Services' },
    { label: 'Hours of Training', value: '40' },
    { label: 'Credential Earned', value: 'OSHA 10-Hour Safety' },
    { label: 'Credential Date', value: '02/28/2026' },
    { label: 'Employment Placement', value: 'Rivera Construction LLC' },
    { label: 'Placement Date', value: '03/04/2026' },
    { label: 'Wage at Placement', value: '$16.00/hr' },
  ],
};

export default function GovernmentCompliance() {
  return (
    <div className="space-y-8">
      {/* Top explanation */}
      <div className="max-w-3xl">
        <h1 className="font-serif text-3xl font-bold text-red-950 mb-3">
          Government Reporting Made Simple
        </h1>
        <p className="text-red-950/70 leading-relaxed">
          Stop entering the same data twice. Resurrectio generates your federal and state reports
          from the data you're already collecting — in the exact format the government wants.
        </p>
      </div>

      <Separator />

      {/* Report cards grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.name} className="overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <div className="h-2 bg-red-700" />
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                  <report.icon className="h-5 w-5 text-red-800" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-base font-serif">{report.name}</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {report.fullName}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3 pt-0">
              <p className="text-xs text-red-800/60 font-medium">
                Required by: {report.requiredBy}
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {report.description}
              </p>
              <p className="text-xs text-muted-foreground">
                Format: {report.format}
              </p>
              <div className="mt-auto pt-3 flex items-center justify-between">
                <Badge variant={report.statusVariant}>{report.statusLabel}</Badge>
              </div>
              <Button size="sm" className="w-full bg-red-800 hover:bg-red-900 text-white">
                <report.icon className="h-4 w-4 mr-2" />
                {report.buttonLabel}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Last exported: {report.lastExported}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      {/* How It Works */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-red-950 mb-6">How It Works</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <step.icon className="h-5 w-5 text-red-800" />
                </div>
                <span className="text-xs font-bold text-red-800">{i + 1}</span>
              </div>
              <div>
                <h3 className="font-serif font-semibold text-red-950 mb-1">{step.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Copy-Ready Worksheet Preview */}
      <div>
        <div className="mb-6">
          <h2 className="font-serif text-2xl font-bold text-red-950 mb-2">Copy-Ready Worksheets</h2>
          <p className="text-sm text-foreground/70 leading-relaxed max-w-2xl">
            For systems that don't accept CSV uploads, Resurrectio generates worksheets with a
            click-to-copy icon next to every field. Open the government portal in one tab, your
            worksheet in another — click, paste, next field. No retyping.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Participant Information', fields: sampleWorksheet.participant },
            { title: 'Program Enrollment', fields: sampleWorksheet.enrollment },
            { title: 'Services & Outcomes', fields: sampleWorksheet.services },
          ].map((section) => (
            <Card key={section.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-serif text-red-950">{section.title}</CardTitle>
                <CardDescription className="text-xs">
                  Hover any field to copy
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {section.fields.map((field) => (
                  <CopyField key={field.label} label={field.label} value={field.value} />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-4 max-w-xl">
          Preview showing data for Marcus Johnson. In production, worksheets are generated for any
          person in your system — select a person, choose a government system, and every field is
          ready to copy.
        </p>
      </div>

      <div className="flex justify-center pt-4">
        <p className="text-sm text-muted-foreground italic max-w-lg text-center">
          Your case managers should spend their time with people, not fighting with government portals.
        </p>
      </div>
    </div>
  );
}
