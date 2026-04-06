import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Search, Building2, Home, Scale, Heart, Inbox } from 'lucide-react';
import { mockPartners } from '@/data/mockData';

const typeColors: Record<string, string> = {
  court: 'bg-gray-100 text-gray-700', employer: 'bg-blue-100 text-blue-700',
  housing: 'bg-green-100 text-green-700', funder: 'bg-red-200 text-red-800',
  church: 'bg-amber-100 text-amber-700', legal: 'bg-slate-100 text-slate-700',
  treatment: 'bg-teal-100 text-teal-700', education: 'bg-indigo-100 text-indigo-700',
};

export default function Partners() {
  const [search, setSearch] = useState('');
  const filtered = mockPartners.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const counts = { employer: 0, housing: 0, funder: 0, total: mockPartners.length };
  mockPartners.forEach(p => { if (p.type in counts) (counts as any)[p.type]++; });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Partners', value: mockPartners.length, icon: Building2 },
          { label: 'Employers', value: mockPartners.filter(p => p.type === 'employer').length, icon: Building2 },
          { label: 'Housing Providers', value: mockPartners.filter(p => p.type === 'housing').length, icon: Home },
          { label: 'Funders', value: mockPartners.filter(p => p.type === 'funder').length, icon: Heart },
        ].map(stat => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search partners..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">People Served</TableHead>
              <TableHead>Last Activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(p => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell><Badge className={typeColors[p.type]}>{p.type}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.contact}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.phone}</TableCell>
                <TableCell className="text-right">{p.activePeopleServed}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.lastActivity}</TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  <Inbox className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
                  No partners match your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
