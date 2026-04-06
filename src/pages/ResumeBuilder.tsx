import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FileText,
  Download,
  Copy,
  Mail,
  Save,
  Sparkles,
  Lightbulb,
  HelpCircle,
  User,
  Phone,
  MapPin,
  Wrench,
  Briefcase,
  GraduationCap,
  Target,
  ArrowLeft,
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { mockPeople } from '@/data/mockData';

/* ── skill tags ──────────────────────────────────────────────────── */

const SKILL_TAGS = [
  'Construction',
  'Cooking/Food Service',
  'Automotive',
  'Warehouse',
  'Cleaning/Maintenance',
  'Landscaping',
  'Customer Service',
  'Computer Skills',
  'Welding',
  'Electrical',
  'Plumbing',
  'Carpentry',
  'Forklift Operation',
  'CDL/Driving',
  'Retail',
  'Office/Admin',
];

const EDUCATION_OPTIONS = [
  'Some High School',
  'GED',
  'High School Diploma',
  'Some College',
  "Associate's",
  "Bachelor's",
  'Trade School',
];

const SCHEDULE_OPTIONS = [
  'Full-time',
  'Part-time',
  'Flexible',
  'Overnight/early morning',
];

/* ── mock pre-filled resume ──────────────────────────────────────── */

const mockResume = {
  name: 'MARCUS JOHNSON',
  location: 'Chicago, IL',
  phone: '(312) 555-0147',
  email: 'marcus.j@email.com',
  summary:
    'Dependable and hardworking professional with experience in construction, warehouse operations, and food service. Certified in OSHA 10-Hour Safety. Strong work ethic developed through 3 years of institutional food service management serving 200+ daily. Currently employed at Rivera Construction with excellent attendance record.',
  skills: [
    'Construction & General Labor',
    'Warehouse Operations',
    'Food Preparation & Service',
    'Inventory Management',
    'OSHA Safety Compliance',
    'Forklift Operation',
    'Team Coordination',
    'Problem Solving',
    'Reliable & Punctual',
  ],
  certifications: [
    { name: 'OSHA 10-Hour Safety Certification', year: '2026' },
    { name: 'ServSafe Food Handler', year: '2025' },
    { name: 'Forklift Operator Certification', year: '2026' },
  ],
  experience: [
    {
      title: 'Construction Laborer',
      company: 'Rivera Construction LLC',
      dates: 'March 2026 – Present',
      bullets: [
        'Assist with residential and commercial construction projects',
        'Maintain job site safety and cleanliness per OSHA standards',
        'Operate power tools and light equipment',
      ],
    },
    {
      title: 'Food Service Worker',
      company: 'Institutional Food Service',
      dates: '2023 – 2025',
      bullets: [
        'Prepared meals for 200+ individuals daily',
        'Managed food inventory and supply ordering',
        'Maintained kitchen sanitation and safety standards',
        'Trained 4 new team members on food prep procedures',
      ],
    },
  ],
  education: [
    'GED — Completed 2024',
    'Fabrica Guild Course — 16-Week Skilled Trades Program, 2026',
  ],
};

/* ── component ───────────────────────────────────────────────────── */

