import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  Users,
  Phone,
  Calendar,
  Star,
  Baby,
  User,
  UserCircle,
  HelpCircle,
} from 'lucide-react';
import { mockFamilyMembers } from '@/data/mockData';
import type { FamilyMember } from '@/types/resurrectio';

const CONTACT_STATUS_CONFIG: Record<
  FamilyMember['contactStatus'],
  { label: string; className: string }
> = {
  connected: { label: 'Connected', className: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' },
  attempting: { label: 'Attempting', className: 'bg-amber-100 text-amber-700 hover:bg-amber-100' },
  not_ready: { label: 'Not Ready', className: 'bg-red-100 text-red-700 hover:bg-red-100' },
  no_contact: { label: 'No Contact', className: 'bg-gray-100 text-gray-600 hover:bg-gray-100' },
};

const RELATIONSHIP_ICONS: Record<
  FamilyMember['relationship'],
  React.ComponentType<{ className?: string }>
> = {
  spouse: Heart,
  child: Baby,
  parent: UserCircle,
  sibling: Users,
  other: User,
};

const RELATIONSHIP_LABELS: Record<FamilyMember['relationship'], string> = {
  spouse: 'Spouse',
  child: 'Child',
  parent: 'Parent',
  sibling: 'Sibling',
  other: 'Other',
};

export default function Family() {
  const grouped = useMemo(() => {
    const map: Record<string, { personName: string; members: FamilyMember[] }> = {};
    for (const fm of mockFamilyMembers) {
      if (!map[fm.personId]) {
        map[fm.personId] = { personName: fm.personName, members: [] };
      }
      map[fm.personId].members.push(fm);
    }
    return Object.entries(map);
  }, []);

  const totalConnected = mockFamilyMembers.filter(
    (fm) => fm.contactStatus === 'connected',
  ).length;
  const totalMembers = mockFamilyMembers.length;

  return (
    <div className="space-y-8 pb-12">
      <p className="text-muted-foreground">
        Restoration is not complete without the people who matter most.
      </p>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Card className="border-red-200">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-200">
              <Users className="h-5 w-5 text-red-800" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-950">{totalMembers}</p>
              <p className="text-xs text-muted-foreground">Family Members</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-emerald-100">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
              <Heart className="h-5 w-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-800">{totalConnected}</p>
              <p className="text-xs text-muted-foreground">Connected</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-100">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
              <Star className="h-5 w-5 text-amber-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-800">
                {mockFamilyMembers.filter((fm) => fm.reunificationMilestone).length}
              </p>
              <p className="text-xs text-muted-foreground">Reunifications</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Person Cards */}
      <div className="space-y-6">
        {grouped.map(([personId, { personName, members }]) => (
          <Card key={personId} className="border-red-200 overflow-hidden">
            <CardHeader className="bg-red-50/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-300">
                  <User className="h-5 w-5 text-red-800" />
                </div>
                <div>
                  <CardTitle className="font-serif text-lg">{personName}</CardTitle>
                  <CardDescription>
                    {members.length} family {members.length === 1 ? 'member' : 'members'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-red-50">
                {members.map((fm) => {
                  const RelIcon = RELATIONSHIP_ICONS[fm.relationship];
                  const statusConfig = CONTACT_STATUS_CONFIG[fm.contactStatus];

                  return (
                    <div
                      key={fm.id}
                      className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-200/70">
                          <RelIcon className="h-4 w-4 text-red-700" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-sm text-red-950">
                            {fm.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {RELATIONSHIP_LABELS[fm.relationship]}
                          </p>
                          {fm.notes && (
                            <p className="text-xs text-muted-foreground/80 leading-relaxed max-w-md">
                              {fm.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pl-11 sm:pl-0">
                        <Badge className={statusConfig.className}>
                          {statusConfig.label}
                        </Badge>

                        {fm.lastContact && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(fm.lastContact).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        )}

                        {fm.reunificationMilestone && (
                          <Badge
                            variant="outline"
                            className="border-pink-200 text-pink-700"
                          >
                            <Star className="mr-1 h-3 w-3" />
                            Reunified
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
