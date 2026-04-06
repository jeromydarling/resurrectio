import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { mockBlogPosts } from '@/data/mockData';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

export default function Blog() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-red-950">Community Blog</h1>
        <p className="text-muted-foreground mt-1">Reflections, insights, and updates from our community</p>
      </div>

      <div className="space-y-5">
        {mockBlogPosts.map((post) => (
          <Card key={post.id} className="bg-white/80">
            <CardHeader className="pb-2">
              <CardTitle className="font-serif text-red-950 text-xl leading-snug">
                {post.title}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground pt-1">
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readTime} read</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
              <Separator className="mb-3" />
              <span className="flex items-center gap-1.5 text-sm font-medium text-red-800/50 cursor-default" title="Full articles coming soon">
                Full article coming soon <ArrowRight className="h-4 w-4" />
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
