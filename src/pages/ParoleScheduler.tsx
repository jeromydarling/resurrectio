import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarDays, Clock, MapPin, AlertTriangle, CheckCircle2, CircleDot } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { mockPeople, mockComplianceItems } from '@/data/mockData';

const TYPE_LABELS: Record<string, string> = {
  parole_check_in: 'Parole Check-In',
  court_date: 'Court Date',
  drug_test: 'Drug Test',
  program_mandate: 'Program Mandate',
  community_service: 'Community Service',
};

const TYPE_BADGE_CLASSES: Record<string, string> = {
  parole_check_in: 'bg-blue-100 text-blue-800',
  court_date: 'bg-purple-100 text-purple-800',
  drug_test: 'bg-amber-100 text-amber-800',
  program_mandate: 'bg-emerald-100 text-emerald-800',
  community_service: 'bg-teal-100 text-teal-800',
};

const STATUS_CONFIG: Record<string, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  upcoming: { label: 'Upcoming', className: 'bg-blue-100 text-blue-800', icon: CircleDot },
  overdue: { label: 'Overdue', className: 'bg-red-100 text-red-800', icon: AlertTriangle },
  completed: { label: 'Completed', className: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  excused: { label: 'Excused', className: 'bg-gray-100 text-gray-700', icon: CheckCircle2 },
};

export default function ParoleScheduler() {
  const [newCheckin, setNewCheckin] = useState({
    personId: '',
    type: '',
    date: '',
    time: '',
    location: '',
    notes: '',
  });

  const sortedItems = useMemo(() => {
    return [...mockComplianceItems].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, []);

  // Group items by week
  const grouped = useMemo(() => {
    const groups: { label: string; items: typeof mockComplianceItems }[] = [];
    const weekMap = new Map<string, typeof mockComplianceItems>();

    for (const item of sortedItems) {
      const d = new Date(item.date);
      const weekStart = new Date(d);
      weekStart.setDate(d.getDate() - d.getDay());
      const key = weekStart.toISOString().split('T')[0];
      if (!weekMap.has(key)) weekMap.set(key, []);
      weekMap.get(key)!.push(item);
    }

    for (const [key, items] of weekMap) {
      const start = new Date(key);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      groups.push({ label: `Week of ${fmt(start)} - ${fmt(end)}`, items });
    }

    return groups;
  }, [sortedItems]);

  function updateNew(field: string, value: string) {
    setNewCheckin((prev) => ({ ...prev, [field]: value }));
  }

  function handleSchedule() {
    const person = mockPeople.find((p) => p.id === newCheckin.personId);
    const typeName = TYPE_LABELS[newCheckin.type] || newCheckin.type;
    toast(`Scheduled ${typeName} for ${person ? `${person.firstName} ${person.lastName}` : 'person'}`);
    setNewCheckin({ personId: '', type: '', date: '', time: '', location: '', notes: '' });
  }

  return (
    <div className="space-y-8 pb-12">
      <p className="text-muted-foreground">
        Schedule and track parole check-ins, court dates, and compliance deadlines.
      </p>

      {/* Schedule New Check-In */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-red-900 flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Schedule New Check-In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Person</Label>
              <Select value={newCheckin.personId} onValueChange={(v) => updateNew('personId', v)}>
                <SelectTrigger><SelectValue placeholder="Select person" /></SelectTrigger>
                <SelectContent>
                  {mockPeople.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.firstName} {p.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={newCheckin.type} onValueChange={(v) => updateNew('type', v)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="parole_check_in">Parole Check-In</SelectItem>
                  <SelectItem value="court_date">Court Date</SelectItem>
                  <SelectItem value="drug_test">Drug Test</SelectItem>
                  <SelectItem value="program_mandate">Program Mandate</SelectItem>
                  <SelectItem value="community_service">Community Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkinDate">Date</Label>
              <Input id="checkinDate" type="date" value={newCheckin.date} onChange={(e) => updateNew('date', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkinTime">Time</Label>
              <Input id="checkinTime" type="time" value={newCheckin.time} onChange={(e) => updateNew('time', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkinLocation">Location</Label>
              <Input id="checkinLocation" value={newCheckin.location} onChange={(e) => updateNew('location', e.target.value)} placeholder="Address or office name" />
            </div>
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <Label htmlFor="checkinNotes">Notes</Label>
              <Textarea id="checkinNotes" value={newCheckin.notes} onChange={(e) => updateNew('notes', e.target.value)} placeholder="Additional details..." rows={1} />
            </div>
          </div>
          <Button
            className="bg-red-900 hover:bg-red-950 mt-4"
            disabled={!newCheckin.personId || !newCheckin.type || !newCheckin.date}
            onClick={handleSchedule}
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            Schedule
          </Button>
        </CardContent>
      </Card>

      {/* Upcoming Compliance Calendar */}
      <div className="space-y-6">
        <h2 className="font-serif text-xl font-semibold text-red-900 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Upcoming Compliance Calendar
        </h2>

        {grouped.map((group) => (
          <div key={group.label} className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {group.label}
            </h3>
            <div className="space-y-2">
              {group.items.map((item) => {
                const status = STATUS_CONFIG[item.status] ?? STATUS_CONFIG.upcoming;
                const StatusIcon = status.icon;
                const isOverdue = item.status === 'overdue';
                return (
                  <Card
                    key={item.id}
                    className={isOverdue ? 'border-l-4 border-l-red-500' : ''}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Link
                              to={`/people/${item.personId}`}
                              className="font-medium text-red-900 hover:text-red-700 hover:underline"
                            >
                              {item.personName}
                            </Link>
                            <Badge className={TYPE_BADGE_CLASSES[item.type] ?? 'bg-gray-100 text-gray-800'}>
                              {TYPE_LABELS[item.type] ?? item.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground">{item.title}</p>
                          {item.notes && (
                            <p className="text-xs text-muted-foreground">{item.notes}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <p className="text-sm font-medium flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              {new Date(item.date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                          <Badge className={`${status.className} flex items-center gap-1`}>
                            <StatusIcon className="h-3 w-3" />
                            {status.label}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
