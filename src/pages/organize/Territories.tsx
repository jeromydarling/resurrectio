import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, HandHeart, Building2 } from 'lucide-react';
import { mockTerritories } from '@/data/mockData';

export default function Territories() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {mockTerritories.map(territory => (
          <Card key={territory.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg font-serif">{territory.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <Users className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-xl font-bold">{territory.activePeople}</div>
                  <div className="text-xs text-muted-foreground">People</div>
                </div>
                <div className="text-center">
                  <HandHeart className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-xl font-bold">{territory.mentorsAssigned}</div>
                  <div className="text-xs text-muted-foreground">Mentors</div>
                </div>
                <div className="text-center">
                  <Building2 className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-xl font-bold">{territory.partners}</div>
                  <div className="text-xs text-muted-foreground">Partners</div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Facilities Covered</h4>
                <div className="flex flex-wrap gap-1.5">
                  {territory.facilitiesCovered.map(f => (
                    <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                  ))}
                </div>
              </div>
              <div className="mt-4 h-32 bg-muted/50 rounded-lg flex items-center justify-center">
                <MapPin className="h-8 w-8 text-muted-foreground/30" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
