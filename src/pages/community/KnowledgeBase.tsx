import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { mockKnowledgeBaseArticles } from '@/data/mockData';
import type { KnowledgeBaseArticle } from '@/types/resurrectio';
import { Scale, Home, Briefcase, Heart, BookOpen, FileText } from 'lucide-react';

const categories = [
  { key: 'legal_rights', label: 'Legal Rights', icon: Scale },
  { key: 'housing_resources', label: 'Housing Resources', icon: Home },
  { key: 'employment_tips', label: 'Employment Tips', icon: Briefcase },
  { key: 'family_reconciliation', label: 'Family Reconciliation', icon: Heart },
  { key: 'spiritual_formation', label: 'Spiritual Formation', icon: BookOpen },
] as const;

const grouped = categories.map((cat) => ({
  ...cat,
  articles: mockKnowledgeBaseArticles.filter(
    (a: KnowledgeBaseArticle) => a.category === cat.key
  ),
}));

export default function KnowledgeBase() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-purple-900">Knowledge Base</h1>
        <p className="text-muted-foreground mt-1">Resource library for returning citizens and their support network</p>
      </div>

      <div className="space-y-6">
        {grouped.map((section) => (
          <Card key={section.key} className="bg-white/80">
            <CardHeader>
              <CardTitle className="font-serif text-purple-900 flex items-center gap-2">
                <section.icon className="h-5 w-5 text-purple-600" />
                {section.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {section.articles.map((article, idx) => (
                <div key={article.id}>
                  <div className="flex items-start gap-3 py-3 group cursor-pointer hover:bg-purple-50/50 rounded-md px-2 -mx-2 transition-colors">
                    <FileText className="h-4 w-4 mt-0.5 text-purple-400 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-purple-900 group-hover:text-purple-700">
                        {article.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {article.description}
                      </p>
                    </div>
                  </div>
                  {idx < section.articles.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
