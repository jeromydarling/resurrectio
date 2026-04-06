/**
 * Funder Dashboard — Read-only aggregate impact dashboard for board members and funders.
 *
 * WHAT: Aggregate metrics, pipeline, outcomes, and service delivery summary.
 * WHERE: /funder-dashboard
 * WHY: Gives CCHD program officers and board chairs a clean, evidence-based view of impact.
 */

import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  Users,
  Home,
  Briefcase,
  GraduationCap,
  DollarSign,
  Heart,
  Download,
  Mail,
  ExternalLink,
  FileText,
  Table2,
  CalendarClock,
  Share2,
  ShieldCheck,
  Clock,
  Target,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Inline mock data                                                   */
/* ------------------------------------------------------------------ */

const keyMetrics = [
  { label: 'People Served', value: '127', change: '+14%', icon: Users },
  { label: 'Housing Placement Rate', value: '72%', change: '+3%', icon: Home },
  { label: 'Employment Placement Rate', value: '68%', change: '+5%', icon: Briefcase },
  { label: 'Program Completion Rate', value: '83%', change: '+2%', icon: GraduationCap },
  { label: 'Average Starting Wage', value: '$16.40', change: '+$0.80', icon: DollarSign },
  { label: 'Families Reconnected', value: '14', change: '+40%', icon: Heart },
];

const pipelineStages = [
  { label: 'Pre-Release', count: 23, color: 'bg-red-800' },
  { label: 'Stabilization', count: 41, color: 'bg-red-700' },
  { label: 'Growth', count: 35, color: 'bg-red-500' },
  { label: 'Flourishing', count: 18, color: 'bg-red-400' },
  { label: 'Alumni', count: 67, color: 'bg-red-300' },
];

const quarterlyOutcomes = [
  {
    quarter: 'Q2 2025',
    housing: 14,
    employment: 11,
    completions: 18,
  },
  {
    quarter: 'Q3 2025',
    housing: 16,
    employment: 13,
    completions: 20,
  },
  {
    quarter: 'Q4 2025',
    housing: 18,
    employment: 15,
    completions: 22,
  },
  {
    quarter: 'Q1 2026',
    housing: 21,
    employment: 19,
    completions: 25,
  },
];

const serviceDelivery = [
  { label: 'Mentor Hours Logged', value: '892', icon: Clock },
  { label: 'Milestones Achieved', value: '47', icon: Target },
  { label: 'Case Management Sessions', value: '234', icon: FileText },
  { label: 'Compliance Items Completed', value: '156', icon: CheckCircle2 },
  { label: 'Crisis Interventions', value: '12', note: 'all resolved', icon: AlertTriangle },
];

