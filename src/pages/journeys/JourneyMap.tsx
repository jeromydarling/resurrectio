import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Briefcase, Clock } from 'lucide-react';
import { mockPeople } from '@/data/mockData';
import type { Person, JourneyStage } from '@/types/resurrectio';
import { STAGE_LABELS, STAGE_BADGE_CLASSES } from '@/types/resurrectio';

const STAGES: JourneyStage[] = [
  'pre_release',
  'stabilization',
  'growth',
  'flourishing',
  'alumni',
];

const COLUMN_ACCENT: Record<JourneyStage, string> = {
  pre_release: 'border-t-red-800',
  stabilization: 'border-t-violet-500',
  growth: 'border-t-emerald-600',
  flourishing: 'border-t-amber-500',
  alumni: 'border-t-red-400',
};

const COLUMN_BG: Record<JourneyStage, string> = {
  pre_release: 'bg-red-50',
  stabilization: 'bg-violet-50',
  growth: 'bg-emerald-50',
  flourishing: 'bg-amber-50',
  alumni: 'bg-red-50/60',
};

const HOUSING_ICON_COLOR: Record<Person['housingStatus'], string> = {
  permanent: 'text-emerald-600',
  family: 'text-emerald-600',
  transitional: 'text-amber-500',
  shelter: 'text-orange-500',
  pending: 'text-gray-400',
  none: 'text-red-500',
};

const EMPLOYMENT_ICON_COLOR: Record<Person['employmentStatus'], string> = {
  retained: 'text-emerald-600',
  self_employed: 'text-emerald-600',
  placed: 'text-amber-500',
  searching: 'text-orange-400',
  unemployed: 'text-gray-400',
};

export default function JourneyMap() {
  const grouped = useMemo(() => {
    const map: Record<JourneyStage, Person[]> = {
      pre_release: [],
      stabilization: [],
      growth: [],
      flourishing: [],
      alumni: [],
    };
    for (const p of mockPeople) {
      map[p.stage].push(p);
    }
    return map;
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-red-950">
          Journey Map
        </h1>
        <p className="mt-1 text-muted-foreground">
          Where each person stands on the path from release to restoration.
        </p>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 overflow-x-auto">
        {STAGES.map((stage) => {
          const people = grouped[stage];
          return (
            <div key={stage} className="flex flex-col gap-3">
              {/* Column Header */}
              <div
                className={`rounded-lg border-t-4 ${COLUMN_ACCENT[stage]} ${COLUMN_BG[stage]} px-4 py-3`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-sm font-semibold text-red-950">
                    {STAGE_LABELS[stage]}
                  </h2>
                  <Badge variant="secondary" className="text-xs">
                    {people.length}
                  </Badge>
                </div>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2 min-h-[120px]">
                {people.map((person) => (
                  <Card
                    key={person.id}
                    className="cursor-pointer border border-red-200 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <CardContent className="p-4 space-y-3">
                      <p className="font-medium text-sm text-red-950">
                        {person.firstName} {person.lastName}
                      </p>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{person.daysInStage}d in stage</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`flex items-center gap-1 text-xs ${HOUSING_ICON_COLOR[person.housingStatus]}`}
                          title={`Housing: ${person.housingStatus}`}
                        >
                          <Home className="h-3.5 w-3.5" />
                        </span>
                        <span
                          className={`flex items-center gap-1 text-xs ${EMPLOYMENT_ICON_COLOR[person.employmentStatus]}`}
                          title={`Employment: ${person.employmentStatus}`}
                        >
                          <Briefcase className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {people.length === 0 && (
                  <div className="flex items-center justify-center rounded-lg border border-dashed border-red-300 py-8 text-xs text-muted-foreground">
                    No one here yet
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
