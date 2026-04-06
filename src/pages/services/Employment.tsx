import { useMemo } from 'react';
import { mockEmploymentRecords } from '@/data/mockData';
import type { EmploymentRecord } from '@/types/resurrectio';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Briefcase, TrendingUp, DollarSign, Clock } from 'lucide-react';

function statusBadge(status: EmploymentRecord['status']) {
  const styles: Record<EmploymentRecord['status'], string> = {
    active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    ended: 'bg-gray-100 text-gray-600 border-gray-200',
    on_leave: 'bg-amber-100 text-amber-800 border-amber-200',
  };
  const labels: Record<EmploymentRecord['status'], string> = {
    active: 'Active',
    ended: 'Ended',
    on_leave: 'On Leave',
  };
  return (
    <Badge variant="outline" className={`${styles[status]} text-xs`}>
      {labels[status]}
    </Badge>
  );
}

export default function Employment() {
  const stats = useMemo(() => {
    const total = mockEmploymentRecords.length;
    const active = mockEmploymentRecords.filter((r) => r.status === 'active');
    const placementRate = Math.round((active.length / total) * 100);

    const over90 = active.filter((r) => r.retentionDays >= 90);
    const retentionRate = active.length > 0 ? Math.round((over90.length / active.length) * 100) : 0;

    const avgWage =
      active.length > 0
        ? (active.reduce((sum, r) => sum + r.wage, 0) / active.length).toFixed(2)
        : '0.00';

    return { placementRate, retentionRate, avgWage };
  }, []);

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-purple-900">
          Employment Tracking
        </h1>
        <p className="mt-1 text-purple-700/70">
          Monitor job placements, wages, and retention across participants
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-purple-100 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-purple-100 p-3">
              <Briefcase className="h-5 w-5 text-purple-700" />
            </div>
            <div>
              <p className="text-sm text-purple-600">Placement Rate</p>
              <p className="text-2xl font-bold text-purple-900">{stats.placementRate}%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-100 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-emerald-100 p-3">
              <Clock className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-sm text-emerald-600">90-Day Retention</p>
              <p className="text-2xl font-bold text-emerald-900">{stats.retentionRate}%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-100 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-amber-100 p-3">
              <DollarSign className="h-5 w-5 text-amber-700" />
            </div>
            <div>
              <p className="text-sm text-amber-600">Avg Wage (Active)</p>
              <p className="text-2xl font-bold text-amber-900">${stats.avgWage}/hr</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="border-purple-100">
        <CardHeader>
          <CardTitle className="text-lg text-purple-900">All Employment Records</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-purple-100">
                <TableHead className="text-purple-800">Person</TableHead>
                <TableHead className="text-purple-800">Employer</TableHead>
                <TableHead className="text-purple-800">Role</TableHead>
                <TableHead className="text-purple-800">Start Date</TableHead>
                <TableHead className="text-purple-800">Wage</TableHead>
                <TableHead className="text-purple-800">Retention</TableHead>
                <TableHead className="text-purple-800">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEmploymentRecords.map((record) => (
                <TableRow key={record.id} className="border-purple-50 hover:bg-purple-50/40">
                  <TableCell className="font-medium text-purple-900">
                    {record.personName}
                  </TableCell>
                  <TableCell className="text-purple-700">{record.employer}</TableCell>
                  <TableCell className="text-purple-700">{record.role}</TableCell>
                  <TableCell className="text-purple-700">
                    {new Date(record.startDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="font-medium text-purple-900">
                    ${record.wage.toFixed(2)}/hr
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-sm font-medium ${
                        record.retentionDays >= 90
                          ? 'text-emerald-700'
                          : record.retentionDays >= 30
                          ? 'text-amber-700'
                          : 'text-purple-600'
                      }`}
                    >
                      {record.retentionDays} days
                    </span>
                  </TableCell>
                  <TableCell>{statusBadge(record.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
