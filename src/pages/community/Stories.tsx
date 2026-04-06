import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockStories } from '@/data/mockData';
import { STAGE_LABELS, STAGE_COLORS } from '@/types/resurrectio';
import { BookOpen, Calendar, ChevronUp } from 'lucide-react';

export default function Stories() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">Testimonies of hope, resilience, and restoration</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockStories.map((story) => {
          const isExpanded = expandedId === story.id;
          return (
            <Card key={story.id} className="bg-white/80 flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-red-200 flex items-center justify-center text-red-800 font-bold text-sm">
                      {story.personInitial.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-red-900">{story.personInitial}</p>
                      <Badge className={`${STAGE_COLORS[story.stage]} text-[10px]`}>
                        {STAGE_LABELS[story.stage]}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardTitle className="font-serif text-red-950 text-lg leading-snug">
                  {story.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isExpanded ? story.fullStory : story.excerpt}
                </p>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <Calendar className="h-3 w-3" />
                    <span>Shared {new Date(story.dateShared).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {story.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px] text-red-800 border-red-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-red-300 text-red-800 hover:bg-red-50"
                    size="sm"
                    onClick={() => setExpandedId(isExpanded ? null : story.id)}
                  >
                    {isExpanded ? (
                      <><ChevronUp className="h-4 w-4 mr-2" />Collapse</>
                    ) : (
                      <><BookOpen className="h-4 w-4 mr-2" />Read Full Story</>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
