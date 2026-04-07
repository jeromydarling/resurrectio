import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, MessageCircle, FileText, Video, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const helpSections = [
  {
    icon: BookOpen,
    title: 'Getting Started',
    description: 'Learn the basics of Resurrectio — tracking people, managing services, and using NRI signals.',
    action: 'View Guide',
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Detailed documentation for every feature, from journey mapping to compliance tracking.',
    action: 'Browse Docs',
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Watch step-by-step tutorials on mentor matching, report generation, and more.',
    action: 'Watch Videos',
  },
  {
    icon: MessageCircle,
    title: 'Community Forum',
    description: 'Connect with other reentry organizations and ministries using Resurrectio.',
    action: 'Join Forum',
  },
  {
    icon: Mail,
    title: 'Contact Support',
    description: 'Need help? Our team is here to support your organization.',
    action: 'Email Support',
  },
];

export default function Help() {
  return (
    <MainLayout title="Help & Support" subtitle="Resources to help you get the most from Resurrectio">
      <div className="max-w-3xl space-y-4">
        {helpSections.map((section) => (
          <Card key={section.title}>
            <CardContent className="flex items-start gap-4 p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <section.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-lg font-medium mb-1">{section.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{section.description}</p>
                <Button variant="outline" size="sm">
                  {section.action}
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
