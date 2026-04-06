import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockPeople } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  ShieldCheck,
  CreditCard,
  Car,
  Landmark,
  Vote,
  ExternalLink,
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from 'lucide-react';

// ── Inline document-status mock data (not in mockData.ts) ──

type DocStatus =
  | 'has_it'
  | 'applied'
  | 'needs_to_apply'
  | 'not_eligible'
  | 'suspended'
  | 'revoked'
  | 'opened'
  | 'needs_assistance'
  | 'registered'
  | 'eligible_not_registered'
  | 'ineligible_in_state';

interface DocumentEntry {
  name: string;
  icon: typeof FileText;
  status: DocStatus;
  dateApplied?: string;
}

type PersonDocuments = {
  personId: string;
  documents: DocumentEntry[];
};

// Build realistic sets keyed to stage progression
const documentData: PersonDocuments[] = [
  // Pre-release — Anthony Brown — has almost nothing
  {
    personId: 'person-4',
    documents: [
      { name: 'Government-Issued Photo ID', icon: CreditCard, status: 'needs_to_apply' },
      { name: 'Social Security Card', icon: ShieldCheck, status: 'applied', dateApplied: '2026-03-28' },
      { name: 'Birth Certificate', icon: FileText, status: 'needs_to_apply' },
      { name: "Driver's License", icon: Car, status: 'suspended' },
      { name: 'Bank Account', icon: Landmark, status: 'needs_assistance' },
      { name: 'Voter Registration', icon: Vote, status: 'eligible_not_registered' },
    ],
  },
  // Stabilization — Marcus Johnson — a few applied, nothing in hand
  {
    personId: 'person-1',
    documents: [
      { name: 'Government-Issued Photo ID', icon: CreditCard, status: 'applied', dateApplied: '2026-03-15' },
      { name: 'Social Security Card', icon: ShieldCheck, status: 'has_it' },
      { name: 'Birth Certificate', icon: FileText, status: 'applied', dateApplied: '2026-03-20' },
      { name: "Driver's License", icon: Car, status: 'revoked' },
      { name: 'Bank Account', icon: Landmark, status: 'applied', dateApplied: '2026-04-01' },
      { name: 'Voter Registration', icon: Vote, status: 'eligible_not_registered' },
    ],
  },
  // Stabilization — Kevin Harris — very early
  {
    personId: 'person-6',
    documents: [
      { name: 'Government-Issued Photo ID', icon: CreditCard, status: 'needs_to_apply' },
      { name: 'Social Security Card', icon: ShieldCheck, status: 'needs_to_apply' },
      { name: 'Birth Certificate', icon: FileText, status: 'applied', dateApplied: '2026-03-25' },
      { name: "Driver's License", icon: Car, status: 'not_eligible' },
      { name: 'Bank Account', icon: Landmark, status: 'needs_assistance' },
      { name: 'Voter Registration', icon: Vote, status: 'ineligible_in_state' },
    ],
  },
  // Growth — Denise Williams — most docs in hand
  {
    personId: 'person-2',
    documents: [
      { name: 'Government-Issued Photo ID', icon: CreditCard, status: 'has_it' },
      { name: 'Social Security Card', icon: ShieldCheck, status: 'has_it' },
      { name: 'Birth Certificate', icon: FileText, status: 'has_it' },
      { name: "Driver's License", icon: Car, status: 'applied', dateApplied: '2026-02-10' },
      { name: 'Bank Account', icon: Landmark, status: 'opened' },
      { name: 'Voter Registration', icon: Vote, status: 'registered' },
    ],
  },
  // Flourishing — Robert Davis — nearly complete
  {
    personId: 'person-3',
    documents: [
      { name: 'Government-Issued Photo ID', icon: CreditCard, status: 'has_it' },
      { name: 'Social Security Card', icon: ShieldCheck, status: 'has_it' },
      { name: 'Birth Certificate', icon: FileText, status: 'has_it' },
      { name: "Driver's License", icon: Car, status: 'applied', dateApplied: '2026-03-05' },
      { name: 'Bank Account', icon: Landmark, status: 'opened' },
      { name: 'Voter Registration', icon: Vote, status: 'registered' },
    ],
  },
  // Alumni — Lisa Thompson — everything
  {
    personId: 'person-5',
    documents: [
      { name: 'Government-Issued Photo ID', icon: CreditCard, status: 'has_it' },
      { name: 'Social Security Card', icon: ShieldCheck, status: 'has_it' },
      { name: 'Birth Certificate', icon: FileText, status: 'has_it' },
      { name: "Driver's License", icon: Car, status: 'has_it' },
      { name: 'Bank Account', icon: Landmark, status: 'opened' },
      { name: 'Voter Registration', icon: Vote, status: 'registered' },
    ],
  },
];

// ── Helpers ──

const greenStatuses: DocStatus[] = ['has_it', 'opened', 'registered'];
const blueStatuses: DocStatus[] = ['applied'];
const yellowStatuses: DocStatus[] = ['needs_to_apply', 'needs_assistance', 'eligible_not_registered'];
const redStatuses: DocStatus[] = ['suspended', 'revoked'];
const grayStatuses: DocStatus[] = ['not_eligible', 'ineligible_in_state'];

