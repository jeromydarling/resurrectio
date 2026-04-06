/**
 * Staff Wellness & Burnout Detection — NRI watches the watchers.
 *
 * WHAT: Detects burnout signals in staff and mentors so leadership can intervene.
 * WHERE: /staff-wellness
 * WHY: The people serving returning citizens carry heavy stories. NRI ensures
 *       they get support before they break.
 */

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Heart,
  Users,
  UserCheck,
  AlertTriangle,
  ClipboardCheck,
  PartyPopper,
  BedDouble,
  Handshake,
  Activity,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Inline mock data                                                   */
/* ------------------------------------------------------------------ */

const teamStats = {
  wellnessScore: 74,
  staffCount: 5,
  mentorsActive: 34,
  burnoutSignals: 2,
};

type WellnessLevel = 'green' | 'amber' | 'red';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  wellness: WellnessLevel;
  caseload: number | null;
  caseloadLabel: string | null;
  metrics: { label: string; value: string | number }[];
  nriSignal: string | null;
  lastDayOff: number;
}

const staffMembers: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Sarah Chen',
    role: 'Case Manager',
    wellness: 'amber',
    caseload: 28,
    caseloadLabel: 'HIGH',
    metrics: [
      { label: 'Avg case notes/week', value: '12 (down from 18)' },
      { label: 'Avg note length', value: '45 words (down from 120)' },
      { label: 'Last day off', value: '18 days ago' },
    ],
    nriSignal:
      '\u{1F4C9} Note quality declining. Case note length dropped 62% over 4 weeks. Caseload 40% above recommended maximum.',
    lastDayOff: 18,
  },
  {
    id: 'staff-2',
    name: 'Fr. Michael Torres',
    role: 'Program Director',
    wellness: 'green',
    caseload: 8,
    caseloadLabel: null,
    metrics: [
      { label: 'Caseload', value: '8 (oversight)' },
      { label: 'Meetings this week', value: 14 },
      { label: 'After-hours contacts', value: 6 },
      { label: 'Last day off', value: '12 days ago' },
    ],
    nriSignal: null,
    lastDayOff: 12,
  },
  {
    id: 'staff-3',
    name: 'Deacon James',
    role: 'Mentor Coordinator',
    wellness: 'amber',
    caseload: null,
    caseloadLabel: null,
    metrics: [
      { label: 'Active mentors managed', value: 34 },
      { label: 'Mentor concerns this month', value: 12 },
      { label: 'Mentor departures (Q1)', value: 2 },
    ],
    nriSignal:
      '\u{26A0}\u{FE0F} Mentor departure rate increasing. 2 departures in Q1 vs 1 in all of last year.',
    lastDayOff: 9,
  },
  {
    id: 'staff-4',
    name: 'Maria Rodriguez',
    role: 'Housing Navigator',
    wellness: 'green',
    caseload: 22,
    caseloadLabel: 'MODERATE',
    metrics: [
      { label: 'Housing crisis calls/month', value: 8 },
      { label: 'Successful placements/month', value: 3 },
    ],
    nriSignal: null,
    lastDayOff: 5,
  },
  {
    id: 'staff-5',
    name: 'Tom Wilson',
    role: 'Employment Specialist',
    wellness: 'green',
    caseload: 18,
    caseloadLabel: 'OK',
    metrics: [
      { label: 'Employer visits/month', value: '4 (down from 8)' },
      { label: 'Placements this month', value: 2 },
    ],
    nriSignal: null,
    lastDayOff: 12,
  },
];

interface CaseloadBar {
  name: string;
  caseload: number;
  color: string;
  bgColor: string;
}

const caseloadData: CaseloadBar[] = [
  { name: 'Sarah Chen', caseload: 28, color: 'bg-red-600', bgColor: 'text-red-700' },
  { name: 'Maria Rodriguez', caseload: 22, color: 'bg-yellow-500', bgColor: 'text-yellow-700' },
  { name: 'Tom Wilson', caseload: 18, color: 'bg-green-600', bgColor: 'text-green-700' },
];

const recommendedMax = 20;

interface NriSignal {
  id: string;
  title: string;
  severity: 'red' | 'amber';
  staffName: string;
  description: string;
  evidence: string[];
  recommendation: string;
}

