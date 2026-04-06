import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Mail, Users, ArrowRight, FileText, Star, MessageSquare } from 'lucide-react';
import { mockActivities } from '@/data/mockData';

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  call: Phone, visit: MapPin, email: Mail, meeting: Users,
  referral: ArrowRight, note: FileText, milestone: Star,
};
const typeColors: Record<string, string> = {
  call: 'bg-blue-100 text-blue-700', visit: 'bg-green-100 text-green-700',
  email: 'bg-indigo-100 text-indigo-700', meeting: 'bg-purple-100 text-purple-700',
  referral: 'bg-amber-100 text-amber-700', note: 'bg-gray-100 text-gray-700',
  milestone: 'bg-emerald-100 text-emerald-700',
};

export default function Activities() {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const types = ['all', ...new Set(mockActivities.map(a => a.type))];
  const filtered = typeFilter === 'all' ? mockActivities : mockActivities.filter(a => a.type === typeFilter);

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {types.map(t => (
          <Button key={t} variant={typeFilter === t ? 'default' : 'outline'} size="sm" onClick={() => setTypeFilter(t)} className="capitalize">{t}</Button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map(activity => {
          const Icon = typeIcons[activity.type] || MessageSquare;
          return (
            <Card key={activity.id}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${typeColors[activity.type] || 'bg-gray-100'}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span>{activity.personName}</span>
                    <span>&middot;</span>
                    <span>{activity.author}</span>
                    {activity.partnerName && <><span>&middot;</span><span>{activity.partnerName}</span></>}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.date}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
