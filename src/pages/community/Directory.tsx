import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Phone, Mail } from 'lucide-react';
import { mockPartners } from '@/data/mockData';

const typeColors: Record<string, string> = {
  court: 'bg-gray-100 text-gray-700', employer: 'bg-blue-100 text-blue-700',
  housing: 'bg-green-100 text-green-700', funder: 'bg-purple-100 text-purple-700',
  church: 'bg-amber-100 text-amber-700', legal: 'bg-slate-100 text-slate-700',
  treatment: 'bg-teal-100 text-teal-700', education: 'bg-indigo-100 text-indigo-700',
};

export default function Directory() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const types = ['all', ...new Set(mockPartners.map(p => p.type))];
  const filtered = mockPartners.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || p.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search organizations..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {types.map(t => (
            <Button key={t} variant={typeFilter === t ? 'default' : 'outline'} size="sm" onClick={() => setTypeFilter(t)} className="capitalize">{t}</Button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(partner => (
          <Card key={partner.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-serif text-base font-medium">{partner.name}</h3>
                <Badge className={typeColors[partner.type] || 'bg-gray-100'}>{partner.type}</Badge>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 shrink-0" /><span>{partner.address}</span></div>
                <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 shrink-0" /><span>{partner.phone}</span></div>
                <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 shrink-0" /><span>{partner.email}</span></div>
              </div>
              <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">{partner.activePeopleServed} people served</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
