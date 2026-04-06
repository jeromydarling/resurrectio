/**
 * Ministries — Ministry organization (tenant) listing for the Gardener Console.
 *
 * WHAT: Table of ministry tenants with plan tiers, status, and activity info.
 * WHERE: /operator/ministries
 * WHY: Operators need to see and manage all ministry organizations on the platform.
 */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Building2, Search, Plus } from 'lucide-react';

const ministries = [
  { name: 'St. Vincent de Paul Reentry', location: 'Chicago, IL', people: 312, mentors: 28, plan: 'Story', status: 'active', lastActive: '2 min ago' },
  { name: 'Kairos Prison Ministry', location: 'Illinois', people: 245, mentors: 42, plan: 'Insight', status: 'active', lastActive: '15 min ago' },
  { name: 'Catholic Charities Reentry Services', location: 'Indianapolis, IN', people: 189, mentors: 15, plan: 'Core', status: 'active', lastActive: '1 hr ago' },
  { name: 'Dismas Ministry', location: 'Midwest', people: 278, mentors: 31, plan: 'Story', status: 'active', lastActive: '30 min ago' },
  { name: 'Kolbe House', location: 'Chicago, IL', people: 156, mentors: 12, plan: 'Insight', status: 'active', lastActive: '3 hr ago' },
  { name: 'St. Francis House', location: 'Boston, MA', people: 203, mentors: 19, plan: 'Core', status: 'trial', lastActive: '45 min ago' },
  { name: 'Bridges to Life', location: 'Houston, TX', people: 298, mentors: 35, plan: 'Story', status: 'active', lastActive: '20 min ago' },
  { name: 'Exodus Transitional Community', location: 'New York, NY', people: 166, mentors: 14, plan: 'Insight', status: 'trial', lastActive: '2 hr ago' },
];

const planColor: Record<string, string> = {
  Core: 'bg-purple-800/50 text-purple-300',
  Insight: 'bg-indigo-800/50 text-indigo-300',
  Story: 'bg-violet-600/60 text-violet-200',
};

export default function Ministries() {
  const totalPeople = ministries.reduce((s, m) => s + m.people, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-100">Ministries</h1>
          <p className="text-purple-300/70 text-sm mt-1">{ministries.length} organizations &middot; {totalPeople.toLocaleString()} total people</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Ministry
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
        <Input placeholder="Search ministries…" className="pl-9 bg-purple-950/30 border-purple-800/40 text-purple-100 placeholder:text-purple-500" />
      </div>

      {/* Table */}
      <Card className="bg-purple-950/40 border-purple-800/40">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-purple-800/30 hover:bg-transparent">
                <TableHead className="text-purple-300">Ministry Name</TableHead>
                <TableHead className="text-purple-300">Location</TableHead>
                <TableHead className="text-purple-300 text-right">People</TableHead>
                <TableHead className="text-purple-300 text-right">Mentors</TableHead>
                <TableHead className="text-purple-300">Plan Tier</TableHead>
                <TableHead className="text-purple-300">Status</TableHead>
                <TableHead className="text-purple-300">Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ministries.map((m) => (
                <TableRow key={m.name} className="border-purple-800/20 hover:bg-purple-900/20">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-purple-500" />
                      <span className="text-purple-100">{m.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-purple-300/70">{m.location}</TableCell>
                  <TableCell className="text-purple-200 text-right">{m.people}</TableCell>
                  <TableCell className="text-purple-200 text-right">{m.mentors}</TableCell>
                  <TableCell>
                    <Badge className={planColor[m.plan]}>{m.plan}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={m.status === 'active' ? 'border-green-700/50 text-green-300' : 'border-yellow-700/50 text-yellow-300'}>
                      {m.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-purple-300/60 text-sm">{m.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
