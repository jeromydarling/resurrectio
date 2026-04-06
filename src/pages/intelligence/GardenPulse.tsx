import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sprout, TrendingUp, TrendingDown, AlertTriangle, Star, Heart, Home, Briefcase, Sparkles } from 'lucide-react';
import { mockSignals } from '@/data/mockData';
import { signalTypes } from '@/config/brand';
import type { SignalTypeKey } from '@/config/brand';

const driftSignals = mockSignals.filter(s => (s.type === 'drift_risk' || s.type === 'retention_risk') && !s.dismissed);
const celebrationSignals = mockSignals.filter(s => (s.type === 'transformation_momentum' || s.type === 'employment_milestone' || s.type === 'family_reconnection') && !s.dismissed);

function getSignalLabel(type: string): string {
  const config = signalTypes[type as SignalTypeKey];
  return config?.label ?? type;
}

function getSignalColor(type: string): string {
  const config = signalTypes[type as SignalTypeKey];
  return config?.color ?? '#991b1b';
}

export default function GardenPulse() {
  return (
    <div className="space-y-8 bg-gradient-to-b from-amber-50/50 to-red-50/30 min-h-screen p-1">
      {/* Health Score */}
      <div className="flex items-center justify-center py-8">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
            <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--primary))" strokeWidth="10" strokeDasharray={`${78 * 3.14} ${100 * 3.14}`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Sprout className="h-6 w-6 text-primary mb-1" />
            <span className="text-3xl font-bold">78%</span>
            <span className="text-xs text-muted-foreground">Health Score</span>
          </div>
        </div>
      </div>

      {/* Growth Trends */}
      <div>
        <h2 className="text-xl font-serif mb-4">Growth Trends</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: 'New Enrollments', value: '+14', trend: 'up', detail: 'This month vs last', icon: TrendingUp },
            { label: 'Housing Stability', value: '87%', trend: 'up', detail: 'Avg stability score', icon: Home },
            { label: 'Employment Retention', value: '73%', trend: 'down', detail: '90-day retention rate', icon: Briefcase },
          ].map(item => (
            <Card key={item.label} className="bg-gradient-to-br from-red-50/50 to-white">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <item.icon className={`h-5 w-5 ${item.trend === 'up' ? 'text-emerald-600' : 'text-amber-600'}`} />
                  {item.trend === 'up' ? <TrendingUp className="h-4 w-4 text-emerald-600" /> : <TrendingDown className="h-4 w-4 text-amber-600" />}
                </div>
                <div className="text-2xl font-bold mb-1">{item.value}</div>
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.detail}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Concern Areas */}
      <div>
        <h2 className="text-xl font-serif mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" /> Concern Areas
        </h2>
        <div className="space-y-3">
          {driftSignals.length > 0 ? driftSignals.map(signal => (
            <Card key={signal.id} className="border-l-4" style={{ borderLeftColor: getSignalColor(signal.type) }}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{signal.personName}</span>
                  <Badge className="text-xs" style={{ backgroundColor: `${getSignalColor(signal.type)}15`, color: getSignalColor(signal.type) }}>
                    {getSignalLabel(signal.type)}
                  </Badge>
                </div>
                <h4 className="font-serif text-sm font-medium mb-1">{signal.title}</h4>
                <p className="text-sm text-muted-foreground">{signal.description}</p>
              </CardContent>
            </Card>
          )) : (
            <p className="text-sm text-muted-foreground italic">No active concerns. The garden is healthy.</p>
          )}
        </div>
      </div>

      {/* Celebration Moments */}
      <div>
        <h2 className="text-xl font-serif mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-400" /> Celebration Moments
        </h2>
        <div className="space-y-3">
          {celebrationSignals.map(signal => (
            <Card key={signal.id} className="border-l-4 bg-gradient-to-r from-emerald-50/30 to-white" style={{ borderLeftColor: getSignalColor(signal.type) }}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{signal.personName}</span>
                      <Badge className="text-xs" style={{ backgroundColor: `${getSignalColor(signal.type)}15`, color: getSignalColor(signal.type) }}>
                        {getSignalLabel(signal.type)}
                      </Badge>
                    </div>
                    <h4 className="font-serif text-sm font-medium mb-1">{signal.title}</h4>
                    <p className="text-sm text-muted-foreground">{signal.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
