import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Search, UserPlus, Users } from 'lucide-react';
import { mockPeople, mockMentors } from '@/data/mockData';
import type { Person } from '@/types/resurrectio';
import { STAGE_LABELS, STAGE_BADGE_CLASSES } from '@/types/resurrectio';

const HOUSING_LABELS: Record<Person['housingStatus'], string> = {
  shelter: 'Shelter',
  transitional: 'Transitional',
  permanent: 'Permanent',
  family: 'Family',
  none: 'None',
  pending: 'Pending',
};

const EMPLOYMENT_LABELS: Record<Person['employmentStatus'], string> = {
  unemployed: 'Unemployed',
  searching: 'Searching',
  placed: 'Placed',
  retained: 'Retained',
  self_employed: 'Self-Employed',
};

function mentorName(mentorId: string | null): string {
  if (!mentorId) return '—';
  const m = mockMentors.find((mt) => mt.id === mentorId);
  return m ? `${m.firstName} ${m.lastName}` : '—';
}

export default function People() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return mockPeople;
    return mockPeople.filter(
      (p) =>
        p.firstName.toLowerCase().includes(q) ||
        p.lastName.toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <div className="space-y-8 pb-12">
      <p className="text-muted-foreground">
        Every person here is on a journey toward restoration.
      </p>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            {filtered.length} {filtered.length === 1 ? 'person' : 'people'}
          </span>
          <Link to="/quick-add">
            <Button className="bg-red-900 hover:bg-red-950">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Person
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead className="hidden md:table-cell">Mentor</TableHead>
                <TableHead className="hidden lg:table-cell">Housing</TableHead>
                <TableHead className="hidden lg:table-cell">Employment</TableHead>
                <TableHead className="hidden sm:table-cell">Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((person) => (
                <TableRow key={person.id} className="hover:bg-red-50/40">
                  <TableCell className="font-medium">
                    <Link to={`/people/${person.id}`} className="text-red-900 hover:text-red-700 hover:underline">
                      {person.firstName} {person.lastName}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge className={STAGE_BADGE_CLASSES[person.stage]}>
                      {STAGE_LABELS[person.stage]}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {mentorName(person.mentorId)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {HOUSING_LABELS[person.housingStatus]}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {EMPLOYMENT_LABELS[person.employmentStatus]}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                    {new Date(person.lastActivity).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                </TableRow>
              ))}

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                    No people match your search.
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
