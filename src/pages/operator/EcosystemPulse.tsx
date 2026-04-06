/**
 * EcosystemPulse — Cross-ministry health metrics for the Gardener Console.
 *
 * WHAT: Aggregate outcome metrics with trends and ministry health rankings.
 * WHERE: /operator/ecosystem-pulse
 * WHY: Operators need to see how the whole ecosystem is performing across key metrics.
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Home, Briefcase, Target, Bell, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

const metrics = [
  { label: 'Avg Housing Rate', value: '68%', numValue: 68, icon: Home, trend: 'up', change: '+3%', color: 'text-green-400' },
  { label: 'Avg Employment Rate', value: '62%', numValue: 62, icon: Briefcase, trend: 'up', change: '+5%', color: 'text-green-400' },
  { label: 'Total Milestones This Month', value: '47', numValue: null, icon: Target, trend: 'down', change: '-2', color: 'text-red-400' },
  { label: 'Signal Response Rate', value: '84%', numValue: 84, icon: Bell, trend: 'up', change: '+7%', color: 'text-green-400' },
];

const ministryHealth = [
  { name: 'St. Vincent de Paul Reentry', score: 94, housing: 78, employment: 72 },
  { name: 'Bridges to Life', score: 91, housing: 74, employment: 68 },
  { name: 'Kairos Prison Ministry', score: 87, housing: 65, employment: 60 },
  { name: 'Dismas Ministry', score: 82, housing: 70, employment: 58 },
  { name: 'Catholic Charities Reentry', score: 79, housing: 62, employment: 55 },
  { name: 'Kolbe House', score: 74, housing: 58, employment: 52 },
  { name: 'St. Francis House', score: 68, housing: 55, employment: 48 },
  { name: 'Exodus Transitional', score: 63, housing: 50, employment: 44 },
];

const scoreColor = (score: number) =>
  score >= 85 ? 'text-green-400' : score >= 70 ? 'text-yellow-400' : 'text-orange-400';

export default function EcosystemPulse() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-purple-100">Ecosystem Pulse</h1>
        <p className="text-purple-300/70 text-sm mt-1">Cross-ministry health and outcome metrics</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <Card key={m.label} className="bg-purple-950/40 border-purple-800/40">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-purple-900/50">
                  <m.icon className="w-4 h-4 text-purple-400" />
                </div>
                <div className={`flex items-center gap-1 text-xs ${m.color}`}>
                  {m.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {m.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-purple-100">{m.value}</p>
              <p className="text-sm text-purple-300/70 mt-1">{m.label}</p>
              {m.numValue !== null && (
                <Progress value={m.numValue} className="mt-3 h-1.5 bg-purple-900/30 [&>div]:bg-purple-500" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="bg-purple-800/30" />

      {/* Ministry health rankings */}
      <Card className="bg-purple-950/40 border-purple-800/40">
        <CardHeader>
          <CardTitle className="text-purple-100 text-lg">Ministry Health Rankings</CardTitle>
          <CardDescription className="text-purple-400/70">Ranked by composite health score</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {ministryHealth.map((m, idx) => (
            <div key={m.name} className="flex items-center gap-4 p-3 rounded-lg bg-purple-900/15 border border-purple-800/15 hover:bg-purple-900/25 transition-colors">
              <span className="text-lg font-bold text-purple-500/60 w-8 text-center">{idx + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-purple-100 truncate">{m.name}</p>
                <div className="flex gap-4 mt-1 text-xs text-purple-400/60">
                  <span>Housing: {m.housing}%</span>
                  <span>Employment: {m.employment}%</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={m.score} className="w-24 h-2 bg-purple-900/30 [&>div]:bg-purple-500" />
                <span className={`text-sm font-bold ${scoreColor(m.score)} w-10 text-right`}>{m.score}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
