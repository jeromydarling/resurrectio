/**
 * FamilySupport — Family Support & Engagement page.
 *
 * WHAT: Tracks and supports families of returning citizens as participants in their own right.
 * WHERE: /:tenantSlug/family-support
 * WHY: Families do time too. Restoration isn't complete until everyone is healing.
 *      Children lose a parent, spouses carry everything alone, aging parents lose a caregiver.
 *      This page makes the invisible visible — and meets families where they are.
 */

import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Heart,
  Users,
  Baby,
  HandHeart,
  Phone,
  Mail,
  Video,
  CalendarDays,
  CheckCircle2,
  Circle,
  AlertTriangle,
  BookOpen,
  Gift,
  DollarSign,
  MessageCircle,
  Clock,
  Star,
  ShieldCheck,
  TreePine,
} from 'lucide-react';

/* ── Mock Data ── */

const impactStats = [
  { label: 'Family members tracked', value: 47, icon: Users, color: 'text-red-700' },
  { label: 'Children in support programs', value: 14, icon: Baby, color: 'text-rose-600' },
  { label: 'Families in reunification', value: 8, icon: HandHeart, color: 'text-red-500' },
  { label: 'Active family contacts this month', value: 23, icon: MessageCircle, color: 'text-red-400' },
];

type SchoolStatus = 'enrolled' | 'struggling' | 'needs_support' | 'thriving';
type CounselingStatus = 'active' | 'recommended' | 'not_needed';

interface ChildRecord {
  id: string;
  name: string;
  age: number;
  parentName: string;
  parentId: string;
  caregiverName: string;
  caregiverRelation: string;
  schoolStatus: SchoolStatus;
  schoolNote?: string;
  counseling: CounselingStatus;
  lastCheckIn: string;
  notes: string;
  program?: string;
}

const children: ChildRecord[] = [
  {
    id: 'child-1',
    name: 'Jaylen',
    age: 9,
    parentName: 'Marcus Johnson',
    parentId: 'person-1',
    caregiverName: 'Gloria Johnson',
    caregiverRelation: 'Grandmother',
    schoolStatus: 'struggling',
    counseling: 'active',
    lastCheckIn: 'Mar 28, 2026',
    notes: "Jaylen's teacher reports improvement in behavior since dad started calling weekly. Still behind in reading but showing more effort.",
  },
  {
    id: 'child-2',
    name: 'Destiny',
    age: 14,
    parentName: 'Marcus Johnson',
    parentId: 'person-1',
    caregiverName: 'Gloria Johnson',
    caregiverRelation: 'Grandmother',
    schoolStatus: 'enrolled',
    counseling: 'recommended',
    lastCheckIn: 'Mar 25, 2026',
    notes: "Destiny has been quieter than usual. Grandmother notes she doesn't want to talk about dad's situation with friends. School counselor referral recommended.",
  },
  {
    id: 'child-3',
    name: 'Sofia',
    age: 7,
    parentName: 'Carlos Rivera',
    parentId: 'person-2',
    caregiverName: 'Maria Rivera',
    caregiverRelation: 'Mother',
    schoolStatus: 'thriving',
    counseling: 'not_needed',
    lastCheckIn: 'Apr 1, 2026',
    notes: 'Sofia is doing well in school and adjusting. Maria reports stable home environment. Sofia drew a picture of the whole family together for her dad.',
  },
  {
    id: 'child-4',
    name: 'Tyler',
    age: 11,
    parentName: 'Robert Davis',
    parentId: 'person-3',
    caregiverName: 'Patricia Davis',
    caregiverRelation: 'Aunt',
    schoolStatus: 'needs_support',
    counseling: 'active',
    lastCheckIn: 'Mar 30, 2026',
    notes: 'Tyler is acting out at school — two suspensions this semester. Counselor believes it is connected to feelings about dad. Angel Tree program has been a bright spot.',
    program: 'Angel Tree',
  },
  {
    id: 'child-5',
    name: 'Amara',
    age: 5,
    parentName: 'Denise Williams',
    parentId: 'person-5',
    caregiverName: 'Rose Williams',
    caregiverRelation: 'Grandmother',
    schoolStatus: 'enrolled',
    schoolNote: 'Kindergarten',
    counseling: 'not_needed',
    lastCheckIn: 'Apr 3, 2026',
    notes: "Amara is adjusting to kindergarten well. Rose says she asks about mom often but is comforted by video calls. Enrolled in Children's Program at church.",
    program: "Children's Program",
  },
];

