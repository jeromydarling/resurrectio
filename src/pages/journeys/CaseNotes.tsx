import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Search,
  Users,
  MessageCircle,
  PartyPopper,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  ArrowRightLeft,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockCaseNotes } from '@/data/mockData';
import type { CaseNote } from '@/types/resurrectio';

type NoteType = CaseNote['type'];

const TYPE_LABELS: Record<NoteType, string> = {
  mentor_meeting: 'Mentor Meeting',
  milestone: 'Milestone',
  concern: 'Concern',
  celebration: 'Celebration',
  check_in: 'Check-In',
  referral: 'Referral',
};

const TYPE_BADGE_CLASSES: Record<NoteType, string> = {
  mentor_meeting: 'bg-red-200 text-red-900 hover:bg-red-200',
  milestone: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100',
  concern: 'bg-red-100 text-red-800 hover:bg-red-100',
  celebration: 'bg-amber-100 text-amber-800 hover:bg-amber-100',
  check_in: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  referral: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100',
};

const TYPE_ICONS: Record<NoteType, React.ComponentType<{ className?: string }>> = {
  mentor_meeting: Users,
  milestone: CheckCircle2,
  concern: AlertTriangle,
  celebration: PartyPopper,
  check_in: PhoneCall,
  referral: ArrowRightLeft,
};

export default function CaseNotes() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    let notes = [...mockCaseNotes];

    // Sort by date descending
    notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (typeFilter !== 'all') {
      notes = notes.filter((n) => n.type === typeFilter);
    }

    const q = search.toLowerCase().trim();
    if (q) {
      notes = notes.filter((n) => n.personName.toLowerCase().includes(q));
    }

    return notes;
  }, [search, typeFilter]);

  return (
    <div className="space-y-8 pb-12">
      <p className="text-muted-foreground">
        A living record of encounters, milestones, and moments that matter.
      </p>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filter by person name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="mentor_meeting">Mentor Meeting</SelectItem>
            <SelectItem value="milestone">Milestone</SelectItem>
            <SelectItem value="concern">Concern</SelectItem>
            <SelectItem value="celebration">Celebration</SelectItem>
            <SelectItem value="check_in">Check-In</SelectItem>
            <SelectItem value="referral">Referral</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground">
          <MessageCircle className="mr-1 inline h-4 w-4" />
          {filtered.length} {filtered.length === 1 ? 'note' : 'notes'}
        </span>
      </div>

      {/* Timeline */}
      <div className="relative space-y-4 pl-6 before:absolute before:left-2 before:top-2 before:h-[calc(100%-1rem)] before:w-0.5 before:bg-red-200">
        {filtered.map((note) => {
          const Icon = TYPE_ICONS[note.type];
          return (
            <div key={note.id} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-6 top-5 flex h-4 w-4 items-center justify-center rounded-full bg-red-300">
                <div className="h-2 w-2 rounded-full bg-red-700" />
              </div>

              <Card className="border-red-200 transition-shadow hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={TYPE_BADGE_CLASSES[note.type]}>
                      <Icon className="mr-1 h-3 w-3" />
                      {TYPE_LABELS[note.type]}
                    </Badge>
                    <Link to={`/people/${note.personId}`} className="text-sm font-medium text-red-900 hover:text-red-700 hover:underline">
                      {note.personName}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                      {new Date(note.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <CardTitle className="text-base">{note.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {note.content}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground/70">
                    — {note.author}
                  </p>
                </CardContent>
              </Card>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <MessageCircle className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
            No case notes match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