export default function ResumeBuilder() {
  const [searchParams] = useSearchParams();
  const personIdFromUrl = searchParams.get('person');
  const selectedPerson = personIdFromUrl ? mockPeople.find(p => p.id === personIdFromUrl) : null;
  const [selectedPersonId, setSelectedPersonId] = useState<string>(personIdFromUrl || '');

  const activePerson = selectedPersonId ? mockPeople.find(p => p.id === selectedPersonId) : selectedPerson;

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    cityState: '',
    strengths: '',
    selectedSkills: [] as string[],
    certifications: '',
    workExperience: '',
    education: '',
    trainingPrograms: '',
    goalWork: '',
    schedule: '',
  });

  const toggleSkill = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skill)
        ? prev.selectedSkills.filter((s) => s !== skill)
        : [...prev.selectedSkills, skill],
    }));
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-8 w-8 text-red-200" />
            <h1 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Resume Builder
            </h1>
          </div>
          <p className="max-w-3xl text-lg text-red-100 leading-relaxed">
            A resume shouldn't be a barrier. This tool turns a 5-minute
            conversation into a professional document — leading with what
            someone can do, not where they've been.
          </p>
        </div>
      </div>

      {/* ── Person selector ──────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium whitespace-nowrap">Building resume for:</Label>
            <Select value={selectedPersonId} onValueChange={setSelectedPersonId}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select a person..." />
              </SelectTrigger>
              <SelectContent>
                {mockPeople.map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.firstName} {p.lastName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {activePerson && (
            <Link to={`/people/${activePerson.id}`} className="text-sm text-red-800 hover:text-red-600 hover:underline flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" />
              Back to {activePerson.firstName}'s profile
            </Link>
          )}
        </div>
      </div>

      {/* ── Two-panel layout ───────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* ── Left panel: Questionnaire ──────────────────────────── */}
          <div className="space-y-6">
            <Card className="border-red-200">
              <CardHeader className="pb-4">
                <CardTitle className="font-serif text-xl text-red-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-red-600" />
                  Resume Questionnaire
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* 1. Basic Information */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-semibold text-stone-800 flex items-center gap-2">
                    <User className="h-4 w-4 text-red-600" />
                    1. Basic Information
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        placeholder="Marcus Johnson"
                        value={form.fullName}
                        onChange={(e) =>
                          updateField('fullName', e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-1">
                        <Phone className="h-3 w-3" /> Phone
                      </Label>
                      <Input
                        id="phone"
                        placeholder="(312) 555-0147"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email{' '}
                        <span className="text-muted-foreground text-xs">
                          (optional)
                        </span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="marcus.j@email.com"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="cityState"
                        className="flex items-center gap-1"
                      >
                        <MapPin className="h-3 w-3" /> City/State
                      </Label>
                      <Input
                        id="cityState"
                        placeholder="Chicago, IL"
                        value={form.cityState}
                        onChange={(e) =>
                          updateField('cityState', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* 2. Skills & Strengths */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-semibold text-stone-800 flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-red-600" />
                    2. Skills & Strengths
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="strengths">
                      What are you good at? What do people come to you for?
                    </Label>
                    <Textarea
                      id="strengths"
                      rows={3}
                      placeholder="I'm good with my hands. People always ask me to fix things. I'm reliable and I show up on time."
                      value={form.strengths}
                      onChange={(e) =>
                        updateField('strengths', e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Quick-select skills</Label>
                    <div className="flex flex-wrap gap-2">
                      {SKILL_TAGS.map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                            form.selectedSkills.includes(skill)
                              ? 'border-red-600 bg-red-600 text-white'
                              : 'border-stone-300 bg-white text-stone-600 hover:border-red-300 hover:bg-red-50'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certifications">Any certifications?</Label>
                    <Textarea
                      id="certifications"
                      rows={2}
                      placeholder="OSHA 10, ServSafe, CDL, welding cert, etc."
                      value={form.certifications}
                      onChange={(e) =>
                        updateField('certifications', e.target.value)
                      }
                    />
                  </div>
                </div>

                <Separator />

                {/* 3. Work Experience */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-semibold text-stone-800 flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-red-600" />
                    3. Work Experience
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="workExperience">
                      Describe any jobs you've held — inside or outside. What
                      did you do? What did you learn?
                    </Label>
                    <Textarea
                      id="workExperience"
                      rows={5}
                      placeholder="I worked in the kitchen at Stateville for 3 years. I learned food prep, inventory management, and how to cook for 200 people. Before that, I did landscaping for my uncle's company for 2 summers."
                      value={form.workExperience}
                      onChange={(e) =>
                        updateField('workExperience', e.target.value)
                      }
                    />
                  </div>
                </div>

                <Separator />

                {/* 4. Education & Training */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-semibold text-stone-800 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-red-600" />
                    4. Education & Training
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="education">Highest education</Label>
                    <Select
                      value={form.education}
                      onValueChange={(v) => updateField('education', v)}
                    >
                      <SelectTrigger id="education">
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        {EDUCATION_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trainingPrograms">
                      Any training programs completed?
                    </Label>
                    <Textarea
                      id="trainingPrograms"
                      rows={2}
                      placeholder="Fabrica guild course, GED prep, anger management, financial literacy"
                      value={form.trainingPrograms}
                      onChange={(e) =>
                        updateField('trainingPrograms', e.target.value)
                      }
                    />
                  </div>
                </div>

                <Separator />

                {/* 5. Goals */}
                <div className="space-y-4">
                  <h3 className="font-serif text-lg font-semibold text-stone-800 flex items-center gap-2">
                    <Target className="h-4 w-4 text-red-600" />
                    5. Goals
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="goalWork">
                      What kind of work are you looking for?
                    </Label>
                    <Textarea
                      id="goalWork"
                      rows={2}
                      placeholder="Construction, warehouse, anything where I can work with my hands and stay busy."
                      value={form.goalWork}
                      onChange={(e) =>
                        updateField('goalWork', e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule">Preferred schedule</Label>
                    <Select
                      value={form.schedule}
                      onValueChange={(v) => updateField('schedule', v)}
                    >
                      <SelectTrigger id="schedule">
                        <SelectValue placeholder="Select preferred schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        {SCHEDULE_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-red-700 hover:bg-red-800 text-white text-lg py-6"
                  onClick={() =>
                    toast.success(
                      'Resume generated! In production, AI drafts the professional summary and organizes your experience.',
                    )
                  }
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Resume
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* ── Right panel: Resume Preview ─────────────────────────── */}
          <div className="space-y-4">
            <Card className="border-red-200">
              <CardHeader className="pb-4">
                <CardTitle className="font-serif text-xl text-red-900 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-red-600" />
                  Resume Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Printed-page look */}
                <div className="rounded-lg border border-stone-200 bg-white p-8 shadow-md">
                  {/* Name */}
                  <h2 className="text-center font-serif text-2xl font-bold tracking-wide text-stone-900">
                    {mockResume.name}
                  </h2>
                  <p className="mt-1 text-center text-sm text-stone-600">
                    {mockResume.location} | {mockResume.phone} |{' '}
                    {mockResume.email}
                  </p>

                  <Separator className="my-4" />

                  {/* Professional Summary */}
                  <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-red-800">
                    Professional Summary
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-700">
                    {mockResume.summary}
                  </p>

                  <Separator className="my-4" />

                  {/* Core Skills */}
                  <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-red-800">
                    Core Skills
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    {mockResume.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-sm text-stone-700 before:mr-1 before:content-['•']"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  {/* Certifications */}
                  <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-red-800">
                    Certifications
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {mockResume.certifications.map((cert) => (
                      <li
                        key={cert.name}
                        className="text-sm text-stone-700"
                      >
                        <span className="mr-1">•</span>
                        {cert.name} — {cert.year}
                      </li>
                    ))}
                  </ul>

                  <Separator className="my-4" />

                  {/* Work Experience */}
                  <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-red-800">
                    Work Experience
                  </h3>
                  <div className="mt-3 space-y-4">
                    {mockResume.experience.map((job) => (
                      <div key={job.title}>
                        <p className="text-sm font-semibold text-stone-800">
                          <em>{job.title}</em> — {job.company}
                        </p>
                        <p className="text-xs text-stone-500">{job.dates}</p>
                        <ul className="mt-1 space-y-0.5">
                          {job.bullets.map((b) => (
                            <li key={b} className="text-sm text-stone-700">
                              <span className="mr-1">•</span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  {/* Education */}
                  <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-red-800">
                    Education
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {mockResume.education.map((edu) => (
                      <li key={edu} className="text-sm text-stone-700">
                        {edu}
                      </li>
                    ))}
                  </ul>

                  <Separator className="my-4" />

                  {/* References */}
                  <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-red-800">
                    References
                  </h3>
                  <p className="mt-2 text-sm text-stone-600 italic">
                    Available upon request
                  </p>
                </div>

                {/* Action buttons */}
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-700 hover:bg-red-50"
                    onClick={() =>
                      toast.success('PDF download started (demo)')
                    }
                  >
                    <Download className="mr-1.5 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-700 hover:bg-red-50"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        'Resume text copied (demo)',
                      );
                      toast.success('Resume text copied to clipboard');
                    }}
                  >
                    <Copy className="mr-1.5 h-4 w-4" />
                    Copy Text
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-700 hover:bg-red-50"
                    onClick={() =>
                      toast.success('Email dialog opened (demo)')
                    }
                  >
                    <Mail className="mr-1.5 h-4 w-4" />
                    Email to Person
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-200 text-red-700 hover:bg-red-50"
                    onClick={() => {
                      const name = activePerson ? `${activePerson.firstName} ${activePerson.lastName}` : 'this person';
                      toast.success(`Resume saved to ${name}'s profile`);
                    }}
                  >
                    <Save className="mr-1.5 h-4 w-4" />
                    {activePerson ? `Save to ${activePerson.firstName}'s Profile` : 'Save to Profile'}
                  </Button>
                </div>

                {/* Production note */}
                <p className="mt-4 rounded-lg bg-red-50 border border-red-100 p-3 text-sm text-stone-600 italic">
                  This resume was generated from a 5-minute questionnaire. In
                  production, Resurrectio connects to AI to draft the
                  professional summary and organize experience — the person
                  reviews, adjusts, and owns it.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ── Bottom: Tips ─────────────────────────────────────────── */}
        <div className="mt-8">
          <Card className="border-red-200 bg-red-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="font-serif text-xl text-red-900 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-red-600" />
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="flex items-center gap-2 font-serif font-semibold text-stone-800">
                    <HelpCircle className="h-4 w-4 text-red-600" />
                    Why skills-based format?
                  </h4>
                  <p className="text-sm leading-relaxed text-stone-600">
                    A functional resume leads with what someone CAN do, not a
                    chronological history. It's the recommended format for
                    anyone with employment gaps, career changes, or
                    non-traditional work experience.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="flex items-center gap-2 font-serif font-semibold text-stone-800">
                    <HelpCircle className="h-4 w-4 text-red-600" />
                    What about the gap?
                  </h4>
                  <p className="text-sm leading-relaxed text-stone-600">
                    You don't need to explain gaps. Focus on skills, training,
                    and what you bring to the job. Many employers who hire
                    returning citizens already know — they're looking for who
                    you are now.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
