import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  Car,
  CheckCircle2,
  Clock,
  FileText,
  Heart,
  MessageSquare,
  Phone,
  Plus,
  Sparkles,
  TrendingUp,
  User,
  Users,
  Wallet,
  Activity,
  Home,
  Briefcase,
  Scale,
  Star,
} from 'lucide-react';
import {
  mockPeople,
  mockSignals,
  mockComplianceItems,
  mockActivities,
  mockEvents,
  mockDashboardStats,
} from '@/data/mockData';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const stageLabel: Record<string, string> = {
  pre_release: 'Pre-Release',
  stabilization: 'Stabilization',
  growth: 'Growth',
  flourishing: 'Flourishing',
  alumni: 'Alumni',
};

const stageColor: Record<string, string> = {
  pre_release: 'bg-slate-500 text-white',
  stabilization: 'bg-amber-600 text-white',
  growth: 'bg-emerald-600 text-white',
  flourishing: 'bg-sky-600 text-white',
  alumni: 'bg-violet-600 text-white',
};

function daysAgo(dateStr: string): number {
  const now = new Date('2026-04-06');
  const d = new Date(dateStr);
  return Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
}

function daysUntil(dateStr: string): number {
  const now = new Date('2026-04-06');
  const d = new Date(dateStr);
  return Math.floor((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDaysAgo(dateStr: string): string {
  const d = daysAgo(dateStr);
  if (d === 0) return 'Today';
  if (d === 1) return 'Yesterday';
  return `${d} days ago`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

const complianceTypeLabel: Record<string, string> = {
  court_date: 'Court Date',
  parole_check_in: 'Parole Check-in',
  drug_test: 'Drug Test',
  program_mandate: 'Program Mandate',
  community_service: 'Community Service',
};

const activityIcon: Record<string, typeof Activity> = {
  call: Phone,
  visit: Home,
  email: MessageSquare,
  meeting: Users,
  referral: ArrowRight,
  note: FileText,
  milestone: Star,
};

// ---------------------------------------------------------------------------
// Derived data
// ---------------------------------------------------------------------------

const activeSignals = mockSignals.filter((s) => !s.dismissed);
const urgentSignals = activeSignals.filter(
  (s) =>
    s.type.includes('risk') ||
    s.type.includes('crisis') ||
    s.type.includes('violation') ||
    s.type.includes('eviction') ||
    s.type.includes('termination') ||
    s.type.includes('relapse'),
);

const upcomingCompliance = mockComplianceItems
  .filter((c) => c.status === 'upcoming' || c.status === 'overdue')
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

const complianceDueThisWeek = upcomingCompliance.filter((c) => {
  const d = daysUntil(c.date);
  return d <= 7 || c.status === 'overdue';
});

const overdueCompliance = upcomingCompliance.filter((c) => c.status === 'overdue');

// People needing attention: those with active drift/risk signals or old lastActivity
const peopleWithSignals = new Map<string, typeof activeSignals>();
for (const sig of activeSignals) {
  if (sig.personId.startsWith('per0')) continue; // program-wide signal
  const existing = peopleWithSignals.get(sig.personId) || [];
  existing.push(sig);
  peopleWithSignals.set(sig.personId, existing);
}

const attentionPeople = mockPeople
  .filter(
    (p) =>
      peopleWithSignals.has(p.id) ||
      daysAgo(p.lastActivity) > 10,
  )
  .sort((a, b) => {
    // Sort by: has urgent signal first, then by last activity (oldest first)
    const aUrgent = (peopleWithSignals.get(a.id) || []).some(
      (s) =>
        s.type.includes('risk') ||
        s.type.includes('crisis') ||
        s.type.includes('violation'),
    );
    const bUrgent = (peopleWithSignals.get(b.id) || []).some(
      (s) =>
        s.type.includes('risk') ||
        s.type.includes('crisis') ||
        s.type.includes('violation'),
    );
    if (aUrgent && !bUrgent) return -1;
    if (!aUrgent && bUrgent) return 1;
    return daysAgo(b.lastActivity) - daysAgo(a.lastActivity);
  })
  .slice(0, 5);

const overdueFollowUps = mockPeople.filter((p) => daysAgo(p.lastActivity) >= 14);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ReentryCommandCenter() {
  return (
    <div className="space-y-6">
      {/* ── Top: Today's Focus ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Signals */}
        <Link to="/signals" className="block">
          <Card className={`hover:shadow-md transition-shadow ${urgentSignals.length > 0 ? 'border-red-400' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`rounded-full p-2 ${urgentSignals.length > 0 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-serif">{activeSignals.length}</p>
                  <p className="text-sm text-muted-foreground">NRI signals need attention</p>
                  {urgentSignals.length > 0 && (
                    <p className="text-xs text-red-600 font-medium mt-0.5">
                      {urgentSignals.length} high-risk
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Compliance Due */}
        <Link to="/compliance" className="block">
          <Card className={`hover:shadow-md transition-shadow ${overdueCompliance.length > 0 ? 'border-amber-400' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`rounded-full p-2 ${overdueCompliance.length > 0 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-serif">{complianceDueThisWeek.length}</p>
                  <p className="text-sm text-muted-foreground">items due this week</p>
                  {overdueCompliance.length > 0 && (
                    <p className="text-xs text-amber-600 font-medium mt-0.5">
                      {overdueCompliance.length} overdue
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Rides Needed */}
        <Link to="/transport" className="block">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full p-2 bg-slate-100 text-slate-600">
                  <Car className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-serif">4</p>
                  <p className="text-sm text-muted-foreground">rides unmatched</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Overdue Follow-ups */}
        <Link to="/people" className="block">
          <Card className={`hover:shadow-md transition-shadow ${overdueFollowUps.length > 0 ? 'border-red-400' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`rounded-full p-2 ${overdueFollowUps.length > 0 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold font-serif">{overdueFollowUps.length}</p>
                  <p className="text-sm text-muted-foreground">not contacted in 14+ days</p>
                  {overdueFollowUps.length > 0 && (
                    <p className="text-xs text-red-600 font-medium mt-0.5">
                      Needs outreach
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* ── Main: 2-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN — 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* People Needing Attention */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-red-600" />
                People Needing Attention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {attentionPeople.map((person) => {
                const signals = peopleWithSignals.get(person.id) || [];
                const topSignal = signals[0];
                const lastContactDays = daysAgo(person.lastActivity);
                const lastContactRed = lastContactDays > 10;

                return (
                  <div
                    key={person.id}
                    className="flex flex-col sm:flex-row sm:items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          to={`/people/${person.id}`}
                          className="font-semibold text-red-700 hover:underline"
                        >
                          {person.firstName} {person.lastName}
                        </Link>
                        <Badge className={stageColor[person.stage]}>
                          {stageLabel[person.stage]}
                        </Badge>
                      </div>

                      {topSignal && (
                        <p className="text-sm mt-1 text-muted-foreground">
                          <span className="font-medium text-foreground">
                            {topSignal.title}
                          </span>
                          {' '}— {topSignal.description.slice(0, 80)}...
                        </p>
                      )}

                      <p
                        className={`text-xs mt-1 ${
                          lastContactRed
                            ? 'text-red-600 font-medium'
                            : 'text-muted-foreground'
                        }`}
                      >
                        Last contact: {formatDaysAgo(person.lastActivity)}
                      </p>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/case-notes`}>
                          <FileText className="h-3.5 w-3.5 mr-1" />
                          Log Note
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/text">
                          <MessageSquare className="h-3.5 w-3.5 mr-1" />
                          Send Text
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}

              <div className="pt-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/people" className="text-red-700">
                    View all people <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Compliance */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-lg flex items-center gap-2">
                <Scale className="h-5 w-5 text-amber-600" />
                Upcoming Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {upcomingCompliance.slice(0, 5).map((item) => {
                  const days = daysUntil(item.date);
                  const isOverdue = item.status === 'overdue';

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        isOverdue
                          ? 'border-red-300 bg-red-50 dark:bg-red-950/20'
                          : 'bg-card'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Link
                            to={`/people/${item.personId}`}
                            className="font-medium text-red-700 hover:underline text-sm"
                          >
                            {item.personName}
                          </Link>
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${
                              isOverdue ? 'border-red-400 text-red-700' : ''
                            }`}
                          >
                            {complianceTypeLabel[item.type]}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {item.title}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-medium">{formatDate(item.date)}</p>
                        <p
                          className={`text-xs ${
                            isOverdue
                              ? 'text-red-600 font-semibold'
                              : days <= 3
                                ? 'text-amber-600 font-medium'
                                : 'text-muted-foreground'
                          }`}
                        >
                          {isOverdue
                            ? `${Math.abs(days)} days overdue`
                            : days === 0
                              ? 'Today'
                              : days === 1
                                ? 'Tomorrow'
                                : `${days} days`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pt-3">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/parole-scheduler" className="text-red-700">
                    View compliance calendar <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* This Week's Journey Movement */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                This Week's Journey Movement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                  <ArrowRight className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="text-sm">
                    <span className="font-semibold">2</span> moved from{' '}
                    <Badge className={stageColor.pre_release}>Pre-Release</Badge>
                    {' '}<ArrowRight className="h-3 w-3 inline" />{' '}
                    <Badge className={stageColor.stabilization}>Stabilization</Badge>
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                  <ArrowRight className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="text-sm">
                    <span className="font-semibold">1</span> moved from{' '}
                    <Badge className={stageColor.stabilization}>Stabilization</Badge>
                    {' '}<ArrowRight className="h-3 w-3 inline" />{' '}
                    <Badge className={stageColor.growth}>Growth</Badge>
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                  <ArrowRight className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="text-sm">
                    <span className="font-semibold">1</span> moved from{' '}
                    <Badge className={stageColor.growth}>Growth</Badge>
                    {' '}<ArrowRight className="h-3 w-3 inline" />{' '}
                    <Badge className={stageColor.flourishing}>Flourishing</Badge>
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
                  <Plus className="h-4 w-4 text-sky-600 shrink-0" />
                  <span className="text-sm">
                    <span className="font-semibold">3</span> new intakes this week
                  </span>
                </div>
              </div>
              <div className="pt-3">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/journey-map" className="text-red-700">
                    View journey map <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN — 1/3 */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/intake">
                  <Plus className="h-4 w-4 mr-2" />
                  New Intake
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/case-notes">
                  <FileText className="h-4 w-4 mr-2" />
                  Log Case Note
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/text">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Text
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/transport">
                  <Car className="h-4 w-4 mr-2" />
                  Schedule Ride
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/emergency-fund">
                  <Wallet className="h-4 w-4 mr-2" />
                  Record Disbursement
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Team Pulse */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Team Pulse
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded bg-muted/40">
                <div>
                  <p className="text-sm font-medium">Sarah Chen</p>
                  <p className="text-xs text-muted-foreground">18 days since day off</p>
                </div>
                <Badge className="bg-red-600 text-white">28 cases</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-muted/40">
                <div>
                  <p className="text-sm font-medium">Fr. Michael</p>
                  <p className="text-xs text-muted-foreground">3 days since day off</p>
                </div>
                <Badge className="bg-emerald-600 text-white">8 cases</Badge>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Team wellness</span>
                  <span className="text-lg font-bold font-serif">74<span className="text-sm font-normal text-muted-foreground">/100</span></span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-1.5">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{ width: '74%' }}
                  />
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/staff-wellness" className="text-red-700">
                  View staff wellness <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-slate-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockActivities.slice(0, 6).map((act) => {
                  const Icon = activityIcon[act.type] || Activity;
                  return (
                    <div key={act.id} className="flex gap-3 items-start">
                      <div className="rounded-full p-1.5 bg-muted shrink-0 mt-0.5">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm leading-snug">
                          {act.description.slice(0, 60)}
                          {act.description.length > 60 ? '...' : ''}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {act.personName} &middot; {formatDaysAgo(act.date)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Celebration Corner */}
          <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/10">
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                Celebration Corner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2 items-start">
                <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm">
                  <span className="font-medium">Marcus</span> secured permanent housing
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm">
                  <span className="font-medium">Denise</span> passed her GED
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm">
                  <span className="font-medium">Anthony</span>'s employer promoted him
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-serif text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-sky-600" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockEvents.slice(0, 3).map((evt) => (
                <div key={evt.id} className="p-2 rounded bg-muted/40">
                  <p className="text-sm font-medium">{evt.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(evt.date)} &middot; {evt.attendeeCount} attending
                  </p>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/events" className="text-red-700">
                  View all events <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="text-center text-sm text-muted-foreground py-4 border-t">
        Serving {mockDashboardStats.activePeople} people across 5 journey stages.{' '}
        {mockDashboardStats.activeMentors} mentors active.{' '}
        <span className="font-medium text-foreground">Your work matters.</span>
      </div>
    </div>
  );
}
