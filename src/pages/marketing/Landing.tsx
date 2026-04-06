import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/Firefly_Gemini Flash_Empty two-lane highway stretching toward the horizon at golden hour dawn, Route 66 st 897378.png';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Heart,
  Briefcase,
  Users,
  FolderOpen,
  Brain,
  Shield,
  AlertTriangle,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Building2,
  Church,
  HandHeart,
  MapPin,
} from 'lucide-react';

const Landing = React.forwardRef<HTMLDivElement>(function Landing(_props, ref) {
  return (
    <div ref={ref} className="bg-[#faf7f3]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-24 sm:py-32 min-h-[70vh] flex items-center">
        {/* Hero background — Route 66 at dawn */}
        <div className="absolute inset-0 pointer-events-none">
          {/* The road */}
          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover object-bottom"
          />
          {/* Cream overlay for text readability — lighter on mobile so image shows through */}
          <div className="absolute inset-0 bg-[#faf7f3]/60 sm:bg-[#faf7f3]/65" />
          {/* Bottom fade to page background */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#faf7f3] to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-red-950 leading-[1.1] tracking-tight mb-6">
            From Incarceration to Restoration
          </h1>
          <p className="text-lg sm:text-xl text-red-950/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Resurrectio walks with returning citizens from the moment of release through housing,
            employment, and community — transforming reentry from a revolving door into a rising arc.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link to="/signup">
              <Button
                size="lg"
                className="rounded-full bg-red-800 text-white hover:bg-red-900 px-8 h-12 text-base"
              >
                Start Your Ministry <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-red-300 text-red-900 hover:bg-red-50 px-8 h-12 text-base"
              >
                See How It Works
              </Button>
            </a>
          </div>
          <p className="mt-8 text-sm text-red-950/40">
            Trusted by prison ministries and reentry organizations nationwide
          </p>
        </div>
      </section>

      {/* ── Problem / Mission ── */}
      <section id="mission" className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-red-950 mb-4">
              The Reentry Crisis
            </h2>
            <p className="text-red-950/60 max-w-2xl mx-auto leading-relaxed">
              Every year, hundreds of thousands of people leave prison with nowhere to turn.
              Services are fragmented, data lives in spreadsheets, and people fall through the cracks.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: '600K+', label: 'Released annually', desc: 'People returning to communities each year in the U.S.' },
              { stat: '67%', label: 'Recidivism rate', desc: 'Re-arrested within 3 years of release' },
              { stat: '70-80%', label: 'Use spreadsheets or nothing', desc: 'Reentry orgs lack purpose-built tools' },
              { stat: '$3-4.5B', label: 'Annual funding fragmented', desc: 'Spread across disconnected programs and agencies' },
            ].map((item) => (
              <Card key={item.stat} className="text-center border-red-100 bg-white">
                <CardContent className="pt-6 pb-6">
                  <p className="text-3xl sm:text-4xl font-bold text-red-800 mb-2">{item.stat}</p>
                  <p className="font-semibold text-red-950 mb-1">{item.label}</p>
                  <p className="text-sm text-red-950/50">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution Narrative ── */}
      <section className="py-16 sm:py-24 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-red-950 mb-4">
              People, Not Cases
            </h2>
            <p className="text-red-950/60 max-w-2xl mx-auto leading-relaxed">
              Resurrectio sees returning citizens as people on journeys, not case numbers.
              Built on CROS (Communal Relationship Operating System) philosophy, it centers
              human dignity and relational intelligence at every step.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: 'Journey-Centered',
                desc: 'Tracks restoration arcs, not compliance checklists. Every person has a story unfolding toward flourishing.',
              },
              {
                icon: Brain,
                title: 'Narrative Intelligence',
                desc: 'NRI surfaces signals and patterns — but never acts autonomously. Humans always decide.',
              },
              {
                icon: ArrowRight,
                title: 'Full Pipeline',
                desc: 'Prison to ownership — the complete restoration arc. From Companion Book through cooperative membership and permanent housing.',
              },
            ].map((item) => (
              <Card key={item.title} className="border-red-100 bg-white hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-red-800" />
                  </div>
                  <h3 className="font-semibold text-red-950 text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-red-950/60 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── The CROS Ecosystem — Rising Arc ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-800/60 mb-3">The CROS Ecosystem</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-red-950 mb-4">
              The Rising Arc
            </h2>
            <p className="text-red-950/60 max-w-2xl mx-auto leading-relaxed">
              Every CROS app shares the same DNA: people over transactions, narrative over metrics,
              community over compliance. Resurrectio is one part of a larger ecosystem rooted in
              a simple conviction — that human dignity requires more than a job. It requires
              ownership, stable housing, and a real place in civic life.
            </p>
          </div>

          {/* Pipeline visualization */}
          <div className="relative overflow-x-auto pb-6 mt-10">
            <div className="flex items-stretch gap-0 min-w-[800px]">
              {[
                { phase: 'IN PRISON', app: 'Fabrica', color: 'from-red-900 to-red-800' },
                { phase: 'RELEASE', app: 'Resurrectio', color: 'from-red-800 to-red-700' },
                { phase: 'SKILLS', app: 'Fabrica', color: 'from-red-700 to-red-600' },
                { phase: 'OWNERSHIP', app: 'Communis', color: 'from-red-600 to-red-500' },
                { phase: 'HOUSING', app: 'Propria', color: 'from-red-500 to-red-400' },
                { phase: 'COMMUNITY', app: 'CROS', color: 'from-red-400 to-red-300' },
              ].map((step, i, arr) => (
                <div key={step.phase} className="flex items-stretch flex-1">
                  <div
                    className={`flex-1 bg-gradient-to-r ${step.color} rounded-xl p-4 sm:p-5 text-center text-white`}
                  >
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider opacity-80 mb-1">
                      {step.phase}
                    </p>
                    <p className="text-xs sm:text-sm font-medium">{step.app}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="flex items-center px-1">
                      <ChevronRight className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* App detail cards */}
          <div className="grid sm:grid-cols-2 gap-6 mt-10">
            <div className="bg-white rounded-xl border border-red-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <HandHeart className="h-5 w-5 text-red-800" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-red-950">Fabrica</h3>
                  <p className="text-xs text-red-800/60 italic">Guild & Makerspace Management</p>
                </div>
              </div>
              <p className="text-sm text-red-950/60 leading-relaxed mb-3">
                A 16-week guild course that gives returning citizens craft training, identity formation,
                and community. Fabrica also provides a companion book for men still inside — so the
                journey of spiritual formation and pre-release preparation begins before the gates open.
              </p>
              <p className="text-xs text-red-800/50 italic">
                "Learn a craft. Find your people. Build something that matters."
              </p>
            </div>

            <div className="bg-white rounded-xl border border-red-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-red-800" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-red-950">Communis</h3>
                  <p className="text-xs text-red-800/60 italic">Worker Cooperative Management</p>
                </div>
              </div>
              <p className="text-sm text-red-950/60 leading-relaxed mb-3">
                The path from employment to ownership. Communis manages worker cooperatives — shared
                enterprises where every member has a voice and a stake. For returning citizens, it means
                the job you were placed in can become the business you co-own.
              </p>
              <p className="text-xs text-red-800/50 italic">
                "From worker to owner. From surviving to building."
              </p>
            </div>

            <div className="bg-white rounded-xl border border-red-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-red-800" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-red-950">Propria</h3>
                  <p className="text-xs text-red-800/60 italic">Community Land Trust Management</p>
                </div>
              </div>
              <p className="text-sm text-red-950/60 leading-relaxed mb-3">
                Permanent affordable housing through collective land stewardship. Propria manages Community
                Land Trusts where the land is held in common and homes remain affordable in perpetuity.
                For someone who came home to a shelter, it's the path to a place that's truly theirs.
              </p>
              <p className="text-xs text-red-800/50 italic">
                "Land held in trust. Homes that stay affordable. Roots that hold."
              </p>
            </div>

            <div className="bg-white rounded-xl border border-red-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-red-800" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-red-950">CROS</h3>
                  <p className="text-xs text-red-800/60 italic">The Community Relationship OS</p>
                </div>
              </div>
              <p className="text-sm text-red-950/60 leading-relaxed mb-3">
                The foundation everything runs on. CROS is a human CRM — it tracks relationships,
                narratives, and community health rather than sales pipelines. It's how organizations
                remember people, notice what's changing, and build a living story of impact. Every
                app in the family shares its architecture, its calm UX, and its conviction that
                people are not transactions.
              </p>
              <p className="text-xs text-red-800/50 italic">
                "Remember people. Notice what's changing. Serve well."
              </p>
            </div>
          </div>

          <p className="text-center mt-10 text-sm text-red-950/50 max-w-xl mx-auto leading-relaxed">
            No one else connects the full arc — incarceration to ownership.
            This isn't a Resurrectio feature. It's a shared conviction across every CROS app:
            that restoration doesn't end when someone gets a job. It ends when they belong.
          </p>
        </div>
      </section>

      {/* ── Feature Grid ── */}
      <section id="features" className="py-16 sm:py-24 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-red-950 mb-4">
              Everything Your Ministry Needs
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: 'Journeys',
                desc: 'Track every person\'s restoration arc from pre-release through flourishing.',
              },
              {
                icon: Briefcase,
                title: 'Services',
                desc: 'Coordinate housing, employment, compliance, and programs in one place.',
              },
              {
                icon: Users,
                title: 'Community',
                desc: 'Manage mentors, share stories, host events, build relationships.',
              },
              {
                icon: FolderOpen,
                title: 'Organize',
                desc: 'Partners, activities, territories, and templates for your ministry.',
              },
              {
                icon: Brain,
                title: 'Intelligence',
                desc: 'NRI signals detect patterns and surface actionable insights.',
              },
            ].map((item) => (
              <Card key={item.title} className="border-red-100 bg-white hover:shadow-md transition-shadow">
                <CardContent className="pt-6 pb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-red-800" />
                  </div>
                  <h3 className="font-semibold text-red-950 text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-red-950/60 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── NRI Explainer ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-red-950 mb-3">
              Narrative Relational Intelligence
            </h2>
            <p className="text-red-950/60 max-w-xl mx-auto">
              Bounded AI that amplifies human judgment — never replaces it
            </p>
          </div>
          <div className="max-w-2xl mx-auto space-y-6">
            {[
              {
                layer: '1',
                title: 'Narrative Signals Layer',
                desc: 'Watches activity streams, detects emerging patterns across your ministry.',
                icon: Sparkles,
              },
              {
                layer: '2',
                title: 'Archetype Journey Builder',
                desc: 'Maps journeys using archetypal phases — from crisis through transformation.',
                icon: MapPin,
              },
              {
                layer: '3',
                title: 'Scope Guardrails',
                desc: 'Prevents autonomous action, firewalls sensitive data. AI stays bounded.',
                icon: Shield,
              },
            ].map((item) => (
              <div
                key={item.layer}
                className="flex gap-4 items-start bg-white rounded-xl border border-red-100 p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-red-800" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="bg-red-50 text-red-800 text-[10px]">
                      Layer {item.layer}
                    </Badge>
                    <h3 className="font-semibold text-red-950">{item.title}</h3>
                  </div>
                  <p className="text-sm text-red-950/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-red-800 font-medium max-w-lg mx-auto">
            Every signal includes evidence, confidence metrics, and a &ldquo;Why am I seeing this?&rdquo; explainer.
          </p>
        </div>
      </section>

      {/* ── Signal Examples ── */}
      <section className="py-16 sm:py-24 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-red-950 mb-3">
              What NRI Signals Look Like
            </h2>
            <p className="text-red-950/60">
              Real-time intelligence delivered to the people who need it
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                type: 'Drift Risk',
                accent: 'border-l-red-500',
                badgeColor: 'bg-red-50 text-red-700',
                icon: AlertTriangle,
                iconColor: 'text-red-500',
                person: 'Marcus J.',
                body: 'Marcus J. has missed 2 mentor meetings and a parole check-in. Housing situation flagged as unstable. Recommend outreach within 48 hours.',
              },
              {
                type: 'Transformation Momentum',
                accent: 'border-l-green-500',
                badgeColor: 'bg-green-50 text-green-700',
                icon: TrendingUp,
                iconColor: 'text-green-500',
                person: 'David R.',
                body: 'David R. completed housing, employment, and 90-day retention milestones. Family reconnection active. Journey phase: Thriving.',
              },
              {
                type: 'Fabrica Ready',
                accent: 'border-l-red-700',
                badgeColor: 'bg-red-50 text-red-800',
                icon: Sparkles,
                iconColor: 'text-red-600',
                person: 'Anthony W.',
                body: 'Anthony W. shows stability indicators aligned for guild training. Employment steady 4+ months. Mentor endorsement received.',
              },
            ].map((signal) => (
              <Card
                key={signal.type}
                className={`border-red-100 bg-white border-l-4 ${signal.accent}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <signal.icon className={`h-4 w-4 ${signal.iconColor}`} />
                    <Badge className={`${signal.badgeColor} text-[10px] font-semibold`}>
                      {signal.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm font-semibold text-red-950">
                    {signal.person}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-950/60 leading-relaxed">{signal.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built For ── */}
      <section id="built-for" className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-red-950 mb-4">
              Built for Organizations Like Yours
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Prison Fellowship', icon: Church },
              { name: 'Kairos Prison Ministry', icon: Church },
              { name: 'Catholic Charities Reentry', icon: HandHeart },
              { name: 'Diocesan Prison Ministries', icon: Church },
              { name: 'Dismas Ministry', icon: HandHeart },
              { name: 'St. Vincent de Paul', icon: HandHeart },
              { name: 'Catholic Mobilizing Network', icon: Church },
              { name: 'Kolbe House', icon: Building2 },
              { name: 'Fortune Society', icon: Building2 },
              { name: 'Center for Employment Opportunities', icon: Briefcase },
              { name: 'Second Chance Act Grantees', icon: Building2 },
              { name: 'CCHD Grantees', icon: HandHeart },
            ].map((org) => (
              <div
                key={org.name}
                className="flex items-center gap-3 bg-white rounded-xl border border-red-100 p-4 hover:border-red-300 hover:shadow-sm transition-all"
              >
                <org.icon className="h-5 w-5 text-red-500 flex-shrink-0" />
                <span className="text-sm font-medium text-red-950/80">{org.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 sm:py-28 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-red-950 mb-6">
            Ready to Transform Your Ministry?
          </h2>
          <Link to="/signup">
            <Button
              size="lg"
              className="rounded-full bg-red-800 text-white hover:bg-red-900 px-10 h-12 text-base"
            >
              Start Your Ministry <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
});

export default Landing;