const nriSignals: NriSignal[] = [
  {
    id: 'sig-1',
    title: 'Caseload Overload',
    severity: 'red',
    staffName: 'Sarah Chen',
    description:
      'Caseload at 28, 40% above recommended maximum of 20. Quality indicators declining: shorter notes, fewer touchpoints per person, 3 overdue follow-ups.',
    evidence: ['Note length trend', 'Touchpoint frequency', 'Overdue items'],
    recommendation: 'Redistribute 8 cases to balance team load',
  },
  {
    id: 'sig-2',
    title: 'Engagement Decline',
    severity: 'amber',
    staffName: 'Tom Wilson',
    description:
      'Employer visits dropped 50% month-over-month. Placement rate declining. No day off in 12 days.',
    evidence: ['Activity log', 'Placement metrics', 'Time-off records'],
    recommendation: 'Mandatory day off + supervisor check-in',
  },
  {
    id: 'sig-3',
    title: 'Mentor Network Stress',
    severity: 'amber',
    staffName: 'Deacon James',
    description:
      '2 mentor departures this quarter. 3 mentors reporting feeling unsupported. Mentor satisfaction survey scores declining.',
    evidence: ['Departure data', 'Survey results', 'Support request frequency'],
    recommendation: 'Mentor appreciation event + review support structure',
  },
];

const celebrationWins = [
  'Marcus secured permanent housing \u2014 6 months after release',
  'Denise passed her GED on the first attempt',
  "Anthony's employer promoted him to shift supervisor",
];

const peerPairings = [
  { a: 'Sarah Chen', b: 'Maria Rodriguez', note: 'Both carry heavy caseloads. Weekly debrief Fridays.' },
  { a: 'Deacon James', b: 'Fr. Michael Torres', note: 'Mentor coordination and program oversight overlap.' },
];

/* ------------------------------------------------------------------ */
/*  Helper components                                                  */
/* ------------------------------------------------------------------ */

function WellnessDot({ level }: { level: WellnessLevel }) {
  const colors: Record<WellnessLevel, string> = {
    green: 'bg-green-500',
    amber: 'bg-yellow-500',
    red: 'bg-red-600',
  };
  return (
    <span
      className={`inline-block h-3 w-3 rounded-full ${colors[level]}`}
      aria-label={`Wellness: ${level}`}
    />
  );
}

function wellnessLabel(level: WellnessLevel) {
  const map: Record<WellnessLevel, string> = {
    green: 'Green',
    amber: 'Amber',
    red: 'Red',
  };
  return map[level];
}

function dayOffColor(days: number): string {
  if (days <= 7) return 'text-green-700';
  if (days <= 14) return 'text-yellow-700';
  return 'text-red-700';
}