interface Communication {
  id: string;
  date: string;
  personName: string;
  personId: string;
  familyMember: string;
  type: 'call' | 'letter' | 'video' | 'in-person';
  durationOrNotes: string;
  facilitatedBy: string;
}

const communications: Communication[] = [
  { id: 'comm-1', date: 'Apr 4', personName: 'Marcus Johnson', personId: 'person-1', familyMember: 'Jaylen (son)', type: 'call', durationOrNotes: '22 min — talked about school', facilitatedBy: 'Sarah Chen' },
  { id: 'comm-2', date: 'Apr 3', personName: 'Denise Williams', personId: 'person-5', familyMember: 'Amara (daughter)', type: 'video', durationOrNotes: '15 min — bedtime story', facilitatedBy: 'Deacon James' },
  { id: 'comm-3', date: 'Apr 2', personName: 'Carlos Rivera', personId: 'person-2', familyMember: 'Maria Rivera (wife)', type: 'in-person', durationOrNotes: '1 hr — family visitation day', facilitatedBy: 'Maria Santos' },
  { id: 'comm-4', date: 'Apr 1', personName: 'Robert Davis', personId: 'person-3', familyMember: 'Tyler (son)', type: 'letter', durationOrNotes: 'Birthday card and letter', facilitatedBy: 'Gloria Thompson' },
  { id: 'comm-5', date: 'Mar 31', personName: 'Marcus Johnson', personId: 'person-1', familyMember: 'Gloria Johnson (mother)', type: 'call', durationOrNotes: '18 min — medical update', facilitatedBy: 'Sarah Chen' },
  { id: 'comm-6', date: 'Mar 29', personName: 'Denise Williams', personId: 'person-5', familyMember: 'Rose Williams (mother)', type: 'video', durationOrNotes: '30 min — family meeting with case manager', facilitatedBy: 'Deacon James' },
  { id: 'comm-7', date: 'Mar 28', personName: 'Carlos Rivera', personId: 'person-2', familyMember: 'Sofia (daughter)', type: 'call', durationOrNotes: '12 min — Sofia read him a story', facilitatedBy: 'Maria Santos' },
  { id: 'comm-8', date: 'Mar 26', personName: 'Robert Davis', personId: 'person-3', familyMember: 'Patricia Davis (sister)', type: 'in-person', durationOrNotes: '45 min — discussed Tyler\'s school issues', facilitatedBy: 'Gloria Thompson' },
];

interface ChecklistItem {
  label: string;
  done: boolean;
}

interface ReentryFamily {
  id: string;
  returningCitizen: string;
  citizenId: string;
  expectedReturn: string;
  status: 'in_progress' | 'ready' | 'needs_attention';
  checklist: ChecklistItem[];
}

const reentryFamilies: ReentryFamily[] = [
  {
    id: 'fam-1',
    returningCitizen: 'Marcus Johnson',
    citizenId: 'person-1',
    expectedReturn: 'June 15, 2026',
    status: 'in_progress',
    checklist: [
      { label: 'Family counseling session completed', done: true },
      { label: 'Housing arrangement confirmed', done: true },
      { label: 'Children informed and prepared', done: false },
      { label: 'Safety plan reviewed', done: true },
      { label: 'Family meeting with case manager scheduled', done: true },
      { label: 'Support group connected', done: false },
      { label: 'Financial plan discussed', done: false },
    ],
  },
  {
    id: 'fam-2',
    returningCitizen: 'Carlos Rivera',
    citizenId: 'person-2',
    expectedReturn: 'August 3, 2026',
    status: 'needs_attention',
    checklist: [
      { label: 'Family counseling session completed', done: false },
      { label: 'Housing arrangement confirmed', done: true },
      { label: 'Children informed and prepared', done: true },
      { label: 'Safety plan reviewed', done: false },
      { label: 'Family meeting with case manager scheduled', done: false },
      { label: 'Support group connected', done: false },
      { label: 'Financial plan discussed', done: true },
    ],
  },
  {
    id: 'fam-3',
    returningCitizen: 'Denise Williams',
    citizenId: 'person-5',
    expectedReturn: 'May 1, 2026',
    status: 'ready',
    checklist: [
      { label: 'Family counseling session completed', done: true },
      { label: 'Housing arrangement confirmed', done: true },
      { label: 'Children informed and prepared', done: true },
      { label: 'Safety plan reviewed', done: true },
      { label: 'Family meeting with case manager scheduled', done: true },
      { label: 'Support group connected', done: true },
      { label: 'Financial plan discussed', done: false },
    ],
  },
];

