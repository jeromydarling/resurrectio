import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockMentors } from '@/data/mockData';
import { Search, UserPlus, Clock, Users, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const trainingStatusStyles: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-800',
  in_training: 'bg-amber-100 text-amber-800',
  inactive: 'bg-gray-100 text-gray-600',
};

const trainingStatusLabels: Record<string, string> = {
  active: 'Active',
  in_training: 'In Training',
  inactive: 'Inactive',
};

export default function Mentors() {
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  const filtered = mockMentors.filter((m) => {
    const term = search.toLowerCase();
    return (
      `${m.firstName} ${m.lastName}`.toLowerCase().includes(term) ||
      m.parish.toLowerCase().includes(term) ||
      m.specialization.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">Community mentors walking alongside returning citizens</p>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search mentors by name, parish, or specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((mentor) => (
          <Card key={mentor.id} className="bg-white/80">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="font-serif text-red-950 text-lg">
                  <Link to={`/volunteers/${mentor.id}`} className="hover:text-red-700 hover:underline">
                    {mentor.firstName} {mentor.lastName}
                  </Link>
                </CardTitle>
                <Badge className={trainingStatusStyles[mentor.trainingStatus]}>
                  {trainingStatusLabels[mentor.trainingStatus]}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{mentor.parish}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-red-600" />
                <span>{mentor.specialization}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span>{mentor.matchedMentees.length} mentees</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{mentor.totalHours} hrs</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Joined {new Date(mentor.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
              <Button
                className="w-full bg-red-800 hover:bg-red-900 text-white mt-2"
                size="sm"
                onClick={() =>
                  toast({
                    title: 'Coming Soon',
                    description: 'Mentor matching coming soon',
                  })
                }
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Match Mentor
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No mentors found matching your search.</p>
      )}
    </div>
  );
}
