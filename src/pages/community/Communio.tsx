import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Hammer, Building2, Home, Users, Heart, ChevronRight } from 'lucide-react';

const pipelineSteps = [
  { label: 'IN PRISON', sub: 'Companion Book', app: 'Fabrica', icon: Heart, color: 'bg-red-900' },
  { label: 'RELEASE', sub: 'Case Coordination', app: 'Resurrectio', icon: Users, color: 'bg-red-700' },
  { label: 'SKILLS', sub: '16-Week Guild Course', app: 'Fabrica', icon: Hammer, color: 'bg-violet-500' },
  { label: 'OWNERSHIP', sub: 'Worker Cooperative', app: 'Communis', icon: Building2, color: 'bg-emerald-600' },
  { label: 'HOUSING', sub: 'Community Land Trust', app: 'Propria', icon: Home, color: 'bg-amber-500' },
  { label: 'COMMUNITY', sub: 'Civic Participation', app: 'CROS', icon: Users, color: 'bg-red-500' },
];

const connections = [
  { name: 'Fabrica', description: '16-week guild course providing craft training, identity formation, and community for returning citizens.', status: 'Active', peopleReady: 7, icon: Hammer },
  { name: 'Communis', description: 'Worker cooperative management. The path from employment to ownership through shared enterprise.', status: 'Active', peopleReady: 3, icon: Building2 },
  { name: 'Propria', description: 'Community Land Trust management. Permanent affordable housing through collective ownership.', status: 'Coming Soon', peopleReady: 0, icon: Home },
];

export default function Communio() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-serif mb-4">The Full Restoration Pipeline</h2>
        <p className="text-sm text-muted-foreground mb-6">From incarceration to ownership — the complete distributist restoration arc.</p>
        <div className="flex flex-wrap items-center gap-2">
          {pipelineSteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <div className={`${step.color} text-white rounded-lg px-4 py-3 text-center min-w-[130px]`}>
                <step.icon className="h-5 w-5 mx-auto mb-1" />
                <div className="text-xs font-bold uppercase tracking-wider">{step.label}</div>
                <div className="text-[10px] opacity-80">{step.sub}</div>
                <Badge variant="secondary" className="mt-1 text-[9px]">{step.app}</Badge>
              </div>
              {i < pipelineSteps.length - 1 && <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 hidden sm:block" />}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-serif mb-4">Connected Applications</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {connections.map((conn) => (
            <Card key={conn.name} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <conn.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-serif">{conn.name}</CardTitle>
                    <Badge variant={conn.status === 'Active' ? 'default' : 'secondary'} className="text-xs">{conn.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{conn.description}</p>
                {conn.peopleReady > 0 && <p className="text-sm font-medium text-primary mb-3">{conn.peopleReady} people ready for warm handoff</p>}
                <Button variant="outline" size="sm" className="w-full">View Connection <ArrowRight className="ml-2 h-3 w-3" /></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
