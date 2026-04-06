/**
 * OperatorPeople — Cross-ministry people view for the Gardener Console.
 *
 * WHAT: Aggregated people stats and table across all ministry tenants.
 * WHERE: /operator/people
 * WHY: Operators need a global view of people across the entire platform.
 */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Users, UserCheck, Clock, GraduationCap, Search, Download } from 'lucide-react';

const stats = [
  { label: 'Total People', value: '1,847', icon: Users, color: 'text-purple-400' },
  { label: 'In Pre-Release', value: '312', icon: Clock, color: 'text-amber-400' },
  { label: 'Active Journey', value: '978', icon: UserCheck, color: 'text-green-400' },
  { label: 'Alumni', value: '557', icon: GraduationCap, color: 'text-blue-400' },
];

const people = [
  { id: 1, name: 'Marcus J.', ministry: 'St. Vincent de Paul Reentry', phase: 'Active Journey', mentor: 'Fr. Michael', enrolled: '2025-08-12', signals: 3 },
  { id: 2, name: 'DeShawn W.', ministry: 'Kairos Prison Ministry', phase: 'Pre-Release', mentor: 'Tom R.', enrolled: '2026-01-05', signals: 1 },
  { id: 3, name: 'Anthony R.', ministry: 'Catholic Charities Reentry', phase: 'Active Journey', mentor: 'Sarah K.', enrolled: '2025-11-20', signals: 0 },
  { id: 4, name: 'Carlos M.', ministry: 'Bridges to Life', phase: 'Alumni', mentor: 'James L.', enrolled: '2024-06-15', signals: 0 },
  { id: 5, name: 'Terrence B.', ministry: 'Dismas Ministry', phase: 'Active Journey', mentor: 'Deacon Paul', enrolled: '2025-09-03', signals: 2 },
  { id: 6, name: 'Jerome L.', ministry: 'Kolbe House', phase: 'Pre-Release', mentor: 'Sr. Maria', enrolled: '2026-02-14', signals: 0 },
  { id: 7, name: 'David P.', ministry: 'St. Francis House', phase: 'Active Journey', mentor: 'Mark D.', enrolled: '2025-10-08', signals: 1 },
  { id: 8, name: 'William S.', ministry: 'Exodus Transitional', phase: 'Alumni', mentor: 'Lisa T.', enrolled: '2024-04-22', signals: 0 },
  { id: 9, name: 'Robert H.', ministry: 'St. Vincent de Paul Reentry', phase: 'Active Journey', mentor: 'Fr. Michael', enrolled: '2025-07-19', signals: 4 },
  { id: 10, name: 'James C.', ministry: 'Kairos Prison Ministry', phase: 'Pre-Release', mentor: 'Tom R.', enrolled: '2026-03-01', signals: 0 },
];

const phaseColor: Record<string, string> = {
  'Pre-Release': 'bg-amber-900/50 text-amber-300 border-amber-700/50',
  'Active Journey': 'bg-green-900/50 text-green-300 border-green-700/50',
  'Alumni': 'bg-blue-900/50 text-blue-300 border-blue-700/50',
};

export default function OperatorPeople() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-purple-100">People</h1>
          <p className="text-purple-300/70 text-sm mt-1">Cross-ministry view of all participants</p>
        </div>
        <Button variant="outline" className="border-purple-700/50 text-purple-300 hover:bg-purple-800/30 hover:text-purple-100">
          <Download className="w-4 h-4 mr-2" /> Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="bg-purple-950/40 border-purple-800/40">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-900/50">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-sm text-purple-300/70">{s.label}</p>
                <p className="text-2xl font-bold text-purple-100">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
        <Input placeholder="Search people…" className="pl-9 bg-purple-950/30 border-purple-800/40 text-purple-100 placeholder:text-purple-500" />
      </div>

      {/* Table */}
      <Card className="bg-purple-950/40 border-purple-800/40">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-purple-800/30 hover:bg-transparent">
                <TableHead className="text-purple-300">Name</TableHead>
                <TableHead className="text-purple-300">Ministry</TableHead>
                <TableHead className="text-purple-300">Phase</TableHead>
                <TableHead className="text-purple-300">Mentor</TableHead>
                <TableHead className="text-purple-300">Enrolled</TableHead>
                <TableHead className="text-purple-300 text-right">Signals</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {people.map((p) => (
                <TableRow key={p.id} className="border-purple-800/20 hover:bg-purple-900/20">
                  <TableCell className="text-purple-100 font-medium">{p.name}</TableCell>
                  <TableCell className="text-purple-300/70 text-sm">{p.ministry}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={phaseColor[p.phase]}>{p.phase}</Badge>
                  </TableCell>
                  <TableCell className="text-purple-300">{p.mentor}</TableCell>
                  <TableCell className="text-purple-300/60 text-sm">{p.enrolled}</TableCell>
                  <TableCell className="text-right">
                    {p.signals > 0 ? (
                      <Badge className="bg-purple-600/60 text-purple-200">{p.signals}</Badge>
                    ) : (
                      <span className="text-purple-500/50">0</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
