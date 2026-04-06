import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Scale,
  Home,
  Briefcase,
  Heart,
  BookOpen,
  FileText,
  Search,
  ShieldCheck,
  Pill,
  Brain,
  GraduationCap,
  DollarSign,
  Car,
  Vote,
  Apple,
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  description: string;
}

const categories = [
  { key: 'legal_rights', label: 'Legal Rights', icon: Scale },
  { key: 'housing', label: 'Housing', icon: Home },
  { key: 'employment', label: 'Employment', icon: Briefcase },
  { key: 'benefits', label: 'Benefits', icon: Apple },
  { key: 'family', label: 'Family', icon: Heart },
  { key: 'parole_probation', label: 'Parole & Probation', icon: ShieldCheck },
  { key: 'substance_recovery', label: 'Substance Recovery', icon: Pill },
  { key: 'mental_health', label: 'Mental Health', icon: Brain },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'financial_literacy', label: 'Financial Literacy', icon: DollarSign },
  { key: 'drivers_license', label: "Driver's License", icon: Car },
  { key: 'civic_participation', label: 'Civic Participation', icon: Vote },
] as const;

const articles: Article[] = [
  // Legal Rights
  {
    id: 'legal-1',
    title: 'Know Your Rights After Incarceration',
    category: 'legal_rights',
    description:
      'A plain-language overview of constitutional protections, anti-discrimination laws, and legal resources available to returning citizens navigating life after release.',
  },
  {
    id: 'legal-2',
    title: 'Record Expungement and Sealing',
    category: 'legal_rights',
    description:
      'Step-by-step guidance on determining eligibility for expungement or record sealing, including state-specific timelines, required documents, and how to file a petition.',
  },
  {
    id: 'legal-3',
    title: 'Voting Rights Restoration',
    category: 'legal_rights',
    description:
      'Explains how voting rights vary by state after a felony conviction, with instructions on how to check eligibility and re-register to vote.',
  },

  // Housing
  {
    id: 'housing-1',
    title: 'Finding Housing with a Criminal Record',
    category: 'housing',
    description:
      'Practical strategies for apartment searching with a record, including fair housing protections, how to address background checks, and landlord negotiation tips.',
  },
  {
    id: 'housing-2',
    title: 'Section 8 and Housing Vouchers',
    category: 'housing',
    description:
      'An overview of federally-assisted housing programs, eligibility criteria for people with criminal histories, and how to apply for Section 8 or local housing vouchers.',
  },
  {
    id: 'housing-3',
    title: 'Tenant Rights and Protections',
    category: 'housing',
    description:
      'Covers lease agreements, eviction protections, habitability standards, and how to report housing discrimination or unsafe conditions.',
  },

  // Employment
  {
    id: 'employment-1',
    title: 'Ban-the-Box Laws and Fair Chance Hiring',
    category: 'employment',
    description:
      'Explains ban-the-box legislation that delays criminal history inquiries during hiring, and how to leverage fair chance policies when applying for jobs.',
  },
  {
    id: 'employment-2',
    title: 'Work Opportunity Tax Credit (WOTC) for Employers',
    category: 'employment',
    description:
      'How returning citizens can highlight the WOTC program to prospective employers, which offers significant tax credits for hiring people with felony convictions.',
  },
  {
    id: 'employment-3',
    title: 'Job Readiness Checklist',
    category: 'employment',
    description:
      'A comprehensive checklist covering resume preparation, interview skills, obtaining identification documents, and building professional references after incarceration.',
  },

  // Benefits
  {
    id: 'benefits-1',
    title: 'SNAP and Food Stamps Eligibility',
    category: 'benefits',
    description:
      'Covers current SNAP eligibility rules for people with felony convictions, how recent policy changes have expanded access, and step-by-step application guidance.',
  },
  {
    id: 'benefits-2',
    title: 'Medicaid Enrollment After Release',
    category: 'benefits',
    description:
      'Explains how to enroll in Medicaid upon release, including new pre-release enrollment initiatives and how to ensure continuity of care for ongoing treatments.',
  },
  {
    id: 'benefits-3',
    title: 'SSI and SSDI After Incarceration',
    category: 'benefits',
    description:
      'How to reinstate Supplemental Security Income or Social Security Disability benefits after release, including expedited reinstatement options and application tips.',
  },

  // Family
  {
    id: 'family-1',
    title: 'Child Custody and Reunification',
    category: 'family',
    description:
      'Guidance on navigating the family court system, understanding custody rights after incarceration, and building a reunification plan that prioritizes the child\'s well-being.',
  },
  {
    id: 'family-2',
    title: 'Protective Orders and Visitation Rights',
    category: 'family',
    description:
      'Explains how protective orders affect visitation, steps to modify court orders, and how to demonstrate rehabilitation to regain supervised or unsupervised contact.',
  },
  {
    id: 'family-3',
    title: 'Family Counseling Resources',
    category: 'family',
    description:
      'A curated list of family therapy programs, relationship rebuilding workshops, and support groups designed for families affected by incarceration.',
  },

  // Parole & Probation
  {
    id: 'parole-1',
    title: 'Understanding Your Parole Conditions',
    category: 'parole_probation',
    description:
      'A clear breakdown of common parole conditions, reporting requirements, travel restrictions, and how to maintain compliance while rebuilding your life.',
  },
  {
    id: 'parole-2',
    title: 'Handling Parole Violations',
    category: 'parole_probation',
    description:
      'What to do if you face a potential violation, including your rights at hearings, how to work with your parole officer, and strategies for avoiding revocation.',
  },
  {
    id: 'parole-3',
    title: 'Early Termination of Parole or Probation',
    category: 'parole_probation',
    description:
      'Eligibility criteria and petition process for early termination, including how demonstrated compliance and community contributions can support your case.',
  },

  // Substance Recovery
  {
    id: 'recovery-1',
    title: 'Finding AA/NA Meetings in Your Area',
    category: 'substance_recovery',
    description:
      'How to locate Alcoholics Anonymous or Narcotics Anonymous meetings nearby, what to expect at your first meeting, and how peer support groups aid long-term recovery.',
  },
  {
    id: 'recovery-2',
    title: 'Medication-Assisted Treatment (MAT)',
    category: 'substance_recovery',
    description:
      'An overview of MAT options including methadone, buprenorphine, and naltrexone — how to access treatment, insurance coverage, and what to discuss with your provider.',
  },
  {
    id: 'recovery-3',
    title: 'Sober Living and Transitional Housing',
    category: 'substance_recovery',
    description:
      'How sober living homes work, what to look for in a quality program, and how transitional housing bridges the gap between release and independent living.',
  },

  // Mental Health
  {
    id: 'mental-1',
    title: 'Accessing Mental Health Services After Release',
    category: 'mental_health',
    description:
      'How to connect with community mental health centers, sliding-scale therapy, and peer support specialists, including tips for continuity of care from facility to community.',
  },
  {
    id: 'mental-2',
    title: 'Crisis Hotlines and Emergency Resources',
    category: 'mental_health',
    description:
      'Essential crisis numbers including 988 Suicide & Crisis Lifeline, Crisis Text Line, and SAMHSA helpline, with guidance on when and how to use them.',
  },
  {
    id: 'mental-3',
    title: 'Trauma-Informed Care for Returning Citizens',
    category: 'mental_health',
    description:
      'Understanding how incarceration-related trauma affects mental health and daily functioning, and how to find providers who practice trauma-informed approaches.',
  },

  // Education
  {
    id: 'education-1',
    title: 'GED and High School Equivalency Programs',
    category: 'education',
    description:
      'Where to find free or low-cost GED preparation classes, testing locations, and study resources specifically designed for adult learners and returning citizens.',
  },
  {
    id: 'education-2',
    title: 'Pell Grant Restoration and Financial Aid',
    category: 'education',
    description:
      'Explains the restored Pell Grant eligibility for incarcerated and formerly incarcerated students, FAFSA application guidance, and scholarship opportunities.',
  },
  {
    id: 'education-3',
    title: 'College Programs for Returning Citizens',
    category: 'education',
    description:
      'Highlights colleges and universities with dedicated support programs, second-chance admissions policies, and campus resources for students with criminal records.',
  },

  // Financial Literacy
  {
    id: 'finance-1',
    title: 'Opening a Bank Account with a Record',
    category: 'financial_literacy',
    description:
      'How to open a checking or savings account, navigate ChexSystems reports, and find banks and credit unions with second-chance banking programs.',
  },
  {
    id: 'finance-2',
    title: 'Credit Repair and Building Credit',
    category: 'financial_literacy',
    description:
      'Steps to check your credit report for free, dispute errors, begin building positive credit history, and understand how old debts and fines affect your score.',
  },
  {
    id: 'finance-3',
    title: 'Avoiding Predatory Lending and Scams',
    category: 'financial_literacy',
    description:
      'How to identify payday loan traps, predatory auto financing, and reentry-related scams, with alternatives for accessing fair and affordable financial services.',
  },

  // Driver's License
  {
    id: 'license-1',
    title: "Driver's License Reinstatement Process",
    category: 'drivers_license',
    description:
      'A state-by-state overview of license reinstatement requirements, including clearing suspensions, paying outstanding fines, and completing mandated courses.',
  },
  {
    id: 'license-2',
    title: 'SR-22 Insurance Requirements',
    category: 'drivers_license',
    description:
      'What SR-22 insurance is, when it is required, how to obtain it affordably, and how long you need to maintain the filing to restore full driving privileges.',
  },
  {
    id: 'license-3',
    title: 'Driving Restrictions and Hardship Licenses',
    category: 'drivers_license',
    description:
      'Explains restricted or hardship driving permits that allow work and essential travel, eligibility requirements, and how to petition the court or DMV.',
  },

  // Civic Participation
  {
    id: 'civic-1',
    title: 'Voting Rights by State',
    category: 'civic_participation',
    description:
      'A comprehensive guide to felony disenfranchisement laws state by state, including which states restore rights automatically and which require a petition or waiting period.',
  },
  {
    id: 'civic-2',
    title: 'Jury Service Eligibility After Conviction',
    category: 'civic_participation',
    description:
      'Explains federal and state rules on jury duty eligibility for people with felony records, including restoration pathways and how to respond to a jury summons.',
  },
  {
    id: 'civic-3',
    title: 'Community Engagement and Civic Leadership',
    category: 'civic_participation',
    description:
      'Opportunities for returning citizens to contribute through volunteer work, advocacy organizations, reentry coalitions, and local government advisory boards.',
  },
];

