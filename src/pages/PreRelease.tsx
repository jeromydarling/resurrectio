/**
 * PreRelease — Pre-release facility coordination.
 *
 * WHAT: Manages relationships with facilities and tracks people approaching release.
 * WHERE: /:tenantSlug/pre-release
 * WHY: The best reentry programs don't start at the gate. They start inside.
 */
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Building2,
  CalendarDays,
  Users,
  BookOpen,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  Home,
  FileText,
  Car,
  Phone,
  IdCard,
  ClipboardList,
  Mail,
  MapPin,
} from 'lucide-react';

/* ── Inline mock data ── */

interface Facility {
  id: string;
  name: string;
  approachingRelease: number;
  chaplain: string;
  chaplainTitle: string;
  nextVisit: string;
  status: 'active' | 'building' | 'initial';
  penPalConnections: number;
  booksDistributed: number;
  upcomingReleases: number;
}

const facilities: Facility[] = [
  {
    id: 'f1',
    name: 'Cook County Jail',
    approachingRelease: 8,
    chaplain: 'Fr. David Kim',
    chaplainTitle: 'Chaplain',
    nextVisit: 'Apr 8',
    status: 'active',
    penPalConnections: 12,
    booksDistributed: 24,
    upcomingReleases: 5,
  },
  {
    id: 'f2',
    name: 'Stateville Correctional Center',
    approachingRelease: 5,
    chaplain: 'Rev. Thomas Wright',
    chaplainTitle: 'Chaplain',
    nextVisit: 'Apr 12',
    status: 'active',
    penPalConnections: 8,
    booksDistributed: 15,
    upcomingReleases: 3,
  },
  {
    id: 'f3',
    name: 'Pontiac Correctional Center',
    approachingRelease: 3,
    chaplain: 'Lisa Martinez',
    chaplainTitle: 'Program Coordinator',
    nextVisit: 'Apr 15',
    status: 'building',
    penPalConnections: 4,
    booksDistributed: 6,
    upcomingReleases: 2,
  },
  {
    id: 'f4',
    name: 'Dixon Correctional Center',
    approachingRelease: 2,
    chaplain: "Warden's Office",
    chaplainTitle: 'Contact',
    nextVisit: 'TBD',
    status: 'initial',
    penPalConnections: 0,
    booksDistributed: 0,
    upcomingReleases: 1,
  },
];

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  active: { label: 'Active partnership', className: 'bg-green-100 text-green-800' },
  building: { label: 'Building relationship', className: 'bg-yellow-100 text-yellow-800' },
  initial: { label: 'Initial outreach', className: 'bg-gray-100 text-gray-700' },
};

interface PipelinePerson {
  id: string;
  name: string;
  facility: string;
  expectedRelease: string;
  daysUntilRelease: number;
  casePlanStarted: 'yes' | 'no' | 'in_progress';
  mentorAssigned: 'yes' | 'no' | 'in_progress';
  housingIdentified: 'yes' | 'no' | 'in_progress';
}

const pipelinePeople: PipelinePerson[] = [
  { id: 'person-4', name: 'Anthony Brown', facility: 'Cook County Jail', expectedRelease: 'Jun 10, 2026', daysUntilRelease: 65, casePlanStarted: 'yes', mentorAssigned: 'yes', housingIdentified: 'in_progress' },
  { id: 'person-8', name: 'James Mitchell', facility: 'Stateville Correctional Center', expectedRelease: 'Jul 20, 2026', daysUntilRelease: 105, casePlanStarted: 'in_progress', mentorAssigned: 'no', housingIdentified: 'no' },
  { id: 'person-9', name: 'DeShawn Carter', facility: 'Pontiac Correctional Center', expectedRelease: 'Aug 15, 2026', daysUntilRelease: 131, casePlanStarted: 'in_progress', mentorAssigned: 'no', housingIdentified: 'in_progress' },
  { id: 'pr-4', name: 'Raymond Torres', facility: 'Cook County Jail', expectedRelease: 'May 22, 2026', daysUntilRelease: 46, casePlanStarted: 'yes', mentorAssigned: 'yes', housingIdentified: 'yes' },
  { id: 'pr-5', name: 'Darius Washington', facility: 'Stateville Correctional Center', expectedRelease: 'Jun 30, 2026', daysUntilRelease: 85, casePlanStarted: 'yes', mentorAssigned: 'in_progress', housingIdentified: 'no' },
  { id: 'pr-6', name: 'Samuel Greene', facility: 'Dixon Correctional Center', expectedRelease: 'Sep 1, 2026', daysUntilRelease: 148, casePlanStarted: 'no', mentorAssigned: 'no', housingIdentified: 'no' },
  { id: 'pr-7', name: 'Victor Okafor', facility: 'Cook County Jail', expectedRelease: 'May 5, 2026', daysUntilRelease: 29, casePlanStarted: 'yes', mentorAssigned: 'yes', housingIdentified: 'yes' },
];

