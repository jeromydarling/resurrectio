import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { archetypes } from '@/config/brand';
import { Heart, HandHeart, ClipboardList, Building2, Sprout } from 'lucide-react';
import { brand } from '@/config/brand';

const archetypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  volunteer: Heart,
  mentor: HandHeart,
  case_manager: ClipboardList,
  program_lead: Building2,
  gardener: Sprout,
};

export default function Onboarding() {
  const navigate = useNavigate();

  const handleSelect = (key: string) => {
    if (key === 'gardener') {
      navigate('/operator/overview');
    } else {
      navigate('/ministry/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sprout className="h-7 w-7 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-3">
          Welcome to {brand.appName}
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          How will you be using Resurrectio? Choose the role that best describes your work.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
        {Object.entries(archetypes).map(([key, arch]) => {
          const Icon = archetypeIcons[key] || Heart;
          return (
            <Card
              key={key}
              className="cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all duration-200 group"
              onClick={() => handleSelect(key)}
            >
              <CardHeader className="text-center pb-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-serif">{arch.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-sm">
                  {arch.tagline}
                </CardDescription>
                <Button variant="outline" className="mt-4 w-full group-hover:bg-primary group-hover:text-white transition-colors">
                  Select
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