const categoryColorMap: Record<string, string> = {
  legal_rights: 'bg-red-100 text-red-800',
  housing: 'bg-amber-100 text-amber-800',
  employment: 'bg-blue-100 text-blue-800',
  benefits: 'bg-green-100 text-green-800',
  family: 'bg-pink-100 text-pink-800',
  parole_probation: 'bg-slate-100 text-slate-800',
  substance_recovery: 'bg-red-100 text-red-800',
  mental_health: 'bg-indigo-100 text-indigo-800',
  education: 'bg-teal-100 text-teal-800',
  financial_literacy: 'bg-yellow-100 text-yellow-800',
  drivers_license: 'bg-orange-100 text-orange-800',
  civic_participation: 'bg-emerald-100 text-emerald-800',
};

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredArticles = useMemo(() => {
    let result = articles;
    if (activeCategory) {
      result = result.filter((a) => a.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [searchQuery, activeCategory]);

  const grouped = useMemo(() => {
    return categories
      .map((cat) => ({
        ...cat,
        articles: filteredArticles.filter((a) => a.category === cat.key),
      }))
      .filter((section) => section.articles.length > 0);
  }, [filteredArticles]);

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        A comprehensive resource library for case managers and returning
        citizens -- practical guidance for every step of the reentry journey.
      </p>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search articles by title or keyword..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            activeCategory === null
              ? 'bg-red-900 text-white'
              : 'bg-red-50 text-red-800 hover:bg-red-100'
          }`}
        >
          All Topics
        </button>
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.key}
              onClick={() =>
                setActiveCategory(activeCategory === cat.key ? null : cat.key)
              }
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeCategory === cat.key
                  ? 'bg-red-900 text-white'
                  : 'bg-red-50 text-red-800 hover:bg-red-100'
              }`}
            >
              <Icon className="h-3 w-3" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredArticles.length} of {articles.length} articles
        {activeCategory &&
          ` in ${categories.find((c) => c.key === activeCategory)?.label}`}
        {searchQuery.trim() && ` matching "${searchQuery}"`}
      </p>

      {/* Articles grouped by category */}
      <div className="space-y-6">
        {grouped.length === 0 && (
          <Card className="bg-white/80">
            <CardContent className="py-12 text-center">
              <BookOpen className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">
                No articles match your search. Try a different keyword or clear
                the filters.
              </p>
            </CardContent>
          </Card>
        )}

        {grouped.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.key} className="bg-white/80">
              <CardHeader>
                <CardTitle className="font-serif text-red-950 flex items-center gap-2">
                  <Icon className="h-5 w-5 text-red-700" />
                  {section.label}
                  <Badge
                    variant="secondary"
                    className={categoryColorMap[section.key] ?? ''}
                  >
                    {section.articles.length}{' '}
                    {section.articles.length === 1 ? 'article' : 'articles'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {section.articles.map((article, idx) => (
                  <div key={article.id}>
                    <div className="flex items-start gap-3 py-3 group cursor-pointer hover:bg-red-50/50 rounded-md px-2 -mx-2 transition-colors">
                      <FileText className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-950 group-hover:text-red-800">
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
          );
        })}
      </div>
    </div>
  );
}
