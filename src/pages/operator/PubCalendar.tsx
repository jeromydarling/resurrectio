/**
 * PubCalendar — Publication calendar for the Gardener Console.
 *
 * WHAT: Monthly calendar grid with scheduled content dots and upcoming posts sidebar.
 * WHERE: /operator/pub-calendar
 * WHY: Operators need to plan and visualize content publication schedules.
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MONTH = 'April 2026';
const DAYS_IN_MONTH = 30;
const START_DAY = 2; // April 2026 starts on Wednesday (0=Sun)

const scheduledDates: Record<number, { color: string; title: string }[]> = {
  8: [{ color: 'bg-purple-500', title: 'Ministry Spotlight: Kairos' }],
  15: [{ color: 'bg-green-500', title: 'Housing Success Stories' }],
  22: [{ color: 'bg-blue-500', title: 'Volunteer Training Guide' }],
  30: [{ color: 'bg-amber-500', title: 'Quarterly Impact Report' }],
  3: [{ color: 'bg-purple-400', title: 'Weekly Digest' }],
  10: [{ color: 'bg-purple-400', title: 'Weekly Digest' }],
  17: [{ color: 'bg-purple-400', title: 'Weekly Digest' }],
  24: [{ color: 'bg-purple-400', title: 'Weekly Digest' }],
};

const upcoming = [
  { date: 'Apr 8', title: 'Ministry Spotlight: Kairos', type: 'Feature', color: 'bg-purple-500' },
  { date: 'Apr 15', title: 'Housing Success Stories', type: 'Stories', color: 'bg-green-500' },
  { date: 'Apr 22', title: 'Volunteer Training Guide', type: 'Guide', color: 'bg-blue-500' },
  { date: 'Apr 30', title: 'Quarterly Impact Report', type: 'Report', color: 'bg-amber-500' },
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function PubCalendar() {
  const cells: (number | null)[] = [];
  for (let i = 0; i < START_DAY; i++) cells.push(null);
  for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const today = 6; // mock today as April 6

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-purple-100">Publication Calendar</h1>
        <p className="text-purple-300/70 text-sm mt-1">Schedule and track content publication</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <Card className="bg-purple-950/40 border-purple-800/40 lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Button size="sm" variant="ghost" className="text-purple-300 hover:text-purple-100 hover:bg-purple-800/30">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <CardTitle className="text-purple-100 text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                {MONTH}
              </CardTitle>
              <Button size="sm" variant="ghost" className="text-purple-300 hover:text-purple-100 hover:bg-purple-800/30">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {WEEKDAYS.map((d) => (
                <div key={d} className="text-center text-xs font-medium text-purple-400/70 py-1">{d}</div>
              ))}
            </div>
            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, idx) => (
                <div
                  key={idx}
                  className={`relative h-16 rounded-md border text-sm flex flex-col items-center pt-1 ${
                    day === null
                      ? 'border-transparent'
                      : day === today
                        ? 'border-purple-500 bg-purple-900/40'
                        : 'border-purple-800/20 hover:bg-purple-900/20'
                  }`}
                >
                  {day !== null && (
                    <>
                      <span className={`text-xs ${day === today ? 'text-purple-200 font-bold' : 'text-purple-300/70'}`}>{day}</span>
                      {scheduledDates[day] && (
                        <div className="flex gap-1 mt-1.5">
                          {scheduledDates[day].map((s, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${s.color}`} title={s.title} />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming sidebar */}
        <Card className="bg-purple-950/40 border-purple-800/40">
          <CardHeader>
            <CardTitle className="text-purple-100 text-lg">Upcoming Posts</CardTitle>
            <CardDescription className="text-purple-400/70">Scheduled for this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcoming.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className={`w-3 h-3 rounded-full mt-1.5 ${item.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-purple-100">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-purple-400/70">{item.date}</span>
                    <Badge variant="outline" className="text-[10px] border-purple-700/50 text-purple-300 px-1.5 py-0">{item.type}</Badge>
                  </div>
                </div>
                <FileText className="w-4 h-4 text-purple-500/50 mt-1" />
              </div>
            ))}
            <Separator className="bg-purple-800/20" />
            <Button variant="outline" className="w-full border-purple-700/50 text-purple-300 hover:bg-purple-800/30 hover:text-purple-100" size="sm">
              + Schedule Post
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