function dayOffBg(days: number): string {
  if (days <= 7) return 'bg-green-50';
  if (days <= 14) return 'bg-yellow-50';
  return 'bg-red-50';
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function StaffWellness() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-6xl px-4 py-12 space-y-12">
        {/* ---- Hero ---- */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-sm font-medium text-red-800">
            <ShieldCheck className="h-4 w-4" />
            NRI Staff Wellness & Burnout Detection
          </div>
          <h1 className="font-serif text-4xl font-bold text-stone-900 md:text-5xl">
            Watching the Watchers
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-stone-600 leading-relaxed">
            The people serving returning citizens carry heavy stories. NRI doesn't just watch
            the people being served — it watches for signs that the people doing the serving
            need support too.
          </p>
        </header>

        {/* ---- Section 1: Team Health Overview ---- */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-stone-900">Team Health Overview</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Wellness Score */}
            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="pt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-stone-500">
                  <Activity className="h-4 w-4" />
                  Staff Wellness Score
                </div>
                <p className="text-3xl font-bold text-yellow-700">
                  {teamStats.wellnessScore}
                  <span className="text-lg font-normal text-stone-400">/100</span>
                </p>
                <Badge variant="outline" className="border-yellow-500 text-yellow-700">
                  Amber — needs attention
                </Badge>
              </CardContent>
            </Card>

            {/* Staff count */}
            <Card>
              <CardContent className="pt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-stone-500">
                  <Users className="h-4 w-4" />
                  Staff Members
                </div>
                <p className="text-3xl font-bold text-stone-900">{teamStats.staffCount}</p>
                <div className="flex items-center gap-2">
                  {staffMembers.map((s) => (
                    <WellnessDot key={s.id} level={s.wellness} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mentors */}
            <Card>
              <CardContent className="pt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-stone-500">
                  <UserCheck className="h-4 w-4" />
                  Mentors Active
                </div>
                <p className="text-3xl font-bold text-stone-900">{teamStats.mentorsActive}</p>
              </CardContent>
            </Card>

            {/* Burnout signals */}
            <Card className="border-l-4 border-l-red-600">
              <CardContent className="pt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-stone-500">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  Burnout Signals Active
                </div>
                <p className="text-3xl font-bold text-red-700">{teamStats.burnoutSignals}</p>
                <Badge variant="outline" className="border-red-500 text-red-700">
                  Requires leadership review
                </Badge>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ---- Section 2: Individual Staff Dashboard ---- */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            Individual Staff Dashboard
          </h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {staffMembers.map((staff) => (
              <Card key={staff.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-serif text-lg">{staff.name}</CardTitle>
                      <CardDescription>{staff.role}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-stone-500">{wellnessLabel(staff.wellness)}</span>
                      <WellnessDot level={staff.wellness} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4">
                  {/* Caseload badge */}
                  {staff.caseload !== null && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-stone-600">Caseload:</span>
                      <span className="font-semibold">{staff.caseload}</span>
                      {staff.caseloadLabel && (
                        <Badge
                          variant="outline"
                          className={
                            staff.caseloadLabel === 'HIGH'
                              ? 'border-red-500 text-red-700'
                              : staff.caseloadLabel === 'MODERATE'
                                ? 'border-yellow-500 text-yellow-700'
                                : 'border-green-500 text-green-700'
                          }
                        >
                          {staff.caseloadLabel}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Metrics grid */}
                  <div className="grid grid-cols-1 gap-1.5 text-sm">
                    {staff.metrics.map((m, i) => (
                      <div key={i} className="flex justify-between gap-2">
                        <span className="text-stone-500">{m.label}</span>
                        <span className="font-medium text-stone-800 text-right">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* NRI Signal */}
                  {staff.nriSignal && (
                    <div
                      className={`rounded-md border-l-4 p-3 text-sm leading-relaxed ${
                        staff.wellness === 'red'
                          ? 'border-l-red-600 bg-red-50 text-red-800'
                          : 'border-l-yellow-500 bg-yellow-50 text-yellow-800'
                      }`}
                    >
                      <p className="font-medium mb-1">NRI Signal</p>
                      <p>{staff.nriSignal}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-auto flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Full Profile
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-red-700 hover:bg-red-800 text-white"
                    >
                      Schedule Check-In
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ---- Section 3: Caseload Balance ---- */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-stone-900">Caseload Balance</h2>
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-4">
                {caseloadData.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-stone-800">{item.name}</span>
                      <span className={`font-bold ${item.bgColor}`}>{item.caseload}</span>
                    </div>
                    <div className="relative h-6 w-full rounded bg-stone-100">
                      {/* Recommended max line */}
                      <div
                        className="absolute top-0 h-full border-r-2 border-dashed border-stone-400"
                        style={{ left: `${(recommendedMax / 35) * 100}%` }}
                      />
                      {/* Bar */}
                      <div
                        className={`h-full rounded ${item.color}`}
                        style={{ width: `${(item.caseload / 35) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-xs text-stone-500 border-t pt-4">
                <div className="flex items-center gap-1.5">
                  <div className="h-3 w-0.5 border-r-2 border-dashed border-stone-400" />
                  <span>Recommended max: {recommendedMax}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded bg-green-600" />
                  <span>Healthy</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded bg-yellow-500" />
                  <span>Approaching</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded bg-red-600" />
                  <span>Over threshold</span>
                </div>
              </div>

              <p className="text-sm italic text-stone-500">
                When one person carries too much, everyone suffers — the staff member, their
                families, and the people they serve.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ---- Section 4: NRI Staff Signals ---- */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-stone-900">
            NRI Staff Signals
          </h2>
          <p className="text-stone-600">
            The burnout detection engine — active and recent signals across the team.
          </p>
          <div className="space-y-4">
            {nriSignals.map((sig) => (
              <Card
                key={sig.id}
                className={`border-l-4 ${
                  sig.severity === 'red' ? 'border-l-red-600' : 'border-l-yellow-500'
                }`}
              >
                <CardContent className="pt-6 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge
                      className={
                        sig.severity === 'red'
                          ? 'bg-red-100 text-red-800 hover:bg-red-100'
                          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                      }
                    >
                      {sig.severity === 'red' ? 'Red' : 'Amber'}
                    </Badge>
                    <h3 className="font-serif text-lg font-bold text-stone-900">{sig.title}</h3>
                    <span className="text-sm text-stone-500">— {sig.staffName}</span>
                  </div>

                  <p className="text-sm text-stone-700 leading-relaxed">{sig.description}</p>

                  <div className="text-sm">
                    <p className="font-medium text-stone-600 mb-1">Evidence:</p>
                    <ul className="list-disc list-inside text-stone-500 space-y-0.5">
                      {sig.evidence.map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`rounded-md p-3 text-sm ${
                      sig.severity === 'red' ? 'bg-red-50 text-red-800' : 'bg-yellow-50 text-yellow-800'
                    }`}
                  >
                    <span className="font-medium">Recommendation:</span> {sig.recommendation}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ---- Section 5: Wellness Tools ---- */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-stone-900">Wellness Tools</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Self Check-In */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-red-700" />
                  <CardTitle className="font-serif text-lg">Self Check-In</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-stone-600 leading-relaxed">
                  Weekly 2-minute pulse check for staff. Private. Not shared with leadership
                  unless you choose to.
                </p>
                <Button className="bg-red-700 hover:bg-red-800 text-white">
                  Take Check-In
                </Button>
              </CardContent>
            </Card>

            {/* Celebration Feed */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <PartyPopper className="h-5 w-5 text-red-700" />
                  <CardTitle className="font-serif text-lg">Celebration Feed</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-stone-600 leading-relaxed">
                  Wins from the last 7 days — because this work is heavy, and the victories
                  matter.
                </p>
                <ul className="space-y-2">
                  {celebrationWins.map((win, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 rounded-md bg-green-50 p-2.5 text-sm text-green-800"
                    >
                      <Heart className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                      {win}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Rest Tracker */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BedDouble className="h-5 w-5 text-red-700" />
                  <CardTitle className="font-serif text-lg">Rest Tracker</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-stone-600 leading-relaxed">
                  Days since last full day off for each team member.
                </p>
                <ul className="space-y-1.5">
                  {staffMembers.map((s) => (
                    <li
                      key={s.id}
                      className={`flex items-center justify-between rounded-md px-3 py-1.5 text-sm ${dayOffBg(s.lastDayOff)}`}
                    >
                      <span className="text-stone-700">{s.name}</span>
                      <span className={`font-bold ${dayOffColor(s.lastDayOff)}`}>
                        {s.lastDayOff} days
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-4 text-xs text-stone-400 pt-1">
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-500" /> &lt;7 days
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-yellow-500" /> 7-14 days
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded-full bg-red-600" /> &gt;14 days
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Peer Support */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Handshake className="h-5 w-5 text-red-700" />
                  <CardTitle className="font-serif text-lg">Peer Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-stone-600 leading-relaxed">
                  Matched staff pairs for mutual support — because debriefing with someone who
                  understands matters.
                </p>
                <div className="space-y-2">
                  {peerPairings.map((pair, i) => (
                    <div
                      key={i}
                      className="rounded-md border border-stone-200 bg-stone-50 p-3 text-sm"
                    >
                      <p className="font-medium text-stone-800">
                        {pair.a} <ArrowRight className="inline h-3 w-3 mx-1 text-red-600" />{' '}
                        {pair.b}
                      </p>
                      <p className="text-stone-500 mt-0.5">{pair.note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ---- Bottom Quote ---- */}
        <footer className="rounded-xl bg-red-900 p-8 text-center text-white">
          <Heart className="mx-auto mb-4 h-8 w-8 text-red-300" />
          <blockquote className="font-serif text-xl italic leading-relaxed md:text-2xl">
            "You can't pour from an empty cup. NRI watches the watchers — not to surveil, but
            to protect the people who show up every day for the hardest work there is."
          </blockquote>
        </footer>
      </div>
    </div>
  );
}