interface SupportGroup {
  id: string;
  name: string;
  schedule: string;
  memberCount: number;
  memberLabel: string;
  facilitator: string;
  nextMeeting: string;
  description: string;
}

const supportGroups: SupportGroup[] = [
  {
    id: 'group-1',
    name: 'Waiting Spouses Circle',
    schedule: 'Thursdays at 6:00 PM',
    memberCount: 8,
    memberLabel: 'members',
    facilitator: 'Maria Santos',
    nextMeeting: 'Apr 9, 2026',
    description: 'A confidential space for spouses and partners navigating separation, reentry, and everything in between.',
  },
  {
    id: 'group-2',
    name: 'Grandparents Raising Grandchildren',
    schedule: 'Tuesdays at 10:00 AM',
    memberCount: 5,
    memberLabel: 'members',
    facilitator: 'Gloria Thompson',
    nextMeeting: 'Apr 7, 2026',
    description: 'Support and practical wisdom for grandparents who stepped in when their children could not be present.',
  },
  {
    id: 'group-3',
    name: 'Children of Promise',
    schedule: 'Saturdays at 9:00 AM',
    memberCount: 12,
    memberLabel: 'children',
    facilitator: 'Deacon James + volunteers',
    nextMeeting: 'Apr 11, 2026',
    description: 'A safe, joyful program for children with an incarcerated parent — mentoring, activities, and connection.',
  },
];

const financialImpact = [
  { label: 'Monthly commissary costs', amount: '$340', sublabel: 'avg' },
  { label: 'Phone / video call costs', amount: '$180', sublabel: 'avg' },
  { label: 'Travel for visits', amount: '$95', sublabel: 'avg' },
];

/* ── Helpers ── */

const schoolStatusConfig: Record<SchoolStatus, { label: string; variant: string; className: string }> = {
  enrolled: { label: 'Enrolled', variant: 'outline', className: 'border-blue-300 text-blue-700 bg-blue-50' },
  struggling: { label: 'Struggling', variant: 'outline', className: 'border-amber-300 text-amber-700 bg-amber-50' },
  needs_support: { label: 'Needs Support', variant: 'outline', className: 'border-orange-300 text-orange-700 bg-orange-50' },
  thriving: { label: 'Thriving', variant: 'outline', className: 'border-green-300 text-green-700 bg-green-50' },
};

const counselingConfig: Record<CounselingStatus, { label: string; className: string }> = {
  active: { label: 'Counseling Active', className: 'border-teal-300 text-teal-700 bg-teal-50' },
  recommended: { label: 'Counseling Recommended', className: 'border-yellow-300 text-yellow-700 bg-yellow-50' },
  not_needed: { label: 'Not Needed', className: 'border-gray-200 text-gray-500 bg-gray-50' },
};

const commTypeConfig: Record<Communication['type'], { label: string; icon: typeof Phone; className: string }> = {
  call: { label: 'Call', icon: Phone, className: 'bg-blue-100 text-blue-700' },
  letter: { label: 'Letter', icon: Mail, className: 'bg-amber-100 text-amber-700' },
  video: { label: 'Video', icon: Video, className: 'bg-purple-100 text-purple-700' },
  'in-person': { label: 'In-Person', icon: Users, className: 'bg-green-100 text-green-700' },
};

