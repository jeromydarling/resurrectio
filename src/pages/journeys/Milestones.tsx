import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  Briefcase,
  CalendarCheck,
  GraduationCap,
  Heart,
  ShieldCheck,
  Car,
  Landmark,
  CheckCircle2,
  Clock,
  Trophy,
} from 'lucide-react';
import { mockMilestones } from '@/data/mockData';
import type { Milestone } from '@/types/resurrectio';

type MilestoneCategory = Milestone['category'];

const CATEGORY_LABELS: Record<MilestoneCategory, string> = {
  housing_secured: 'Housing Secured',
  employment_started: 'Employment Started',
  ninety_day_retention: '90-Day Retention',
  program_completion: 'Program Completion',
  family_reunification: 'Family Reunification',
  compliance_clear: 'Compliance Clear',
  drivers_license: "Driver's License",
  bank_account: 'Bank Account',
};

const CATEGORY_ICONS: Record<MilestoneCategory, React.ComponentType<{ className?: string }>> = {
  housing_secured: Home,
  employment_started: Briefcase,
  ninety_day_retention: CalendarCheck,
  program_completion: GraduationCap,
  family_reunification: Heart,
  compliance_clear: ShieldCheck,
  drivers_license: Car,
  bank_account: Landmark,
};

const CATEGORY_COLORS: Record<MilestoneCategory, string> = {
  housing_secured: 'bg-emerald-100 text-emerald-700',
  employment_started: 'bg-blue-100 text-blue-700',
  ninety_day_retention: 'bg-amber-100 text-amber-700',
  program_completion: 'bg-red-200 text-red-800',
  family_reunification: 'bg-pink-100 text-pink-700',
  compliance_clear: 'bg-teal-100 text-teal-700',
  drivers_license: 'bg-indigo-100 text-indigo-700',
  bank_account: 'bg-orange-100 text-orange-700',
};

const ALL_CATEGORIES: MilestoneCategory[] = [
  'housing_secured',
  'employment_started',
  'ninety_day_retention',
  'program_completion',
  'family_reunification',
  'compliance_clear',
  'drivers_license',
  'bank_account',
];

export default function Milestones() {
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const cat of ALL_CATEGORIES) c[cat] = 0;
    for (const m of mockMilestones) c[m.category]++;
    return c;
  }, []);

  const grouped = useMemo(() => {
    const map: Record<string, Milestone[]> = {};
    for (const cat of ALL_CATEGORIES) map[cat] = [];
    for (const m of mockMilestones) {
      map[m.category].push(m);
    }
    // Sort each group by date descending
    for (const cat of ALL_CATEGORIES) {
      map[cat].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    return map;
  }, []);

  const totalVerified = mockMilestones.filter((m) => m.verified).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-red-950">
          Milestones
        </h1>
        <p className="mt-1 text-muted-foreground">
          Each milestone marks a step forward in someone's restoration journey.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
        <Card className="border-red-200">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-200">
              <Trophy className="h-5 w-5 text-red-800" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-950">{mockMilestones.length}</p>
              <p className="text-xs text-muted-foreground">Total Milestones</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-100">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-800">{totalVerified}</p>
              <p className="text-xs text-muted-foreground">Verified</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-100">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
              <Clock className="h-5 w-5 text-amber-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-800">
                {mockMilestones.length - totalVerified}
              </p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-pink-100">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
              <Heart className="h-5 w-5 text-pink-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-pink-800">
                {counts['family_reunification']}
              </p>
              <p className="text-xs text-muted-foreground">Reunifications</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grouped Milestones */}
      {ALL_CATEGORIES.map((cat) => {
        const milestones = grouped[cat];
        if (milestones.length === 0) return null;

        const Icon = CATEGORY_ICONS[cat];

        return (
          <div key={cat} className="space-y-3">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full ${CATEGORY_COLORS[cat]}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <h2 className="font-serif text-lg font-semibold text-red-950">
                {CATEGORY_LABELS[cat]}
              </h2>
              <Badge variant="secondary" className="text-xs">
                {milestones.length}
              </Badge>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {milestones.map((ms) => (
                <Card
                  key={ms.id}
                  className="border-red-200 transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sm text-red-950">{ms.title}</p>
                      {ms.verified ? (
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 shrink-0">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="shrink-0 text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          Pending
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{ms.personName}</p>
                    <p className="text-xs text-muted-foreground/70">
                      {new Date(ms.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
