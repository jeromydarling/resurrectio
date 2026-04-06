import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Car, Users, AlertTriangle, MapPin, Clock, UserCheck } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

/* ── inline mock data ─────────────────────────────────────────────── */

type PurposeType = 'work' | 'court' | 'treatment' | 'check-in' | 'education';

interface RideRequest {
  id: string;
  personId: string;
  personName: string;
  destination: string;
  purpose: PurposeType;
  day: string;
  time: string;
  notes: string;
  assignedDriverId: string | null;
}

interface Driver {
  id: string;
  name: string;
  availability: string;
  area: string;
  vehicle: string;
  seats: number;
}

const PURPOSE_BADGE: Record<PurposeType, string> = {
  work: 'bg-blue-100 text-blue-800 border-blue-200',
  court: 'bg-red-100 text-red-800 border-red-200',
  treatment: 'bg-teal-100 text-teal-800 border-teal-200',
  'check-in': 'bg-amber-100 text-amber-800 border-amber-200',
  education: 'bg-indigo-100 text-indigo-800 border-indigo-200',
};

const PURPOSE_LABEL: Record<PurposeType, string> = {
  work: 'Work',
  court: 'Court Date',
  treatment: 'Treatment',
  'check-in': 'Check-in',
  education: 'Education',
};

const initialRideRequests: RideRequest[] = [
  {
    id: 'r1',
    personId: 'p-marcus',
    personName: 'Marcus Johnson',
    destination: 'Rivera Construction',
    purpose: 'work',
    day: 'Mon',
    time: '5:30 AM',
    notes: "Needs daily ride, bus route doesn't run before 6am",
    assignedDriverId: null,
  },
  {
    id: 'r2',
    personId: 'p-anthony',
    personName: 'Anthony Brown',
    destination: 'Cook County Courthouse',
    purpose: 'court',
    day: 'Wed',
    time: '8:00 AM',
    notes: 'Must arrive by 8:30, no car',
    assignedDriverId: null,
  },
  {
    id: 'r3',
    personId: 'p-denise',
    personName: 'Denise Williams',
    destination: 'Haymarket Center',
    purpose: 'treatment',
    day: 'Thu',
    time: '10:00 AM',
    notes: 'Bus requires 2 transfers, gets anxious on transit',
    assignedDriverId: null,
  },
  {
    id: 'r4',
    personId: 'p-kevin',
    personName: 'Kevin Harris',
    destination: 'Parole Office',
    purpose: 'check-in',
    day: 'Fri',
    time: '2:00 PM',
    notes: 'License suspended, needs ride',
    assignedDriverId: null,
  },
  {
    id: 'r5',
    personId: 'p-terrence',
    personName: 'Terrence Wallace',
    destination: 'GED Testing Center',
    purpose: 'education',
    day: 'Fri',
    time: '9:00 AM',
    notes: 'No transportation arranged',
    assignedDriverId: null,
  },
];

const drivers: Driver[] = [
  { id: 'd1', name: 'Fr. Michael Torres', availability: 'Mon-Fri mornings', area: 'South Side', vehicle: 'Sedan', seats: 4 },
  { id: 'd2', name: 'Sarah Chen', availability: 'Tue/Thu', area: 'Near North', vehicle: 'SUV', seats: 6 },
  { id: 'd3', name: 'Deacon James', availability: 'Weekdays', area: 'West Side', vehicle: 'Van', seats: 8 },
  { id: 'd4', name: 'Tom Wilson', availability: 'Mon/Wed/Fri afternoons', area: 'Suburban', vehicle: 'Sedan', seats: 4 },
];

interface ScheduleRow {
  date: string;
  person: string;
  destination: string;
  driver: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed';
}

const initialSchedule: ScheduleRow[] = [
  { date: 'Mon 4/6', person: 'Marcus Johnson', destination: 'Rivera Construction', driver: 'Fr. Michael Torres', time: '5:30 AM', status: 'confirmed' },
  { date: 'Tue 4/7', person: 'Denise Williams', destination: 'Haymarket Center', driver: 'Sarah Chen', time: '10:00 AM', status: 'pending' },
  { date: 'Wed 4/8', person: 'Anthony Brown', destination: 'Cook County Courthouse', driver: 'Deacon James', time: '8:00 AM', status: 'confirmed' },
  { date: 'Thu 4/9', person: 'Kevin Harris', destination: 'Parole Office', driver: 'Tom Wilson', time: '2:00 PM', status: 'pending' },
  { date: 'Fri 4/3', person: 'Marcus Johnson', destination: 'Rivera Construction', driver: 'Fr. Michael Torres', time: '5:30 AM', status: 'completed' },
];

const STATUS_STYLE: Record<string, string> = {
  confirmed: 'bg-emerald-100 text-emerald-800',
  pending: 'bg-amber-100 text-amber-800',
  completed: 'bg-gray-100 text-gray-600',
};

/* ── component ─────────────────────────────────────────────────────── */