function statusColor(s: DocStatus) {
  if (greenStatuses.includes(s)) return 'bg-green-100 text-green-800 border-green-200';
  if (blueStatuses.includes(s)) return 'bg-blue-100 text-blue-800 border-blue-200';
  if (yellowStatuses.includes(s)) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  if (redStatuses.includes(s)) return 'bg-red-100 text-red-800 border-red-200';
  return 'bg-gray-100 text-gray-600 border-gray-200';
}

function statusLabel(s: DocStatus) {
  const map: Record<DocStatus, string> = {
    has_it: 'Has It',
    applied: 'Applied',
    needs_to_apply: 'Needs to Apply',
    not_eligible: 'Not Eligible',
    suspended: 'Suspended',
    revoked: 'Revoked',
    opened: 'Opened',
    needs_assistance: 'Needs Assistance',
    registered: 'Registered',
    eligible_not_registered: 'Eligible',
    ineligible_in_state: 'Ineligible',
  };
  return map[s];
}

function actionLabel(s: DocStatus) {
  if (blueStatuses.includes(s)) return 'Check Status';
  if (greenStatuses.includes(s)) return null;
  if (grayStatuses.includes(s)) return null;
  return 'Start Application';
}

// ── Component ──

export default function DocumentRecovery() {
  const peopleMap = useMemo(() => {
    const m = new Map<string, (typeof mockPeople)[number]>();
    mockPeople.forEach((p) => m.set(p.id, p));
    return m;
  }, []);

  // Aggregate stats
  const stats = useMemo(() => {
    let secured = 0;
    let total = 0;
    let pending = 0;
    let needHelp = 0;
    documentData.forEach((pd) => {
      pd.documents.forEach((d) => {
        total++;
        if (greenStatuses.includes(d.status)) secured++;
        if (blueStatuses.includes(d.status)) pending++;
        if (yellowStatuses.includes(d.status) || redStatuses.includes(d.status)) needHelp++;
      });
    });
    return { secured, total, pending, needHelp };
  }, []);

  return (
    <div className="min-h-screen bg-red-50/40">
      {/* Header */}
      <div className="bg-red-950 text-white px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <ClipboardList className="h-7 w-7 text-red-300" />
            <h1 className="font-serif text-3xl font-bold">Document Recovery</h1>
          </div>
          <p className="text-red-200 max-w-2xl text-lg leading-relaxed">
            Before a returning citizen can get a job, open a bank account, or sign a lease, they
            need documents most of us take for granted.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-5 pb-4 flex items-center gap-4">
              <CheckCircle2 className="h-8 w-8 text-green-700 shrink-0" />
              <div>
                <p className="text-2xl font-bold text-green-900">{stats.secured} of {stats.total}</p>
                <p className="text-sm text-green-700">Documents secured across all participants</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-5 pb-4 flex items-center gap-4">
              <Clock className="h-8 w-8 text-blue-700 shrink-0" />
              <div>
                <p className="text-2xl font-bold text-blue-900">{stats.pending}</p>
                <p className="text-sm text-blue-700">Applications pending</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-5 pb-4 flex items-center gap-4">
              <AlertTriangle className="h-8 w-8 text-yellow-700 shrink-0" />
              <div>
                <p className="text-2xl font-bold text-yellow-900">{stats.needHelp}</p>
                <p className="text-sm text-yellow-700">Need assistance</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Per-person document grids */}
        {documentData.map((pd) => {
          const person = peopleMap.get(pd.personId);
          if (!person) return null;
          return (
            <Card key={pd.personId} className="border-red-100">
              <CardHeader className="pb-3 bg-red-50/60 rounded-t-lg">
                <CardTitle className="font-serif text-lg flex items-center justify-between">
                  <Link
                    to={`/people/${pd.personId}`}
                    className="text-red-900 hover:text-red-700 underline underline-offset-2 decoration-red-300 flex items-center gap-2"
                  >
                    {person.firstName} {person.lastName}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                  <Badge className="bg-red-100 text-red-800 border-red-200 font-normal text-xs capitalize">
                    {person.stage.replace('_', '-')}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {pd.documents.map((doc) => {
                    const Icon = doc.icon;
                    const action = actionLabel(doc.status);
                    return (
                      <div
                        key={doc.name}
                        className="border rounded-lg p-3 flex flex-col gap-2 bg-white"
                      >
                        <div className="flex items-start gap-2">
                          <Icon className="h-4 w-4 mt-0.5 text-red-800 shrink-0" />
                          <span className="text-sm font-medium text-gray-900 leading-tight">
                            {doc.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            className={`text-[11px] font-medium border ${statusColor(doc.status)}`}
                          >
                            {statusLabel(doc.status)}
                          </Badge>
                          {doc.status === 'applied' && doc.dateApplied && (
                            <span className="text-[11px] text-gray-500">
                              Applied {doc.dateApplied}
                            </span>
                          )}
                        </div>
                        {action && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs text-red-800 hover:text-red-900 hover:bg-red-50 w-fit mt-auto"
                          >
                            {action === 'Check Status' ? (
                              <Clock className="h-3 w-3 mr-1" />
                            ) : (
                              <ExternalLink className="h-3 w-3 mr-1" />
                            )}
                            {action}
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
