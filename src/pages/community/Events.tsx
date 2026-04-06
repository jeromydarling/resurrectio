import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockEvents } from '@/data/mockData';
import { Calendar, Clock, MapPin, Users, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const eventTypeStyles: Record<string, string> = {
  mentoring_circle: 'bg-red-200 text-red-900',
  family_day: 'bg-pink-100 text-pink-800',
  job_fair: 'bg-blue-100 text-blue-800',
  worship: 'bg-amber-100 text-amber-800',
  training: 'bg-emerald-100 text-emerald-800',
  celebration: 'bg-violet-100 text-violet-800',
};

const eventTypeLabels: Record<string, string> = {
  mentoring_circle: 'Mentoring Circle',
  family_day: 'Family Day',
  job_fair: 'Job Fair',
  worship: 'Worship',
  training: 'Training',
  celebration: 'Celebration',
};

const sortedEvents = [...mockEvents].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);

export default function Events() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-red-950">Community Events</h1>
        <p className="text-muted-foreground mt-1">Gatherings that strengthen and sustain our community</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sortedEvents.map((event) => {
          const capacityPct = Math.round((event.attendeeCount / event.maxCapacity) * 100);
          return (
            <Card key={event.id} className="bg-white/80">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="font-serif text-red-950 text-lg"><Link to={`/events/${event.id}`} className="hover:text-red-700 hover:underline">{event.name}</Link></CardTitle>
                  <Badge className={eventTypeStyles[event.type]}>
                    {eventTypeLabels[event.type]}
                  </Badge>
                </div>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-red-600" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-red-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-red-600" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      <span>{event.attendeeCount} / {event.maxCapacity} attending</span>
                    </div>
                    <span>{capacityPct}%</span>
                  </div>
                  <Progress value={capacityPct} className="h-2" />
                </div>
                <Button
                  className="w-full bg-red-800 hover:bg-red-900 text-white"
                  size="sm"
                  onClick={() =>
                    toast({
                      title: 'Registered',
                      description: `You have been registered for ${event.name}.`,
                    })
                  }
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Register
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
