import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Hammer, Building2, Home, Users, Heart, ChevronRight, ExternalLink } from 'lucide-react';

const pipelineSteps = [
  { label: 'IN PRISON', app: 'Fabrica', color: 'bg-red-900' },
  { label: 'RELEASE', app: 'Resurrectio', color: 'bg-red-700' },
  { label: 'SKILLS', app: 'Fabrica', color: 'bg-red-600' },
  { label: 'OWNERSHIP', app: 'Communis', color: 'bg-emerald-700' },
  { label: 'HOUSING', app: 'Propria', color: 'bg-amber-600' },
  { label: 'COMMUNITY', app: 'CROS', color: 'bg-red-500' },
];

const ecosystemApps = [
  {
    name: 'Fabrica',
    subtitle: 'Guild & Makerspace Management',
    icon: Hammer,
    status: 'Active' as const,
    peopleReady: 7,
    description: 'A 16-week guild course providing craft training, identity formation, and community for returning citizens. Fabrica also offers a companion book for men still inside — spiritual formation and pre-release preparation that begins before the gates open.',
    connection: 'When a person in Resurrectio shows stability and motivation, NRI generates a "Fabrica Ready" signal for a warm handoff to guild training.',
    philosophy: 'Learn a craft. Find your people. Build something that matters.',
  },
  {
    name: 'Communis',
    subtitle: 'Worker Cooperative Management',
    icon: Building2,
    status: 'Active' as const,
    peopleReady: 3,
    description: 'The path from employment to ownership. Communis manages worker cooperatives — shared enterprises where every member has a voice and a stake. For returning citizens who\'ve completed Fabrica, it means the job becomes the business they co-own.',
    connection: 'After sustained employment and Fabrica completion, NRI generates a "Communis Ready" signal — the person is ready for cooperative membership.',
    philosophy: 'From worker to owner. From surviving to building.',
  },
  {
    name: 'Propria',
    subtitle: 'Community Land Trust Management',
    icon: Home,
    status: 'Coming Soon' as const,
    peopleReady: 0,
    description: 'Permanent affordable housing through collective land stewardship. Propria manages Community Land Trusts where the land is held in common and homes remain affordable in perpetuity. For someone who came home to a shelter, it\'s the path to a place that\'s truly theirs.',
    connection: 'As people move through the pipeline toward full community membership, housing stability through Propria becomes the natural next step.',
    philosophy: 'Land held in trust. Homes that stay affordable. Roots that hold.',
  },
  {
    name: 'CROS',
    subtitle: 'The Community Relationship OS',
    icon: Users,
    status: 'Active' as const,
    peopleReady: 0,
    description: 'The foundation everything runs on. CROS is a human CRM — it tracks relationships, narratives, and community health rather than sales pipelines. Every app in the family shares its architecture, its calm UX, and its conviction that people are not transactions.',
    connection: 'CROS is the civic layer — advocacy, community organizing, leadership development. The final step: full participation in community life.',
    philosophy: 'Remember people. Notice what\'s changing. Serve well.',
  },
];

export default function Communio() {
  return (
    <div className="space-y-10">
      {/* Philosophy header */}
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary/60 mb-2">The CROS Ecosystem</p>
        <h2 className="text-2xl font-serif mb-3">Communio — The Shared Network</h2>
        <p className="text-muted-foreground leading-relaxed">
          Resurrectio doesn't exist in isolation. It's part of a family of apps built on CROS — the
          Communal Relationship Operating System. Each app serves a different stage of the restoration
          journey, but they share the same conviction: people are not cases, transactions, or data points.
          They are people on journeys toward flourishing.
        </p>
      </div>

      {/* Pipeline visualization */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">The Full Arc</h3>
        <div className="flex flex-wrap items-center gap-2">
          {pipelineSteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <div className={`${step.color} text-white rounded-lg px-4 py-3 text-center min-w-[110px]`}>
                <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">{step.label}</div>
                <div className="text-xs font-medium mt-0.5">{step.app}</div>
              </div>
              {i < pipelineSteps.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />}
            </div>
          ))}
        </div>
      </div>

      {/* App detail cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Connected Applications</h3>
        {ecosystemApps.map((app) => (
          <Card key={app.name} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <app.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg font-serif">{app.name}</CardTitle>
                      <Badge variant={app.status === 'Active' ? 'default' : 'secondary'} className="text-[10px]">{app.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground italic">{app.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{app.description}</p>
                <p className="text-xs text-primary/70 italic">{app.philosophy}</p>
              </div>
              <div className="md:w-72 bg-muted/30 p-6 border-t md:border-t-0 md:border-l border-border">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">How it connects</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{app.connection}</p>
                {app.peopleReady > 0 && (
                  <p className="text-sm font-medium text-primary">
                    {app.peopleReady} people ready for warm handoff
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Philosophy note */}
      <div className="bg-muted/30 rounded-xl p-6 border border-border max-w-2xl">
        <p className="text-sm text-muted-foreground leading-relaxed italic">
          "The full pipeline — incarceration to ownership — isn't a product feature.
          It's a conviction: that dignity requires not just a job, but a stake;
          not just a roof, but a home; not just survival, but belonging.
          Widespread ownership, shared stewardship, and community-rooted economics
          aren't idealism — they're the architecture of a just restoration."
        </p>
      </div>
    </div>
  );
}