export default function TransportCoordination() {
  const [rideRequests, setRideRequests] = useState(initialRideRequests);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [assigningRideId, setAssigningRideId] = useState<string | null>(null);

  const ridesNeeded = rideRequests.filter((r) => !r.assignedDriverId).length;
  const unmatchedCount = rideRequests.filter((r) => !r.assignedDriverId).length;

  function handleAssignDriver(rideId: string, driver: Driver) {
    const ride = rideRequests.find((r) => r.id === rideId);
    if (!ride) return;

    setRideRequests((prev) =>
      prev.map((r) => (r.id === rideId ? { ...r, assignedDriverId: driver.id } : r)),
    );

    setSchedule((prev) => [
      ...prev,
      {
        date: ride.day,
        person: ride.personName,
        destination: ride.destination,
        driver: driver.name,
        time: ride.time,
        status: 'pending' as const,
      },
    ]);

    setAssigningRideId(null);
    toast(`${driver.name} assigned to drive ${ride.personName} to ${ride.destination}`);
  }

  return (
    <div className="space-y-8 pb-12">
      <p className="text-muted-foreground">
        Coordinate rides for returning citizens who need reliable transportation to parole, court, work, and treatment.
      </p>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-red-200 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-red-100 p-3">
              <Car className="h-5 w-5 text-red-800" />
            </div>
            <div>
              <p className="text-sm text-red-700">Rides Needed This Week</p>
              <p className="text-2xl font-bold text-red-950">12</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-red-100 p-3">
              <Users className="h-5 w-5 text-red-800" />
            </div>
            <div>
              <p className="text-sm text-red-700">Volunteer Drivers Available</p>
              <p className="text-2xl font-bold text-red-950">8</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-white/80">
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="rounded-lg bg-amber-100 p-3">
              <AlertTriangle className="h-5 w-5 text-amber-700" />
            </div>
            <div>
              <p className="text-sm text-amber-700">Unmatched Requests</p>
              <p className="text-2xl font-bold text-amber-900">{unmatchedCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Ride Request Board ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Rides Needed */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-800" />
            <h2 className="font-serif text-lg font-semibold text-red-900">Rides Needed</h2>
          </div>

          <div className="space-y-3">
            {rideRequests
              .filter((r) => !r.assignedDriverId)
              .map((ride) => (
                <Card key={ride.id} className="hover:bg-red-50/40 transition-all">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/people/${ride.personId}`}
                        className="font-medium text-red-900 hover:underline"
                      >
                        {ride.personName}
                      </Link>
                      <Badge variant="outline" className={PURPOSE_BADGE[ride.purpose]}>
                        {PURPOSE_LABEL[ride.purpose]}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {ride.destination}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {ride.day} {ride.time}
                    </p>
                    <p className="text-xs italic text-muted-foreground">"{ride.notes}"</p>

                    {assigningRideId === ride.id ? (
                      <div className="space-y-2 pt-2 border-t">
                        <p className="text-xs font-medium text-red-800">Select a driver:</p>
                        {drivers.map((d) => (
                          <Button
                            key={d.id}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-left"
                            onClick={() => handleAssignDriver(ride.id, d)}
                          >
                            <UserCheck className="h-3 w-3 mr-2" />
                            {d.name} — {d.area}
                          </Button>
                        ))}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-muted-foreground"
                          onClick={() => setAssigningRideId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-red-900 hover:bg-red-950 text-white"
                        onClick={() => setAssigningRideId(ride.id)}
                      >
                        Assign Driver
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}

            {ridesNeeded === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                All ride requests have been assigned.
              </p>
            )}
          </div>
        </div>

        {/* Right: Available Drivers */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-red-800" />
            <h2 className="font-serif text-lg font-semibold text-red-900">Available Drivers</h2>
          </div>

          <div className="space-y-3">
            {drivers.map((driver) => (
              <Card key={driver.id} className="hover:bg-red-50/40 transition-all">
                <CardContent className="p-4 space-y-1">
                  <p className="font-medium text-red-900">{driver.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Available {driver.availability}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {driver.area}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                      {driver.vehicle} ({driver.seats} seats)
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-800 hover:bg-red-50"
                      onClick={() => {
                        const unmatched = rideRequests.find((r) => !r.assignedDriverId);
                        if (unmatched) {
                          handleAssignDriver(unmatched.id, driver);
                        } else {
                          toast('No unmatched ride requests right now.');
                        }
                      }}
                    >
                      Assign
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* ── Weekly Schedule ────────────────────────────────────── */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="font-serif text-red-900">This Week's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Person</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm">{row.date}</TableCell>
                  <TableCell className="text-sm font-medium text-red-900">{row.person}</TableCell>
                  <TableCell className="text-sm">{row.destination}</TableCell>
                  <TableCell className="text-sm">{row.driver}</TableCell>
                  <TableCell className="text-sm">{row.time}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={STATUS_STYLE[row.status]}>
                      {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
