/**
 * SeoDashboard — SEO metrics and keyword tracking for the Gardener Console.
 *
 * WHAT: Stats cards, keyword rankings bar chart, and top pages table.
 * WHERE: /operator/seo-dashboard
 * WHY: Operators need visibility into organic search performance.
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Search, TrendingUp, Globe, FileText, ArrowUp, ArrowDown } from 'lucide-react';

const topKeywords = [
  { keyword: 'reentry ministry', position: 4, volume: 720, change: 2 },
  { keyword: 'catholic reentry program', position: 7, volume: 390, change: -1 },
  { keyword: 'prison ministry volunteer', position: 11, volume: 260, change: 3 },
  { keyword: 'reentry housing help', position: 15, volume: 210, change: 0 },
  { keyword: 'faith-based reentry', position: 9, volume: 480, change: 5 },
];

const topPages = [
  { path: '/about', title: 'About Resurrectio', visits: 456, bounce: '32%' },
  { path: '/ministry/kairos', title: 'Kairos Prison Ministry', visits: 389, bounce: '28%' },
  { path: '/stories', title: 'Success Stories', visits: 312, bounce: '24%' },
  { path: '/volunteer', title: 'Volunteer Sign-Up', visits: 278, bounce: '41%' },
  { path: '/resources', title: 'Reentry Resources', visits: 234, bounce: '35%' },
  { path: '/blog/housing-first', title: 'Housing First Article', visits: 198, bounce: '22%' },
];

const stats = [
  { label: 'Organic Visits', value: '2,340/mo', icon: TrendingUp, sub: '+12% vs last month' },
  { label: 'Domain Authority', value: '34', icon: Globe, sub: '+2 this quarter' },
  { label: 'Indexed Pages', value: '156', icon: FileText, sub: '12 pending' },
  { label: 'Top Keywords', value: '5', icon: Search, sub: 'in top 20' },
];

export default function SeoDashboard() {
  const maxVolume = Math.max(...topKeywords.map((k) => k.volume));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-purple-100">SEO Dashboard</h1>
        <p className="text-purple-300/70 text-sm mt-1">Organic search performance and keyword tracking</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="bg-purple-950/40 border-purple-800/40">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-purple-900/50">
                  <s.icon className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-sm text-purple-300/70">{s.label}</p>
              </div>
              <p className="text-2xl font-bold text-purple-100">{s.value}</p>
              <p className="text-xs text-purple-400/60 mt-1">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="bg-purple-800/30" />

      {/* Keyword rankings bar chart */}
      <Card className="bg-purple-950/40 border-purple-800/40">
        <CardHeader>
          <CardTitle className="text-purple-100 text-lg">Keyword Rankings</CardTitle>
          <CardDescription className="text-purple-400/70">Search volume by keyword</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {topKeywords.map((k) => (
            <div key={k.keyword} className="flex items-center gap-3">
              <span className="text-sm text-purple-200 w-48 truncate">{k.keyword}</span>
              <div className="flex-1 h-6 bg-purple-900/30 rounded overflow-hidden">
                <div
                  className="h-full bg-purple-600/70 rounded flex items-center justify-end pr-2"
                  style={{ width: `${(k.volume / maxVolume) * 100}%` }}
                >
                  <span className="text-xs text-purple-100 font-medium">{k.volume}</span>
                </div>
              </div>
              <Badge variant="outline" className="border-purple-700/50 text-purple-300 text-xs w-16 justify-center">
                #{k.position}
              </Badge>
              <span className="w-10 text-xs text-right">
                {k.change > 0 ? (
                  <span className="text-green-400 flex items-center justify-end gap-0.5"><ArrowUp className="w-3 h-3" />{k.change}</span>
                ) : k.change < 0 ? (
                  <span className="text-red-400 flex items-center justify-end gap-0.5"><ArrowDown className="w-3 h-3" />{Math.abs(k.change)}</span>
                ) : (
                  <span className="text-purple-500">—</span>
                )}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top pages table */}
      <Card className="bg-purple-950/40 border-purple-800/40">
        <CardHeader>
          <CardTitle className="text-purple-100 text-lg">Top Pages by Traffic</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-purple-800/30 hover:bg-transparent">
                <TableHead className="text-purple-300">Page</TableHead>
                <TableHead className="text-purple-300">Path</TableHead>
                <TableHead className="text-purple-300 text-right">Visits</TableHead>
                <TableHead className="text-purple-300 text-right">Bounce Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPages.map((p) => (
                <TableRow key={p.path} className="border-purple-800/20 hover:bg-purple-900/20">
                  <TableCell className="text-purple-100 font-medium">{p.title}</TableCell>
                  <TableCell className="text-purple-400/70 font-mono text-xs">{p.path}</TableCell>
                  <TableCell className="text-purple-200 text-right">{p.visits}</TableCell>
                  <TableCell className="text-purple-300 text-right">{p.bounce}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