const reentryStatusConfig: Record<ReentryFamily['status'], { label: string; className: string }> = {
  in_progress: { label: 'In Progress', className: 'border-blue-300 text-blue-700 bg-blue-50' },
  ready: { label: 'Ready', className: 'border-green-300 text-green-700 bg-green-50' },
  needs_attention: { label: 'Needs Attention', className: 'border-red-300 text-red-700 bg-red-50' },
};

/* ── Component ── */

export default function FamilySupport() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50/40 via-white to-rose-50/30">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">

        {/* ── Hero / Mission Statement ── */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-red-100 p-4">
              <Heart className="h-8 w-8 text-red-700" />
            </div>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-red-900 leading-tight">
            Family Support &amp; Engagement
          </h1>
          <p className="text-base md:text-lg text-red-800/80 leading-relaxed">
            Families do time too. Children lose a parent, spouses carry everything alone, aging parents
            lose a caregiver. Resurrectio tracks and supports the whole family — because restoration
            isn't complete until everyone is healing.
          </p>
        </header>

        {/* ── Section 1: Family Impact Dashboard ── */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-semibold text-red-900">Family Impact Dashboard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {impactStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="border-red-100">
                  <CardContent className="pt-6 pb-4 flex items-center gap-4">
                    <div className="rounded-lg bg-red-50 p-3">
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-900">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── Section 2: Children's Wellbeing ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Baby className="h-5 w-5 text-red-700" />
            <h2 className="font-serif text-2xl font-semibold text-red-900">Children's Wellbeing</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Every child here has a parent in the system. We track their wellbeing not to surveil, but to
            surround them with care — so no child falls through the cracks while the adults figure things out.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children.map((child) => {
              const school = schoolStatusConfig[child.schoolStatus];
              const counseling = counselingConfig[child.counseling];
              return (
                <Card key={child.id} className="border-red-100 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-serif text-lg text-red-900">
                          {child.name}, age {child.age}
                        </CardTitle>
                        <CardDescription className="mt-1 space-y-0.5">
                          <span className="block">
                            Parent:{' '}
                            <Link to={`/person/${child.parentId}`} className="text-red-700 underline underline-offset-2 hover:text-red-900">
                              {child.parentName}
                            </Link>
                          </span>
                          <span className="block">
                            Caregiver: {child.caregiverName}{' '}
                            <span className="text-xs">({child.caregiverRelation})</span>
                          </span>
                        </CardDescription>
                      </div>
                      {child.program && (
                        <Badge className="bg-red-100 text-red-800 border-red-200 flex items-center gap-1 shrink-0">
                          {child.program === 'Angel Tree' ? <TreePine className="h-3 w-3" /> : <Gift className="h-3 w-3" />}
                          {child.program}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className={school.className}>
                        <BookOpen className="h-3 w-3 mr-1" />
                        {school.label}
                        {child.schoolNote ? ` (${child.schoolNote})` : ''}
                      </Badge>
                      <Badge variant="outline" className={counseling.className}>
                        <ShieldCheck className="h-3 w-3 mr-1" />
                        {counseling.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      "{child.notes}"
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Last check-in: {child.lastCheckIn}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── Section 3: Communication Facilitation ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-red-700" />
            <h2 className="font-serif text-2xl font-semibold text-red-900">Communication Facilitation</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Connection is a lifeline. We facilitate and track calls, letters, video visits, and in-person
            meetings so families stay bonded through the hardest chapter of their lives.
          </p>
          <Card className="border-red-100 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-red-50/50">
                  <TableHead className="text-red-900 font-semibold">Date</TableHead>
                  <TableHead className="text-red-900 font-semibold">Person</TableHead>
                  <TableHead className="text-red-900 font-semibold">Family Member</TableHead>
                  <TableHead className="text-red-900 font-semibold">Type</TableHead>
                  <TableHead className="text-red-900 font-semibold">Duration / Notes</TableHead>
                  <TableHead className="text-red-900 font-semibold">Facilitated By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {communications.map((comm) => {
                  const typeInfo = commTypeConfig[comm.type];
                  const TypeIcon = typeInfo.icon;
                  return (
                    <TableRow key={comm.id} className="hover:bg-red-50/30">
                      <TableCell className="text-sm whitespace-nowrap">{comm.date}</TableCell>
                      <TableCell>
                        <Link to={`/person/${comm.personId}`} className="text-red-700 underline underline-offset-2 hover:text-red-900 text-sm">
                          {comm.personName}
                        </Link>
                      </TableCell>
                      <TableCell className="text-sm">{comm.familyMember}</TableCell>
                      <TableCell>
                        <Badge className={`${typeInfo.className} flex items-center gap-1 w-fit`}>
                          <TypeIcon className="h-3 w-3" />
                          {typeInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[200px]">{comm.durationOrNotes}</TableCell>
                      <TableCell className="text-sm">{comm.facilitatedBy}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </section>

        {/* ── Section 4: Family Reentry Preparation ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-red-700" />
            <h2 className="font-serif text-2xl font-semibold text-red-900">Family Reentry Preparation</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Coming home changes everything — for everyone. These families are actively preparing so the
            day of return is a beginning, not a crisis.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reentryFamilies.map((family) => {
              const doneCount = family.checklist.filter((c) => c.done).length;
              const total = family.checklist.length;
              const pct = Math.round((doneCount / total) * 100);
              const status = reentryStatusConfig[family.status];
              return (
                <Card key={family.id} className="border-red-100">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-serif text-lg text-red-900">
                          <Link to={`/person/${family.citizenId}`} className="underline underline-offset-2 hover:text-red-700">
                            {family.returningCitizen}
                          </Link>
                        </CardTitle>
                        <CardDescription className="mt-1 flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          Expected: {family.expectedReturn}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className={status.className}>
                        {status.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Preparation progress</span>
                        <span className="font-medium text-red-900">{doneCount}/{total}</span>
                      </div>
                      <Progress value={pct} className="h-2 bg-red-100 [&>div]:bg-red-600" />
                    </div>
                    <ul className="space-y-1.5">
                      {family.checklist.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          {item.done ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-300 mt-0.5 shrink-0" />
                          )}
                          <span className={item.done ? 'text-muted-foreground line-through' : 'text-foreground'}>
                            {item.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ── Section 5: Family Support Groups ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-red-700" />
            <h2 className="font-serif text-2xl font-semibold text-red-900">Family Support Groups</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl">
            No one should walk this road alone. These groups meet regularly — offering community,
            understanding, and practical help to families at every stage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {supportGroups.map((group) => (
              <Card key={group.id} className="border-red-100 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="font-serif text-lg text-red-900">{group.name}</CardTitle>
                  <CardDescription>{group.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {group.schedule}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      {group.memberCount} {group.memberLabel}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <HandHeart className="h-3.5 w-3.5" />
                      Facilitator: {group.facilitator}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      Next meeting: {group.nextMeeting}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-red-200 text-red-700 hover:bg-red-50 hover:text-red-900">
                    View Group
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Section 6: Financial Impact Tracker ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-red-700" />
            <h2 className="font-serif text-2xl font-semibold text-red-900">Financial Impact Tracker</h2>
          </div>
          <Card className="border-red-200 bg-red-50/40">
            <CardContent className="pt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {financialImpact.map((item) => (
                  <div key={item.label} className="text-center p-4 bg-white rounded-lg border border-red-100">
                    <p className="text-2xl font-bold text-red-900">{item.amount}</p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">({item.sublabel})</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center p-5 bg-white rounded-lg border-2 border-red-200 max-w-xs">
                  <p className="text-3xl font-bold text-red-900">$615</p>
                  <p className="text-sm font-medium text-red-800 mt-1">Total monthly family burden</p>
                  <p className="text-xs text-muted-foreground">(avg per family)</p>
                </div>
              </div>
              <p className="text-sm text-red-800/80 text-center leading-relaxed max-w-xl mx-auto italic">
                These costs fall on families. Tracking them helps us advocate for policy change and connect
                families with assistance programs.
              </p>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
}