const pipelineTotal = pipelineStages.reduce((s, p) => s + p.count, 0);
const maxQuarterlyValue = Math.max(
  ...quarterlyOutcomes.map((q) => q.housing + q.employment + q.completions),
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function FunderDashboard() {
  return (
    <div className="min-h-screen bg-red-50/40">
      {/* Banner */}
      <header className="bg-red-950 text-white py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold tracking-tight">
                Impact Dashboard &mdash; Q1 2026
              </h1>
              <p className="text-red-200 mt-1 text-sm">
                January 1, 2026 &ndash; March 31, 2026
              </p>
            </div>
            <Badge
              variant="outline"
              className="border-red-400 text-red-200 text-xs px-3 py-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Aggregate data only &mdash; no individual names or records
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-10">
        {/* ---- Key Impact Metrics ---- */}
        <section>
          <h2 className="text-2xl font-serif font-semibold text-red-900 mb-4">
            Key Impact Metrics
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {keyMetrics.map((m) => {
              const Icon = m.icon;
              return (
                <Card key={m.label} className="bg-white shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {m.label}
                        </p>
                        <p className="text-3xl font-bold text-red-900 mt-1">{m.value}</p>
                      </div>
                      <Icon className="w-7 h-7 text-red-300" />
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-sm text-green-700">
                      <TrendingUp className="w-4 h-4" />
                      <span>{m.change} from Q4</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ---- Journey Pipeline ---- */}
        <section>
          <h2 className="text-2xl font-serif font-semibold text-red-900 mb-4">
            Journey Pipeline
          </h2>
          <Card className="bg-white shadow-sm">
            <CardContent className="pt-6">
              {/* Bar */}
              <div className="flex h-12 rounded-lg overflow-hidden">
                {pipelineStages.map((stage) => (
                  <div
                    key={stage.label}
                    className={`${stage.color} flex items-center justify-center text-white text-xs font-semibold`}
                    style={{ width: `${(stage.count / pipelineTotal) * 100}%` }}
                  >
                    {stage.count}
                  </div>
                ))}
              </div>
              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-4 justify-center">
                {pipelineStages.map((stage) => (
                  <div key={stage.label} className="flex items-center gap-1.5 text-sm text-gray-700">
                    <span className={`w-3 h-3 rounded-sm ${stage.color}`} />
                    {stage.label}
                    <span className="text-gray-400 font-medium">({stage.count})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ---- Outcomes by Quarter ---- */}
        <section>
          <h2 className="text-2xl font-serif font-semibold text-red-900 mb-4">
            Outcomes by Quarter
          </h2>
          <Card className="bg-white shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-end gap-6 justify-around h-56">
                {quarterlyOutcomes.map((q) => {
                  const total = q.housing + q.employment + q.completions;
                  const maxHeight = 180; // px
                  const scale = maxHeight / maxQuarterlyValue;
                  return (
                    <div key={q.quarter} className="flex flex-col items-center gap-1">
                      <span className="text-xs font-semibold text-gray-600 mb-1">{total}</span>
                      <div className="flex flex-col-reverse w-14 rounded overflow-hidden">
                        <div
                          className="bg-green-600"
                          style={{ height: `${q.housing * scale}px` }}
                          title={`Housing: ${q.housing}`}
                        />
                        <div
                          className="bg-blue-600"
                          style={{ height: `${q.employment * scale}px` }}
                          title={`Employment: ${q.employment}`}
                        />
                        <div
                          className="bg-amber-500"
                          style={{ height: `${q.completions * scale}px` }}
                          title={`Completions: ${q.completions}`}
                        />
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{q.quarter}</span>
                    </div>
                  );
                })}
              </div>
              {/* Chart Legend */}
              <div className="flex gap-5 mt-4 justify-center text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-green-600" /> Housing placements
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-blue-600" /> Employment placements
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-amber-500" /> Program completions
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ---- Service Delivery Summary ---- */}
        <section>
          <h2 className="text-2xl font-serif font-semibold text-red-900 mb-4">
            Service Delivery Summary
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {serviceDelivery.map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.label} className="bg-white shadow-sm">
                  <CardContent className="pt-5 text-center space-y-1.5">
                    <Icon className="w-6 h-6 text-red-800 mx-auto" />
                    <p className="text-2xl font-bold text-red-900">{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                    {s.note && (
                      <Badge variant="outline" className="text-green-700 border-green-300 text-[10px]">
                        {s.note}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ---- Transformation Highlight ---- */}
        <section>
          <h2 className="text-2xl font-serif font-semibold text-red-900 mb-4">
            Transformation Highlight
          </h2>
          <Card className="bg-white shadow-sm border-l-4 border-l-red-800">
            <CardContent className="pt-6 space-y-4">
              <p className="text-gray-700 leading-relaxed text-[15px] italic">
                &ldquo;A 34-year-old man released after 8 years. Within 6 months: stable
                housing, employed at a construction firm earning $18/hr, reunited with his
                two children, completed the Fabrica guild course. His mentor describes the
                change as &lsquo;like watching someone remember who they were always meant to
                be.&rsquo;&rdquo;
              </p>
              <p className="text-xs text-gray-400">
                Details anonymized. Shared with participant consent.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* ---- Export Options ---- */}
        <section>
          <h2 className="text-2xl font-serif font-semibold text-red-900 mb-4">
            Export &amp; Share
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-red-800 hover:bg-red-900 text-white">
              <Download className="w-4 h-4 mr-2" />
              Download PDF Report
            </Button>
            <Button variant="outline" className="border-red-300 text-red-800 hover:bg-red-100">
              <Table2 className="w-4 h-4 mr-2" />
              Download Raw Metrics (CSV)
            </Button>
            <Button variant="outline" className="border-red-300 text-red-800 hover:bg-red-100">
              <CalendarClock className="w-4 h-4 mr-2" />
              Schedule Quarterly Email
            </Button>
            <Button variant="outline" className="border-red-300 text-red-800 hover:bg-red-100">
              <Share2 className="w-4 h-4 mr-2" />
              Share Read-Only Link
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
