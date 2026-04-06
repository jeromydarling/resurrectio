import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Maximize, Users, Home, Briefcase, GraduationCap, TrendingUp, Quote } from 'lucide-react';
import { mockStories, mockDashboardStats } from '@/data/mockData';

const stats = [
  { label: 'Active People', value: '127', icon: Users, color: 'text-purple-600' },
  { label: 'Housing Rate', value: '72%', icon: Home, color: 'text-emerald-600' },
  { label: 'Employment Rate', value: '68%', icon: Briefcase, color: 'text-blue-600' },
  { label: 'Program Completion', value: '83%', icon: GraduationCap, color: 'text-amber-600' },
];

export default function PresentationMode() {
  const story = mockStories[0];
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif">Ministry Impact Overview</h2>
          <p className="text-muted-foreground">Q1 2026 — Prepared for funder presentation</p>
        </div>
        <Button size="lg">
          <Maximize className="h-4 w-4 mr-2" /> Enter Fullscreen
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(stat => (
          <Card key={stat.label} className="text-center p-6">
            <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
            <div className="text-4xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <Quote className="h-5 w-5 text-primary" /> Transformation Story
          </CardTitle>
        </CardHeader>
        <CardContent>
          {story && (
            <div>
              <h3 className="text-lg font-serif font-medium mb-2">{story.title}</h3>
              <p className="text-muted-foreground leading-relaxed italic">"{story.fullStory}"</p>
              <p className="text-sm text-primary mt-3">— {story.personInitial}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: 'Milestones This Quarter', value: '47', trend: '+12%' },
          { label: 'Mentor Hours Logged', value: '892', trend: '+8%' },
          { label: 'Families Reconnected', value: '14', trend: '+23%' },
        ].map(metric => (
          <Card key={metric.label}>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
              <div className="text-sm text-emerald-600 flex items-center justify-center gap-1">
                <TrendingUp className="h-3 w-3" /> {metric.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
