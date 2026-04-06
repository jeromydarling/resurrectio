import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText } from 'lucide-react';
import { mockResources } from '@/data/mockData';

export default function Resources() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">Downloadable forms, playbooks, and guides for your ministry.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockResources.map(resource => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-base font-medium mb-1">{resource.name}</h3>
                  <Badge variant="secondary" className="text-xs mb-2">{resource.type}</Badge>
                  <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{resource.downloadCount} downloads</span>
                    <Button size="sm" variant="outline"><Download className="h-3.5 w-3.5 mr-1" />Download</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
