/**
 * ContentStudio — Blog/content management for the Gardener Console.
 *
 * WHAT: Table of published articles with stats, status badges, and quick actions.
 * WHERE: /operator/content-studio
 * WHY: Operators need a central hub for managing blog and content pieces.
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { FileText, Plus, Eye, PenLine, Search } from 'lucide-react';

const articles = [
  { id: 1, title: 'Why Reentry Ministry Matters Now', status: 'published', author: 'Fr. Michael', date: '2026-04-01', views: 1243 },
  { id: 2, title: 'Housing First: A Catholic Perspective', status: 'published', author: 'Sarah K.', date: '2026-03-28', views: 892 },
  { id: 3, title: 'Kairos Volunteer Stories', status: 'draft', author: 'Tom R.', date: '2026-03-25', views: 0 },
  { id: 4, title: 'Q1 Impact Report Summary', status: 'published', author: 'Admin', date: '2026-03-20', views: 654 },
  { id: 5, title: 'Building Trust Through Accompaniment', status: 'published', author: 'Sr. Maria', date: '2026-03-15', views: 1102 },
  { id: 6, title: 'Employment Pathways Guide', status: 'draft', author: 'James L.', date: '2026-03-12', views: 0 },
  { id: 7, title: 'Parish Reentry Toolkit', status: 'published', author: 'Admin', date: '2026-03-08', views: 788 },
  { id: 8, title: 'Mentor Training Best Practices', status: 'draft', author: 'Deacon Paul', date: '2026-03-05', views: 0 },
  { id: 9, title: 'Success Story: From Incarceration to Homeownership', status: 'published', author: 'Sarah K.', date: '2026-02-28', views: 2105 },
  { id: 10, title: 'Understanding NRI Signals', status: 'draft', author: 'Admin', date: '2026-02-20', views: 0 },
];

const stats = [
  { label: 'Total Articles', value: 24, icon: FileText },
  { label: 'Published', value: 18, icon: Eye },
  { label: 'Drafts', value: 6, icon: PenLine },
];

export default function ContentStudio() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-100">Content Studio</h1>
          <p className="text-purple-300/70 text-sm mt-1">Manage blog posts, articles, and content pieces</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> New Article
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="bg-purple-950/40 border-purple-800/40">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-900/50">
                <s.icon className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-purple-300/70">{s.label}</p>
                <p className="text-2xl font-bold text-purple-100">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="bg-purple-800/30" />

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
        <Input placeholder="Search articles…" className="pl-9 bg-purple-950/30 border-purple-800/40 text-purple-100 placeholder:text-purple-500" />
      </div>

      {/* Table */}
      <Card className="bg-purple-950/40 border-purple-800/40">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-purple-800/30 hover:bg-transparent">
                <TableHead className="text-purple-300">Title</TableHead>
                <TableHead className="text-purple-300">Status</TableHead>
                <TableHead className="text-purple-300">Author</TableHead>
                <TableHead className="text-purple-300">Date</TableHead>
                <TableHead className="text-purple-300 text-right">Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((a) => (
                <TableRow key={a.id} className="border-purple-800/20 hover:bg-purple-900/20">
                  <TableCell className="text-purple-100 font-medium">{a.title}</TableCell>
                  <TableCell>
                    <Badge variant={a.status === 'published' ? 'default' : 'secondary'} className={a.status === 'published' ? 'bg-purple-600/80 text-purple-100' : 'bg-purple-800/50 text-purple-300'}>
                      {a.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-purple-300">{a.author}</TableCell>
                  <TableCell className="text-purple-300/70">{a.date}</TableCell>
                  <TableCell className="text-purple-200 text-right">{a.views.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
