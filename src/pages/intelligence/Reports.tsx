import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, FileText, Download, Calendar } from 'lucide-react';

const reports = [
  { name: 'Monthly Summary', description: 'Overview of all ministry activity, outcomes, and signals for the current month.', period: 'March 2026', color: 'bg-purple-600' },
  { name: 'Quarterly Impact', description: 'Comprehensive impact report with housing, employment, and program outcomes.', period: 'Q1 2026', color: 'bg-violet-500' },
  { name: 'Housing Outcomes', description: 'Detailed housing placement analysis, stability scores, and provider performance.', period: 'Last 90 Days', color: 'bg-emerald-600' },
  { name: 'Employment Outcomes', description: 'Job placement rates, retention metrics, wage progression, and employer satisfaction.', period: 'Last 90 Days', color: 'bg-blue-600' },
  { name: 'Program Completion', description: 'Enrollment, completion rates, and graduate outcomes across all programs.', period: 'YTD 2026', color: 'bg-amber-500' },
  { name: 'Funder Report', description: 'CCHD-formatted impact report with narrative outcomes and quantitative metrics.', period: 'Q1 2026', color: 'bg-purple-800' },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map(report => (
          <Card key={report.name} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className={`h-2 ${report.color}`} />
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base font-serif">{report.name}</CardTitle>
                  <CardDescription className="text-xs flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {report.period}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
              <div className="space-y-2 mb-4">
                {[75, 60, 45].map((w, i) => (
                  <div key={i} className="h-3 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${report.color} rounded-full`} style={{ width: `${w}%` }} />
                  </div>
                ))}
              </div>
              <Button className="w-full" size="sm">
                <Download className="h-3.5 w-3.5 mr-1" /> Generate Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
