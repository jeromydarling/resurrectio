import { useState, useMemo } from 'react';
import { mockPeople, mockServiceMatrix } from '@/data/mockData';
import { STAGE_LABELS } from '@/types/resurrectio';
import type { Person } from '@/types/resurrectio';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Search, LayoutGrid } from 'lucide-react';

const SERVICE_COLUMNS = ['Housing', 'Employment', 'Legal', 'Treatment', 'Spiritual', 'Education'] as const;

function StatusDot({ status }: { status: 'active' | 'pending' | 'none' }) {
  if (status === 'active') {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <span className="text-xs text-emerald-700">Active</span>
      </span>
    );
  }
  if (status === 'pending') {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="text-xs text-amber-700">Pending</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
      <span className="text-xs text-gray-400">None</span>
    </span>
  );
}

function stageBadgeClass(stage: Person['stage']): string {
  const map: Record<Person['stage'], string> = {
    pre_release: 'bg-red-800 text-white',
    stabilization: 'bg-violet-500 text-white',
    growth: 'bg-emerald-600 text-white',
    flourishing: 'bg-amber-500 text-white',
    alumni: 'bg-red-400 text-red-950',
  };
  return map[stage];
}

export default function ServiceCoordination() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return mockPeople.filter(
      (p) =>
        p.firstName.toLowerCase().includes(q) ||
        p.lastName.toLowerCase().includes(q)
    );
  }, [search]);

  const summary = useMemo(() => {
    let active = 0;
    let pending = 0;
    Object.values(mockServiceMatrix).forEach((services) => {
      Object.values(services).forEach((s) => {
        if (s === 'active') active++;
        if (s === 'pending') pending++;
      });
    });
    return { active, pending, total: mockPeople.length };
  }, []);

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-red-950">
          Service Coordination
        </h1>
        <p className="mt-1 text-red-800/70">
          Overview of service provider assignments across all participants
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-red-200 bg-white/80">
          <CardContent className="pt-6">
            <p className="text-sm text-red-700">Total Participants</p>
            <p className="text-3xl font-bold text-red-950">{summary.total}</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-100 bg-white/80">
          <CardContent className="pt-6">
            <p className="text-sm text-emerald-600">Active Services</p>
            <p className="text-3xl font-bold text-emerald-700">{summary.active}</p>
          </CardContent>
        </Card>
        <Card className="border-amber-100 bg-white/80">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-600">Pending Connections</p>
            <p className="text-3xl font-bold text-amber-600">{summary.pending}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Table */}
      <Card className="border-red-200">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-red-700" />
              <CardTitle className="text-lg text-red-950">
                Service Matrix
              </CardTitle>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-red-500" />
              <Input
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 border-red-300 focus-visible:ring-red-500"
              />
            </div>
          </div>
          <CardDescription>
            Green = active provider, Yellow = pending connection, Gray = no provider assigned
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-red-200">
                <TableHead className="text-red-900">Name</TableHead>
                <TableHead className="text-red-900">Stage</TableHead>
                {SERVICE_COLUMNS.map((col) => (
                  <TableHead key={col} className="text-center text-red-900">
                    {col}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((person) => {
                const services = mockServiceMatrix[person.id] || {};
                return (
                  <TableRow key={person.id} className="border-red-50 hover:bg-red-50/40">
                    <TableCell className="font-medium text-red-950">
                      {person.firstName} {person.lastName}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${stageBadgeClass(person.stage)} text-xs`}>
                        {STAGE_LABELS[person.stage]}
                      </Badge>
                    </TableCell>
                    {SERVICE_COLUMNS.map((col) => (
                      <TableCell key={col} className="text-center">
                        <StatusDot status={services[col] || 'none'} />
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={2 + SERVICE_COLUMNS.length}
                    className="py-12 text-center text-red-500"
                  >
                    No participants match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