const checklistItems = [
  { icon: Mail, label: 'Initial contact made (letter or visit)' },
  { icon: CalendarDays, label: 'Release date confirmed with facility' },
  { icon: FileText, label: 'Case plan drafted' },
  { icon: UserCheck, label: 'Mentor matched' },
  { icon: Home, label: 'Housing identified for first 30 days' },
  { icon: Car, label: 'Transportation from facility arranged' },
  { icon: MapPin, label: 'Parole officer contact obtained' },
  { icon: Phone, label: 'Emergency contact verified' },
  { icon: IdCard, label: 'ID documents status assessed' },
  { icon: ClipboardList, label: 'First week appointments scheduled' },
  { icon: BookOpen, label: 'Fabrica companion book provided' },
];

/* ── Status icon helper ── */

function StatusIcon({ status }: { status: 'yes' | 'no' | 'in_progress' }) {
  if (status === 'yes') return <CheckCircle2 className="h-5 w-5 text-green-600" />;
  if (status === 'no') return <XCircle className="h-5 w-5 text-red-500" />;
  return <Clock className="h-5 w-5 text-yellow-500" />;
}

/* ── Component ── */

export default function PreRelease() {
  const sortedPipeline = [...pipelinePeople].sort((a, b) => a.daysUntilRelease - b.daysUntilRelease);

  return (
    <div className="min-h-screen bg-red-50/40">
      {/* Header */}
      <div className="bg-red-950 text-white px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-serif font-bold tracking-tight">Pre-Release Coordination</h1>
          <p className="mt-3 text-red-100 max-w-3xl text-lg italic font-serif">
            "The best reentry programs don't start at the gate. They start inside."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Facility Dashboard */}
        <div>
          <h2 className="text-xl font-serif font-semibold text-red-900 mb-4">Facility Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facilities.map((f) => {
              const statusCfg = STATUS_CONFIG[f.status];
              return (
                <Card key={f.id} className="bg-white">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Building2 className="h-6 w-6 text-red-800" />
                        <div>
                          <CardTitle className="font-serif text-red-900 text-lg">{f.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {f.chaplainTitle}: {f.chaplain}
                          </p>
                        </div>
                      </div>
                      <Badge className={statusCfg.className}>{statusCfg.label}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-red-700" />
                        <span><strong>{f.approachingRelease}</strong> approaching release</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-red-700" />
                        <span>Next visit: <strong>{f.nextVisit}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-red-700" />
                        <span><strong>{f.penPalConnections}</strong> pen pal connections</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-red-700" />
                        <span><strong>{f.booksDistributed}</strong> Fabrica books</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t text-sm text-muted-foreground">
                      {f.upcomingReleases} release{f.upcomingReleases !== 1 ? 's' : ''} in the next 90 days
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Pre-Release Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-red-900">Pre-Release Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Facility</TableHead>
                  <TableHead>Expected Release</TableHead>
                  <TableHead className="text-center">Days Until Release</TableHead>
                  <TableHead className="text-center">Case Plan</TableHead>
                  <TableHead className="text-center">Mentor</TableHead>
                  <TableHead className="text-center">Housing</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPipeline.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <Link
                        to={`/people/${p.id}`}
                        className="text-red-800 hover:text-red-950 underline underline-offset-2 font-medium"
                      >
                        {p.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{p.facility}</TableCell>
                    <TableCell className="whitespace-nowrap">{p.expectedRelease}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="secondary"
                        className={
                          p.daysUntilRelease <= 30
                            ? 'bg-red-100 text-red-800'
                            : p.daysUntilRelease <= 60
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-green-100 text-green-800'
                        }
                      >
                        {p.daysUntilRelease}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <StatusIcon status={p.casePlanStarted} />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <StatusIcon status={p.mentorAssigned} />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <StatusIcon status={p.housingIdentified} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pre-Release Checklist Template */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="font-serif text-red-900 flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Pre-Release Checklist Template
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {checklistItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-6 w-6 rounded border-2 border-red-300 bg-red-50">
                    <CheckCircle2 className="h-4 w-4 text-red-800" />
                  </div>
                  <item.icon className="h-4 w-4 text-red-700" />
                  <span className="text-sm">{item.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground italic border-t pt-4">
              This checklist is applied to every person 90 days before their expected release date.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
