import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockStories } from '@/data/mockData';
import { STAGE_LABELS, STAGE_COLORS } from '@/types/resurrectio';
import { BookOpen, Calendar } from 'lucide-react';

export default function Stories() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-purple-900">Transformation Stories</h1>
        <p className="text-muted-foreground mt-1">Testimonies of hope, resilience, and restoration</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockStories.map((story) => (
          <Card key={story.id} className="bg-white/80 flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">
                    {story.personInitial.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-800">{story.personInitial}</p>
                    <Badge className={`${STAGE_COLORS[story.stage]} text-[10px]`}>
                      {STAGE_LABELS[story.stage]}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardTitle className="font-serif text-purple-900 text-lg leading-snug">
                {story.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                {story.excerpt}
              </p>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <Calendar className="h-3 w-3" />
                  <span>Shared {new Date(story.dateShared).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {story.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-[10px] text-purple-700 border-purple-200">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Full Story
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
