import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye, Download } from 'lucide-react';
import { mockTemplates } from '@/data/mockData';

export default function Templates() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">Pre-built forms, playbooks, and templates for your reentry ministry.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockTemplates.map(template => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-base font-medium mb-1">{template.name}</h3>
                  <Badge variant="secondary" className="text-xs mb-2">{template.type.replace(/_/g, ' ')}</Badge>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  <div className="text-xs text-muted-foreground mb-3">
                    Updated {template.lastUpdated} &middot; Used {template.usageCount} times
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">Use Template</Button>
                    <Button size="sm" variant="outline"><Eye className="h-3.5 w-3.5" /></Button>
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
