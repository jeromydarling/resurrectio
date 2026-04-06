import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronDown, ChevronUp, X, AlertTriangle, TrendingUp, Hammer, Briefcase, Heart, Users, Scale, Award, Building2, Clock } from 'lucide-react';
import { mockSignals } from '@/data/mockData';
import { signalTypes } from '@/config/brand';

const signalIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  transformation_momentum: TrendingUp, drift_risk: AlertTriangle, fabrica_ready: Hammer,
  retention_risk: Briefcase, family_reconnection: Heart, community_growing: Users,
  compliance_upcoming: Scale, employment_milestone: Award, communis_ready: Building2,
  pre_release_intake: Clock,
};

const confidenceColors: Record<string, string> = {
  high: 'bg-green-100 text-green-700', medium: 'bg-yellow-100 text-yellow-700', low: 'bg-gray-100 text-gray-700',
};

export default function NriSignals() {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const types = ['all', ...new Set(mockSignals.map(s => s.type))];
  const filtered = typeFilter === 'all' ? mockSignals.filter(s => !s.dismissed) : mockSignals.filter(s => s.type === typeFilter && !s.dismissed);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {types.map(t => (
          <Button key={t} variant={typeFilter === t ? 'default' : 'outline'} size="sm" onClick={() => setTypeFilter(t)} className="capitalize text-xs">
            {t === 'all' ? 'All Signals' : (signalTypes as any)[t]?.label || t}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(signal => {
          const Icon = signalIcons[signal.type] || Sparkles;
          const config = (signalTypes as any)[signal.type];
          const isExpanded = expandedId === signal.id;
          return (
            <Card key={signal.id} className="overflow-hidden" style={{ borderLeftWidth: '4px', borderLeftColor: config?.color || '#6b21a8' }}>
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${config?.color || '#6b21a8'}20` }}>
                    <Icon className="h-4 w-4" style={{ color: config?.color || '#6b21a8' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-serif text-base font-medium">{signal.title}</h3>
                      <Badge className={confidenceColors[signal.confidence]}>{signal.confidence}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{signal.personName}</p>
                    <p className="text-sm mb-3">{signal.description}</p>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setExpandedId(isExpanded ? null : signal.id)}>
                        {isExpanded ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                        Why am I seeing this?
                      </Button>
                      <span className="text-xs text-muted-foreground ml-auto">{signal.date}</span>
                    </div>
                    {isExpanded && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <h4 className="text-xs font-medium uppercase tracking-wider mb-2">Evidence</h4>
                        <ul className="text-sm space-y-1">
                          {signal.evidence.map((e, i) => <li key={i} className="text-muted-foreground">• {e}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
