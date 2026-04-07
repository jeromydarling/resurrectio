import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Heart,
  HandHeart,
  ClipboardList,
  Building2,
  Settings,
  Check,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { ResurrectioLogo } from '@/components/brand/ResurrectioLogo';

const TOTAL_STEPS = 5;

type Role = 'volunteer' | 'mentor' | 'case_manager' | 'program_lead' | 'administrator';

interface RoleOption {
  key: Role;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const roles: RoleOption[] = [
  {
    key: 'volunteer',
    label: 'Volunteer',
    description: 'I visit, write to, or support incarcerated people or returning citizens.',
    icon: Heart,
  },
  {
    key: 'mentor',
    label: 'Mentor',
    description: "I'm paired with a returning citizen and walk with them through reentry.",
    icon: HandHeart,
  },
  {
    key: 'case_manager',
    label: 'Case Manager',
    description: 'I coordinate housing, employment, compliance, and services for my caseload.',
    icon: ClipboardList,
  },
  {
    key: 'program_lead',
    label: 'Program Lead',
    description: 'I run a reentry program or organization and oversee staff and outcomes.',
    icon: Building2,
  },
  {
    key: 'administrator',
    label: 'Administrator',
    description: 'I manage the Resurrectio platform for my organization.',
    icon: Settings,
  },
];

const challengeOptions = [
  'Tracking people across multiple services (housing, employment, compliance)',
  'Coordinating with parole officers and courts',
  'Managing volunteer mentors',
  'Reporting outcomes to funders and government agencies',
  'Keeping families informed and supported',
  'Getting people essential documents (ID, SSN, birth certificate)',
  'Coordinating transportation',
  'Preventing recidivism through early warning signals',
  'Migrating data from spreadsheets or other systems',
];

const orgTypes = [
  'Prison Ministry',
  'Reentry Nonprofit',
  'Faith-Based Organization',
  'Government Agency',
  'Community Organization',
  'Coalition/Network',
  'Other',
];

const serveSizes = ['Under 25', '25-100', '100-500', '500+'];

const roleDestinations: Record<Role, { label: string; path: string }> = {
  case_manager: { label: 'Start by adding your first person', path: '/intake' },
  mentor: { label: 'Check your mentee assignments', path: '/mentor-matching' },
  program_lead: { label: 'See your dashboard', path: '/dashboard' },
  volunteer: { label: 'Explore the knowledge base', path: '/knowledge' },
  administrator: { label: 'Configure your workspace', path: '/settings' },
};

function ProgressIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => (
        <div
          key={i}
          className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
            i < currentStep
              ? 'bg-red-700'
              : i === currentStep
                ? 'bg-red-500'
                : 'bg-red-200'
          }`}
        />
      ))}
    </div>
  );
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // Step 2 state
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState('');
  const [stateRegion, setStateRegion] = useState('');
  const [serveCount, setServeCount] = useState('');

  // Step 3 state
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // Step 4 state
  const [challenges, setChallenges] = useState<Set<string>>(new Set());

  const toggleChallenge = (challenge: string) => {
    setChallenges((prev) => {
      const next = new Set(prev);
      if (next.has(challenge)) {
        next.delete(challenge);
      } else {
        next.add(challenge);
      }
      return next;
    });
  };

  const destination = selectedRole ? roleDestinations[selectedRole] : null;

  return (
    <div className="min-h-screen bg-background">
      <ProgressIndicator currentStep={step} />

      <div className="max-w-2xl mx-auto px-4 pb-16">
        {/* Step 1: Welcome */}
        {step === 0 && (
          <div className="flex flex-col items-center justify-center text-center pt-16">
            <ResurrectioLogo size={56} color="hsl(0, 72%, 35%)" />
            <h1 className="text-3xl md:text-4xl font-serif text-foreground mt-6 mb-3">
              Welcome to Resurrectio
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
              Let&rsquo;s set up your workspace. This takes about 3 minutes.
            </p>
            <Button
              size="lg"
              className="bg-red-700 hover:bg-red-800 text-white px-8"
              onClick={() => setStep(1)}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Step 2: About Your Organization */}
        {step === 1 && (
          <div className="pt-8">
            <h2 className="text-2xl font-serif text-foreground mb-1 text-center">
              About Your Organization
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Tell us a bit about who you are and who you serve.
            </p>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input
                  id="org-name"
                  placeholder="e.g. Hope Reentry Alliance"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Organization Type</Label>
                <Select value={orgType} onValueChange={setOrgType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {orgTypes.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="state-region">State / Region</Label>
                <Input
                  id="state-region"
                  placeholder="e.g. Texas, Midwest Region"
                  value={stateRegion}
                  onChange={(e) => setStateRegion(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Approximate number of people you serve annually</Label>
                <Select value={serveCount} onValueChange={setServeCount}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range..." />
                  </SelectTrigger>
                  <SelectContent>
                    {serveSizes.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <Button
                size="lg"
                className="bg-red-700 hover:bg-red-800 text-white px-8"
                onClick={() => setStep(2)}
                disabled={!orgName.trim() || !orgType}
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Your Role */}
        {step === 2 && (
          <div className="pt-8">
            <h2 className="text-2xl font-serif text-foreground mb-1 text-center">
              Your Role
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              How will you be using Resurrectio? Choose the role that best describes your work.
            </p>

            <div className="space-y-3">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.key;
                return (
                  <Card
                    key={role.key}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isSelected
                        ? 'border-2 border-red-600 shadow-md'
                        : 'border hover:border-red-300'
                    }`}
                    onClick={() => setSelectedRole(role.key)}
                  >
                    <CardContent className="flex items-center gap-4 py-4">
                      <div
                        className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-red-100' : 'bg-muted'
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            isSelected ? 'text-red-700' : 'text-muted-foreground'
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-semibold ${
                            isSelected ? 'text-red-700' : 'text-foreground'
                          }`}
                        >
                          {role.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {role.description}
                        </p>
                      </div>
                      {isSelected && (
                        <Check className="h-5 w-5 text-red-600 shrink-0" />
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-end mt-8">
              <Button
                size="lg"
                className="bg-red-700 hover:bg-red-800 text-white px-8"
                onClick={() => setStep(3)}
                disabled={!selectedRole}
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: What Matters Most */}
        {step === 3 && (
          <div className="pt-8">
            <h2 className="text-2xl font-serif text-foreground mb-1 text-center">
              What Matters Most
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              What are your biggest challenges? Select all that apply.
            </p>

            <div className="space-y-3">
              {challengeOptions.map((challenge) => (
                <label
                  key={challenge}
                  className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    checked={challenges.has(challenge)}
                    onCheckedChange={() => toggleChallenge(challenge)}
                    className="mt-0.5 border-red-300 data-[state=checked]:bg-red-700 data-[state=checked]:border-red-700"
                  />
                  <span className="text-sm text-foreground leading-snug">
                    {challenge}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex justify-end mt-8">
              <Button
                size="lg"
                className="bg-red-700 hover:bg-red-800 text-white px-8"
                onClick={() => setStep(4)}
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: You're Ready */}
        {step === 4 && (
          <div className="pt-8">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Check className="h-7 w-7 text-red-700" />
              </div>
              <h2 className="text-2xl font-serif text-foreground mb-2">
                Your workspace is ready.
              </h2>

              <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                {orgName && <Badge variant="secondary">{orgName}</Badge>}
                {selectedRole && (
                  <Badge variant="secondary">
                    {roles.find((r) => r.key === selectedRole)?.label}
                  </Badge>
                )}
                {challenges.size > 0 && (
                  <Badge variant="secondary">
                    {challenges.size} challenge{challenges.size !== 1 ? 's' : ''} selected
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-muted-foreground text-center mb-6">
              Here&rsquo;s what&rsquo;s waiting for you:
            </p>

            <div className="grid gap-4 sm:grid-cols-3 mb-10">
              <Card className="border-red-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-red-700">
                    Your Command Center
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs">
                    Daily focus, NRI signals, compliance deadlines
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-red-700">
                    People &amp; Journeys
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs">
                    Track returning citizens through restoration stages
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-red-700">
                    Your First Step
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs">
                    {destination
                      ? `${destination.label} → ${destination.path}`
                      : 'Get started with Resurrectio'}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-red-700 hover:bg-red-800 text-white px-8"
                onClick={() => navigate(destination?.path ?? '/dashboard')}
              >
                Go to {destination?.label ?? 'Dashboard'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
