import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockComplianceItems } from '@/data/mockData';
import type { ComplianceItem } from '@/types/resurrectio';
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
import { Scale, CheckCircle2, AlertTriangle, CalendarClock } from 'lucide-react';

function statusBadge(status: ComplianceItem['status']) {
  const styles: Record<ComplianceItem['status'], string> = {
    upcoming: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    overdue: 'bg-red-100 text-red-800 border-red-200',
    excused: 'bg-gray-100 text-gray-600 border-gray-200',
  };
  const labels: Record<ComplianceItem['status'], string> = {
    upcoming: 'Upcoming',
    completed: 'Completed',
    overdue: 'Overdue',
    excused: 'Excused',
  };
  return (
    <Badge variant="outline" className={`${styles[status]} text-xs`}>
      {labels[status]}
    </Badge>
  );
}

function typeLabel(type: ComplianceItem['type']): string {
  const labels: Record<ComplianceItem['type'], string> = {
    court_date: 'Court Date',
    parole_check_in: 'Parole Check-in',
    drug_test: 'Drug Test',
    program_mandate: 'Program Mandate',
    community_service: 'Community Service',
  };
  return labels[type];
}

export default function Compliance() {
  const stats = useMemo(() => {
    const upcoming = mockComplianceItems.filter((c) => c.status === 'upcoming').length;
    const completed = mockComplianceItems.filter((c) => c.status === 'completed').length;
    const overdue = mockComplianceItems.filter((c) => c.status === 'overdue').length;
    return { upcoming, completed, overdue };
  }, []);

  const sorted = useMemo(() => {
    return [...mockComplianceItems].sort((a, b) => {
      const priority: Record<ComplianceItem['status'], number> = {
        overdue: 0,
        upcoming: 1,
        completed: 2,
        excused: 3,
      };
      return priority[a.status] - priority[b.status];
    });
  }, []);

  return (
    <div className="space-y-8">
      <p className="text-muted-foreground">
        Court dates, parole requirements, and mandated program compliance
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-blue-100 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-blue-100 p-3">
              <CalendarClock className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <p className="text-sm text-blue-600">Upcoming</p>
              <p className="text-2xl font-bold text-blue-900">{stats.upcoming}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-100 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-emerald-100 p-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-sm text-emerald-600">Completed This Month</p>
              <p className="text-2xl font-bold text-emerald-900">{stats.completed}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-red-100 p-3">
              <AlertTriangle className="h-5 w-5 text-red-700" />
            </div>
            <div>
              <p className="text-sm text-red-600">Overdue</p>
              <p className="text-2xl font-bold text-red-800">{stats.overdue}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="border-red-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-red-700" />
            <CardTitle className="text-lg text-red-950">
              All Compliance Items
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-red-200">
                <TableHead className="text-red-900">Person</TableHead>
                <TableHead className="text-red-900">Type</TableHead>
                <TableHead className="text-red-900">Title</TableHead>
                <TableHead className="text-red-900">Date</TableHead>
                <TableHead className="text-red-900">Status</TableHead>
                <TableHead className="text-red-900">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((item) => (
                <TableRow
                  key={item.id}
                  className={`border-red-50 ${
                    item.status === 'overdue'
                      ? 'bg-red-50/40 hover:bg-red-50/60'
                      : 'hover:bg-red-50/40'
                  }`}
                >
                  <TableCell className="font-medium">
                    <Link to={`/people/${item.personId}`} className="text-red-900 hover:text-red-700 hover:underline">
                      {item.personName}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-red-300 text-red-800 text-xs">
                      {typeLabel(item.type)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-red-800">{item.title}</TableCell>
                  <TableCell className="text-red-800">
                    {new Date(item.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>{statusBadge(item.status)}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm text-red-700">
                    {item.notes}
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
