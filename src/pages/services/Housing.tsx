import { useMemo } from 'react';
import { mockHousingRecords } from '@/data/mockData';
import type { HousingRecord } from '@/types/resurrectio';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Home, Building2, Users, TrendingUp } from 'lucide-react';

function typeBadge(type: HousingRecord['type']) {
  const styles: Record<HousingRecord['type'], string> = {
    transitional: 'bg-violet-100 text-violet-800 border-violet-200',
    permanent: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    family: 'bg-amber-100 text-amber-800 border-amber-200',
    shelter: 'bg-red-100 text-red-800 border-red-200',
    sober_living: 'bg-blue-100 text-blue-800 border-blue-200',
  };
  const labels: Record<HousingRecord['type'], string> = {
    transitional: 'Transitional',
    permanent: 'Permanent',
    family: 'Family',
    shelter: 'Shelter',
    sober_living: 'Sober Living',
  };
  return (
    <Badge variant="outline" className={`${styles[type]} text-xs`}>
      {labels[type]}
    </Badge>
  );
}

function stabilityColor(score: number): string {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 50) return 'bg-amber-500';
  return 'bg-red-500';
}

export default function Housing() {
  const stats = useMemo(() => {
    const totalHoused = mockHousingRecords.length;
    const transitional = mockHousingRecords.filter((r) => r.type === 'transitional').length;
    const permanent = mockHousingRecords.filter((r) => r.type === 'permanent').length;
    const avgStability = Math.round(
      mockHousingRecords.reduce((sum, r) => sum + r.stabilityScore, 0) / totalHoused
    );
    return { totalHoused, transitional, permanent, avgStability };
  }, []);

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-purple-900">
          Housing Placements
        </h1>
        <p className="mt-1 text-purple-700/70">
          Track housing stability and placements across all participants
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-purple-100 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-purple-100 p-3">
              <Home className="h-5 w-5 text-purple-700" />
            </div>
            <div>
              <p className="text-sm text-purple-600">Total Housed</p>
              <p className="text-2xl font-bold text-purple-900">{stats.totalHoused}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-violet-100 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-violet-100 p-3">
              <Building2 className="h-5 w-5 text-violet-700" />
            </div>
            <div>
              <p className="text-sm text-violet-600">Transitional</p>
              <p className="text-2xl font-bold text-violet-900">{stats.transitional}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-100 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-emerald-100 p-3">
              <Users className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-sm text-emerald-600">Permanent</p>
              <p className="text-2xl font-bold text-emerald-900">{stats.permanent}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-100 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-amber-100 p-3">
              <TrendingUp className="h-5 w-5 text-amber-700" />
            </div>
            <div>
              <p className="text-sm text-amber-600">Avg Stability</p>
              <p className="text-2xl font-bold text-amber-900">{stats.avgStability}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="border-purple-100">
        <CardHeader>
          <CardTitle className="text-lg text-purple-900">All Placements</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-purple-100">
                <TableHead className="text-purple-800">Person</TableHead>
                <TableHead className="text-purple-800">Type</TableHead>
                <TableHead className="text-purple-800">Provider</TableHead>
                <TableHead className="text-purple-800">Move-in Date</TableHead>
                <TableHead className="text-purple-800">Stability</TableHead>
                <TableHead className="text-purple-800 text-center">Subsidized</TableHead>
                <TableHead className="text-purple-800">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHousingRecords.map((record) => (
                <TableRow key={record.id} className="border-purple-50 hover:bg-purple-50/40">
                  <TableCell className="font-medium text-purple-900">
                    {record.personName}
                  </TableCell>
                  <TableCell>{typeBadge(record.type)}</TableCell>
                  <TableCell className="text-purple-700">{record.provider}</TableCell>
                  <TableCell className="text-purple-700">
                    {new Date(record.moveInDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-20">
                        <Progress
                          value={record.stabilityScore}
                          className={`h-2 ${stabilityColor(record.stabilityScore)}`}
                        />
                      </div>
                      <span className="text-xs font-medium text-purple-700">
                        {record.stabilityScore}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {record.subsidized ? (
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">
                        Yes
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-400 border-gray-200 text-xs">
                        No
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm text-purple-600">
                    {record.notes}
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
