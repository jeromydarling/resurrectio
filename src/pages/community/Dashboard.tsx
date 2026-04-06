import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockDashboardStats, mockActivities, mockSignals } from '@/data/mockData';
import { STAGE_LABELS, STAGE_COLORS } from '@/types/resurrectio';
import type { JourneyStage } from '@/types/resurrectio';
import {
  Users, UserCheck, Home, Briefcase, BookOpen, AlertTriangle,
  Activity, Clock, Phone, Eye, Mail, FileText, Award, MapPin,
} from 'lucide-react';

const stats = mockDashboardStats;

const statCards = [
  { label: 'Active People', value: stats.activePeople, icon: Users, color: 'text-red-800' },
  { label: 'Active Mentors', value: stats.activeMentors, icon: UserCheck, color: 'text-red-700' },
  { label: 'Housing Rate', value: `${stats.housingPlacementRate}%`, icon: Home, color: 'text-emerald-600' },
  { label: 'Employment Rate', value: `${stats.employmentRate}%`, icon: Briefcase, color: 'text-blue-600' },
  { label: 'Programs', value: stats.activePrograms, icon: BookOpen, color: 'text-amber-600' },
  { label: 'Active Signals', value: stats.activeSignals, icon: AlertTriangle, color: 'text-red-500' },
];

const activityIcons: Record<string, React.ElementType> = {
  milestone: Award,
  visit: MapPin,
  referral: FileText,
  meeting: Users,
  call: Phone,
  note: FileText,
  email: Mail,
};

const confidenceColors: Record<string, string> = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-amber-100 text-amber-800',
  low: 'bg-slate-100 text-slate-700',
};

const pipelineStages: JourneyStage[] = ['pre_release', 'stabilization', 'growth', 'flourishing', 'alumni'];
const pipelineTotal = pipelineStages.reduce((sum, s) => sum + stats.pipeline[s], 0);

export default function CommunityDashboard() {
  return (
    <div className="space-y-8">
      <p className="text-muted-foreground">Overview of the Resurrectio reentry community</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((s) => (
          <Card key={s.label} className="bg-white/80">
            <CardContent className="pt-6 pb-4 text-center">
              <s.icon className={`h-6 w-6 mx-auto mb-2 ${s.color}`} />
              <p className="text-2xl font-bold text-red-950">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Journey Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-red-950">Journey Pipeline</CardTitle>
          <CardDescription>Distribution of people across reentry stages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex rounded-lg overflow-hidden h-10">
            {pipelineStages.map((stage) => {
              const count = stats.pipeline[stage];
              const pct = (count / pipelineTotal) * 100;
              return (
                <div
                  key={stage}
                  className={`${STAGE_COLORS[stage]} flex items-center justify-center text-xs font-semibold transition-all`}
                  style={{ width: `${pct}%` }}
                  title={`${STAGE_LABELS[stage]}: ${count}`}
                >
                  {count}
                </div>
              );
            })}
          </div>
          <div className="flex mt-3 gap-4 flex-wrap">
            {pipelineStages.map((stage) => (
              <div key={stage} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className={`inline-block w-3 h-3 rounded ${STAGE_COLORS[stage]}`} />
                {STAGE_LABELS[stage]} ({stats.pipeline[stage]})
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-red-950 flex items-center gap-2">
              <Activity className="h-5 w-5" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {mockActivities.slice(0, 8).map((a) => {
              const Icon = activityIcons[a.type] || Activity;
              return (
                <div key={a.id}>
                  <div className="flex items-start gap-3 py-2">
                    <Icon className="h-4 w-4 mt-0.5 text-red-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{a.description}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span className="font-medium">{a.personName}</span>
                        <span>&middot;</span>
                        <Clock className="h-3 w-3" />
                        <span>{a.date}</span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Top NRI Signals */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-red-950 flex items-center gap-2">
              <Eye className="h-5 w-5" /> Top NRI Signals
            </CardTitle>
            <CardDescription>Narrative Resonance Intelligence alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockSignals.slice(0, 5).map((s) => (
              <div key={s.id} className="border rounded-lg p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm text-red-950">{s.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.personName}</p>
                  </div>
                  <Badge className={confidenceColors[s.confidence]}>{s.confidence}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{s.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
