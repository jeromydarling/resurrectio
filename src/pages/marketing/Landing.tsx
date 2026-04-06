import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/Firefly_Gemini Flash_Empty two-lane highway stretching toward the horizon at golden hour dawn, Route 66 st 897378.png';
import AppPreview from '@/components/marketing/AppPreview';
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
  Check,
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
            <Link to="/demo">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-red-300 text-red-900 hover:bg-red-50 px-8 h-12 text-base"
              >
                Try the Demo
              </Button>
            </Link>
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

      {/* ── The Real Cost of Patched-Together Systems ── */}
      <section className="py-16 sm:py-24 bg-white/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-red-950 mb-4">
              The Human Cost of the Wrong Tools
            </h2>
            <p className="text-red-950/60 max-w-2xl mx-auto leading-relaxed">
              Most reentry organizations aren't failing because they lack compassion.
              They're failing because they're duct-taping together systems that were never
              built for them — and people are paying the price.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {[
              {
                problem: 'A case manager spends 12 hours a week entering the same data into three different systems.',
                cost: 'That\'s 12 hours not spent sitting across the table from Marcus, who just missed his second parole check-in.',
              },
              {
                problem: 'A returning citizen gets discharged from transitional housing on a Friday. The referral to the next provider sits in someone\'s inbox until Monday.',
                cost: 'By Monday, he\'s sleeping in his car. By Wednesday, he\'s missed his curfew. By Friday, he has a warrant.',
              },
              {
                problem: 'A funder asks for outcome data. The program director spends two weeks pulling numbers from spreadsheets, a donor CRM, and a case management system that don\'t talk to each other.',
                cost: 'The report is late. The numbers don\'t match. The grant renewal is uncertain. The program that could have helped 40 more people might not exist next year.',
              },
              {
                problem: 'A mentor notices something wrong — a change in tone, missed meetings, a look in the eyes. But there\'s no place to log it. No system that connects that signal to the case file.',
                cost: 'Six weeks later, everyone says "we didn\'t see it coming." But someone did. The system just didn\'t have a place for what they saw.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-red-100 p-6 sm:p-8">
                <p className="text-sm text-red-950/80 leading-relaxed mb-3">
                  {item.problem}
                </p>
                <p className="text-sm text-red-800 leading-relaxed font-medium italic">
                  {item.cost}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <p className="text-red-950/60 leading-relaxed mb-4">
              Salesforce wasn't built for this. Bonterra Apricot wasn't built for this.
              Spreadsheets were never built for this. These tools were built to track
              transactions, manage donors, or satisfy compliance requirements.
              They don't know what a journey looks like. They don't understand
              what a warm handoff means. They have no concept of a person who is
              more than their case number.
            </p>
            <p className="text-red-950 font-medium leading-relaxed">
              Resurrectio was built for the mission — because the mission deserves
              a system that was designed from the ground up to see people,
              not process them.
            </p>
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

          {/* App Preview screenshots */}
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            {([
              { variant: 'dashboard' as const, caption: 'Dashboard' },
              { variant: 'signals' as const, caption: 'NRI Signals' },
              { variant: 'journey' as const, caption: 'Journey Map' },
            ]).map((item) => (
              <div key={item.variant} className="flex flex-col items-center">
                <AppPreview variant={item.variant} className="w-full" />
                <p className="mt-2 text-xs text-red-950/40 font-medium">{item.caption}</p>
              </div>
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
                  <p className="text-xs text-red-800/60 italic">The Communal Relationship OS</p>
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

      {/* ── Integrations — Bring Everything With You ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-red-800/60 mb-3">Relatio Integration Layer</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-red-950 mb-4">
              Bring Everything With You
            </h2>
            <p className="text-red-950/60 max-w-2xl mx-auto leading-relaxed">
              Your organization already has years of relationships stored somewhere — spreadsheets,
              donor platforms, CRMs you've outgrown. Resurrectio connects to 20+ platforms
              so you can migrate your history or run side-by-side. No data left behind.
            </p>
          </div>

          {/* Integration categories */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              {
                category: 'Case Management & CRMs',
                desc: 'Full two-way sync with conflict detection',
                platforms: ['Salesforce', 'HubSpot', 'Microsoft Dynamics 365', 'Blackbaud RE NXT', 'CiviCRM'],
                badge: 'Two-Way Sync',
              },
              {
                category: 'Nonprofit & Donor',
                desc: 'Funder records, giving history, grant tracking',
                platforms: ['Bloomerang', 'NeonCRM', 'Little Green Light', 'DonorPerfect', 'Kindful', 'Virtuous CRM'],
                badge: 'One-Way Sync',
              },
              {
                category: 'Databases & Contacts',
                desc: 'Flexible platforms and personal contact tools',
                platforms: ['Airtable', 'Google Contacts', 'Outlook Contacts', 'Zoho CRM', 'Oracle CRM'],
                badge: 'Flexible',
              },
              {
                category: 'Spreadsheets & CSV',
                desc: 'Guided export, field mapping, and safe import',
                platforms: ['Excel', 'Google Sheets', 'Any CSV export', 'Bonterra Apricot', 'CorrectTech'],
                badge: 'CSV Import',
              },
            ].map((cat) => (
              <div key={cat.category} className="bg-white rounded-xl border border-red-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-base font-semibold text-red-950">{cat.category}</h3>
                  <Badge className="bg-red-50 text-red-800 text-[10px]">{cat.badge}</Badge>
                </div>
                <p className="text-sm text-red-950/60 mb-4">{cat.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.platforms.map((p) => (
                    <span key={p} className="inline-block text-[11px] bg-red-50/80 text-red-900/70 rounded-md px-2 py-0.5">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* How it works strip */}
          <div className="bg-white rounded-xl border border-red-100 p-6 sm:p-8">
            <h3 className="font-serif text-xl font-semibold text-red-950 mb-6 text-center">How Migration Works</h3>
            <div className="grid sm:grid-cols-4 gap-6 text-center">
              {[
                { step: '1', title: 'Choose Your Source', desc: 'Select where your data lives now' },
                { step: '2', title: 'Connect or Upload', desc: 'API key, OAuth, or CSV — we guide every step' },
                { step: '3', title: 'Map Your Fields', desc: 'We auto-map common fields, you adjust the rest' },
                { step: '4', title: 'Import Safely', desc: 'Duplicate detection, audit trail, re-run anytime' },
              ].map((s) => (
                <div key={s.step}>
                  <div className="w-10 h-10 rounded-full bg-red-800 text-white flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    {s.step}
                  </div>
                  <h4 className="font-semibold text-red-950 text-sm mb-1">{s.title}</h4>
                  <p className="text-xs text-red-950/50">{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center mt-6 text-xs text-red-800/50 italic">
              Your original data is never modified. Use Resurrectio as a companion alongside your
              existing systems, or let it run the whole show.
            </p>
          </div>
        </div>
      </section>

      {/* ── Government Reporting ── */}
      <section className="py-16 sm:py-24 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-red-950 mb-4">
              Government Reporting, Handled
            </h2>
            <p className="text-red-950/60 max-w-2xl mx-auto leading-relaxed">
              Second Chance Act. HUD HMIS. SAMHSA SPARS. State DOC portals. Your case managers
              shouldn't spend hours re-entering data into government systems. Resurrectio generates
              compliant exports from the data you're already collecting — one click, exact format.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'OJP PMT', who: 'Second Chance Act grantees', desc: 'Quarterly performance measures in PMT-ready CSV format.' },
              { name: 'HMIS', who: 'HUD-funded housing programs', desc: 'Client demographics and housing data per HUD CSV standards.' },
              { name: 'SPARS', who: 'SAMHSA grant recipients', desc: 'GPRA/NOMS intake, follow-up, and discharge templates.' },
              { name: 'State DOC Reporting', who: 'State-contracted providers', desc: 'Enrollment, completion, and outcome metrics in state templates.' },
              { name: 'CJIS Compliance', who: 'Criminal justice data users', desc: 'Security audit docs, access logs, and policy checklists.' },
              { name: 'Custom Funder Reports', who: 'Any grant-funded org', desc: 'Map your data to any funder format with configurable templates.' },
            ].map((item) => (
              <div key={item.name} className="rounded-xl border border-red-200/60 bg-white p-5 hover:shadow-md transition-shadow">
                <h3 className="font-serif font-semibold text-red-950 mb-1">{item.name}</h3>
                <p className="text-xs text-red-800/50 mb-2">Required by: {item.who}</p>
                <p className="text-sm text-red-950/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-red-800 font-medium">
            Your case managers should spend their time with people, not fighting with government portals.
          </p>
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

      {/* ── Pricing ── */}
      <section id="pricing" className="py-16 sm:py-24 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-red-950 mb-4">
              Everyone Gets the Full Platform
            </h2>
            <p className="text-red-950/60 max-w-2xl mx-auto leading-relaxed">
              NRI intelligence, email campaigns, storytelling, reporting — every feature is available
              on every plan. No paywalled safety nets. No premium-only signals. You pay based on
              how many staff and mentors are active, not which features you're allowed to use.
            </p>
          </div>

          {/* What everyone gets */}
          <div className="bg-white rounded-xl border border-red-100 p-6 sm:p-8 mb-10">
            <h3 className="font-serif text-lg font-semibold text-red-950 mb-4 text-center">Every Plan Includes</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                'NRI Signal Detection (19 types)',
                'People & Journey Tracking',
                'Case Notes & Milestones',
                'Service Coordination',
                'Housing & Employment Tracking',
                'Compliance Management',
                'Mentor Matching',
                'Events & Calendar',
                'Drift Risk & Crisis Alerts',
                'Email Campaigns & Outreach',
                'Testimonium Storytelling',
                'Impact Reporting',
                'Grants Tracking',
                'Presentation Mode',
                'Garden Pulse Visualization',
                'Communio Ecosystem Bridge',
                'Impulsus Impact Journal',
                'Knowledge Base & Resources',
                'Provisions Tracking',
                'Unlimited returning citizens',
              ].map((f) => (
                <div key={f} className="flex items-start gap-2 text-sm text-red-950/70">
                  <Check className="h-4 w-4 text-red-800 mt-0.5 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Tiers by scale */}
          <div className="grid sm:grid-cols-3 gap-6">
            <Card className="border-red-100 bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-xl text-red-950">Seedling</CardTitle>
                <p className="text-xs text-red-800/60 mb-2">For new and small ministries</p>
                <p className="text-3xl font-bold text-red-800 mt-1">
                  $29<span className="text-base font-normal text-red-950/50">/mo</span>
                </p>
                <p className="text-xs text-red-950/40 mt-1">Up to 5 active staff & mentors</p>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-red-950/60 mb-4">
                  Full platform access for a parish program, a small volunteer team,
                  or a ministry just getting started. Everything you need, nothing you don't.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-red-950/60">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-800 mt-0.5 flex-shrink-0" />All features included</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-800 mt-0.5 flex-shrink-0" />3 platform integrations</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-800 mt-0.5 flex-shrink-0" />Email support</li>
                </ul>
                <Link to="/signup">
                  <Button className="w-full rounded-full border-red-300 text-red-900 hover:bg-red-50" variant="outline">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-800 bg-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-red-800 text-white text-xs px-3 py-0.5">Most Popular</Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-xl text-red-950">Growing</CardTitle>
                <p className="text-xs text-red-800/60 mb-2">For established programs</p>
                <p className="text-3xl font-bold text-red-800 mt-1">
                  $79<span className="text-base font-normal text-red-950/50">/mo</span>
                </p>
                <p className="text-xs text-red-950/40 mt-1">Up to 25 active staff & mentors</p>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-red-950/60 mb-4">
                  For a reentry program with a team of case managers, a mentor network,
                  and multiple partner organizations. Room to grow.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-red-950/60">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-800 mt-0.5 flex-shrink-0" />All features included</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-800 mt-0.5 flex-shrink-0" />10 platform integrations</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-800 mt-0.5 flex-shrink-0" />Multi-territory support</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-800 mt-0.5 flex-shrink-0" />Priority support</li>
                </ul>
                <Link to="/signup">
                  <Button className="w-full rounded-full bg-red-800 text-white hover:bg-red-900">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-red-100 bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="font-serif text-xl text-red-950">Coalition</CardTitle>
                <p className="text-xs text-red-800/60 mb-2">For networks and large organizations</p>
                <p className="text-3xl font-bold text-red-800 mt-1">
                  $149<span className="text-base font-normal text-red-950/50">/mo</span>
                </p>
                <p className="text-xs text-red-950/40 mt-1">Unlimited staff & mentors</p>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-red-950/60 mb-4">
                  For statewide coalitions, diocesan networks, or organizations running
                  multiple reentry programs across regions.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-red-950/60">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-800 mt-0.5 flex-shrink-0" />All features included</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-800 mt-0.5 flex-shrink-0" />Unlimited integrations</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-800 mt-0.5 flex-shrink-0" />Unlimited territories</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-800 mt-0.5 flex-shrink-0" />Dedicated support</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-red-800 mt-0.5 flex-shrink-0" />Custom onboarding</li>
                </ul>
                <Link to="/signup">
                  <Button className="w-full rounded-full border-red-300 text-red-900 hover:bg-red-50" variant="outline">
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Add-ons */}
          <div className="mt-10">
            <h3 className="font-serif text-lg font-semibold text-red-950 mb-4 text-center">Add When You Need It</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  name: 'Data Migration',
                  price: '$49/mo',
                  desc: 'Guided migration from Salesforce, HubSpot, Blackbaud, Apricot, or any existing system. Cancel after your data is moved.',
                },
                {
                  name: 'Guided Activation',
                  price: '$249 one-time',
                  desc: '90-minute working session: migrate your data, set up your space, configure your first journeys. We do it with you.',
                },
                {
                  name: 'Extra Capacity',
                  price: 'from $29/mo',
                  desc: 'Need more staff and mentors than your plan allows? Add capacity in blocks of 25, 75, or 200.',
                },
              ].map((addon) => (
                <div key={addon.name} className="bg-white rounded-xl border border-red-100 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-red-950 text-sm">{addon.name}</h4>
                    <span className="text-xs font-semibold text-red-800">{addon.price}</span>
                  </div>
                  <p className="text-xs text-red-950/50 leading-relaxed">{addon.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-2xl mx-auto mt-10 space-y-3 text-center">
            <p className="text-sm text-red-950/50">
              All plans include 30-day free trial. Returning citizens, volunteers, and imported contacts
              are always free and unlimited — they never count against your plan.
            </p>
            <p className="text-sm text-red-950/50">
              <span className="font-medium text-red-800">Volunteer-run ministry?</span>{' '}
              Contact us about subsidized access for organizations with annual budgets under $100K.
            </p>
          </div>
        </div>
      </section>


      {/* ── Voices of Restoration ── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-red-950 mb-4">
              Voices of Restoration
            </h2>
            <p className="text-red-950/60 max-w-xl mx-auto">
              The leaders who shaped how we think about reentry, dignity, and second chances
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                quote: 'Each of us is more than the worst thing we\'ve ever done.',
                name: 'Bryan Stevenson',
                role: 'Founder, Equal Justice Initiative',
                source: 'Just Mercy',
              },
              {
                quote: 'There is no humane punishment without a horizon. No one can change their life if they don\'t see a horizon.',
                name: 'Pope Francis',
                role: 'Address to International Association of Penal Law, 2014',
                source: '',
              },
              {
                quote: 'I found myself increasingly drawn to the idea that God had put me in prison for a purpose and that I should do something for those I had left behind.',
                name: 'Chuck Colson',
                role: 'Founder, Prison Fellowship',
                source: 'Born Again',
              },
              {
                quote: 'Nobody can be defined by the worst act in their life. Human beings are always going to be worth more than the worst part of their life.',
                name: 'Sister Helen Prejean',
                role: 'Author, Dead Man Walking',
                source: '',
              },
              {
                quote: 'Forgiving is not forgetting; it\'s actually remembering — and not using your right to hit back. It\'s a second chance for a new beginning.',
                name: 'Archbishop Desmond Tutu',
                role: 'Nobel Laureate, Truth and Reconciliation Commission',
                source: 'No Future Without Forgiveness',
              },
              {
                quote: 'Deep in the hearts of many condemned and incarcerated people, I found the scattered traces of hope and humanity — seeds of restoration that come to astonishing life when nurtured by very simple interventions.',
                name: 'Bryan Stevenson',
                role: 'Founder, Equal Justice Initiative',
                source: 'Just Mercy',
              },
            ].map((t, i) => (
              <Card key={i} className="border-red-100 bg-white border-l-4 border-l-red-300">
                <CardContent className="pt-6 pb-6">
                  <p className="text-sm text-red-950/70 leading-relaxed italic mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="font-semibold text-red-950 text-sm">{t.name}</p>
                  <p className="text-xs text-red-950/50">{t.role}</p>
                  {t.source && <p className="text-xs text-red-800/40 italic mt-1">{t.source}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 sm:py-24 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-red-950 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'What makes Resurrectio different from Bonterra Apricot or CorrectTech?',
                a: "Those tools treat people as cases in a compliance pipeline. Resurrectio treats them as people on journeys. Our NRI intelligence layer surfaces patterns and signals \u2014 it doesn't just store data. And no other tool connects the full arc from incarceration through cooperative ownership and permanent housing.",
              },
              {
                q: 'Is our data secure?',
                a: "Resurrectio runs on Supabase (PostgreSQL) with row-level security, encrypted at rest and in transit. We're SOC 2 Type II aligned and follow CJIS security policy guidelines. Your data is tenant-scoped \u2014 no other organization can access it.",
              },
              {
                q: 'Can we keep using our existing CRM alongside Resurrectio?',
                a: 'Yes. Our Relatio integration layer supports 20+ platforms including Salesforce, HubSpot, and Blackbaud. You can run Resurrectio as a companion that reads from your existing system, or migrate fully.',
              },
              {
                q: 'How long does setup take?',
                a: 'Most ministries are up and running in under a week. CSV import takes minutes. API integrations typically connect in 5-20 minutes with our guided setup wizard.',
              },
              {
                q: 'Do you support faith-based organizations specifically?',
                a: "Resurrectio was designed for the reentry ministry community. Our archetype onboarding, vocabulary, and signal types are tuned for the way prison ministries actually work \u2014 mentoring relationships, spiritual formation, family reunification, and restoration journeys.",
              },
            ].map((item) => (
              <Card key={item.q} className="border-red-100 bg-white">
                <CardContent className="pt-6 pb-6">
                  <h3 className="font-semibold text-red-950 mb-2">&ldquo;{item.q}&rdquo;</h3>
                  <p className="text-sm text-red-950/60 leading-relaxed">{item.a}</p>
                </CardContent>
              </Card>
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
