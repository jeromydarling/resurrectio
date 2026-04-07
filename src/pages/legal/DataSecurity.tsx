import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  Lock,
  Eye,
  FileCheck,
  Server,
  Key,
  Search,
  AlertTriangle,
  MapPin,
  Award,
} from 'lucide-react';

const sections = [
  {
    icon: Shield,
    title: '1. Security Architecture',
    status: 'active',
    items: [
      'Multi-tenant PostgreSQL database with enforced row-level security (RLS) on all tenant data tables.',
      'All data encrypted at rest using AES-256 encryption (AWS default).',
      'All data encrypted in transit using TLS 1.3.',
      'Infrastructure hosted on Supabase, running on AWS with SOC 2 certified data centers.',
      'Application-level security with parameterized queries, input validation, and CSRF protection.',
    ],
  },
  {
    icon: Key,
    title: '2. Access Controls',
    status: 'active',
    items: [
      'Role-based access control (RBAC) with five distinct roles: Volunteer, Mentor, Case Manager, Program Lead, and Administrator.',
      'Each role has precisely scoped permissions following the principle of least privilege.',
      'Supabase Auth with secure session management and token refresh.',
      'Password policies enforcing minimum complexity requirements.',
    ],
    roadmap: [
      'Multi-factor authentication (MFA) — supported by Supabase, configuration in progress.',
      'Configurable inactivity timeouts — planned.',
      'IP allowlisting for enterprise organizations — planned for Coalition plan.',
    ],
  },
  {
    icon: Eye,
    title: '3. Audit Logging',
    status: 'active',
    items: [
      'Activity logging tracks user actions, touchpoints, and data modifications with timestamps.',
      'Case note history preserved with author attribution.',
      'NRI signal audit trail — every signal includes evidence and reasoning.',
    ],
    roadmap: [
      'Comprehensive data access audit logging (all reads/writes) — planned.',
      'Immutable audit trail with tamper-proof storage — planned.',
      'Exportable audit logs for compliance reviews — planned.',
    ],
  },
  {
    icon: Shield,
    title: '4. CJIS Alignment',
    status: 'partial',
    items: [
      'Encryption: AES-256 at rest, TLS 1.3 in transit — meets CJIS encryption requirements.',
      'Access Control: Role-based permissions with least-privilege enforcement.',
      'Identification & Authentication: Supabase Auth with session management.',
      'Physical Protection: AWS data center physical security (SOC 2 certified).',
      'Systems & Communications Protection: Network segmentation via Supabase infrastructure.',
    ],
    roadmap: [
      'Full CJIS Security Policy audit and gap assessment — planned.',
      'Personnel Security: background check documentation workflows — planned.',
      'CJIS-specific incident response procedures — planned.',
      'Organizations requiring full CJIS compliance should contact us to discuss their specific requirements.',
    ],
  },
  {
    icon: Lock,
    title: '5. 42 CFR Part 2',
    status: 'planned',
    items: [
      'Tenant-scoped data architecture ensures substance use disorder (SUD) records are isolated per organization.',
      'Role-based access controls limit who can view sensitive health information.',
    ],
    roadmap: [
      'Dedicated SUD record flagging and protection — planned.',
      'Consent management features for tracking disclosure authorizations — planned.',
      'Disclosure tracking and court order handling — planned.',
      'Full alignment with the February 2026 HHS Final Rule — in progress.',
    ],
  },
  {
    icon: FileCheck,
    title: '6. HIPAA',
    status: 'partial',
    items: [
      'Technical Safeguards: Access controls, encrypted storage, secure transmission via Supabase/AWS.',
      'Physical Safeguards: AWS facility controls (SOC 2 certified data centers).',
    ],
    roadmap: [
      'Business Associate Agreement (BAA) — available upon request, standard Supabase BAA applicable.',
      'Administrative Safeguards: formal security management processes — in development.',
      'Organizations handling PHI should contact us to discuss HIPAA-specific requirements.',
    ],
  },
  {
    icon: Search,
    title: '7. Security Testing',
    status: 'planned',
    items: [
      'Supabase infrastructure undergoes regular security assessments as part of their SOC 2 compliance.',
      'Application-level input validation and SQL injection prevention via parameterized queries.',
    ],
    roadmap: [
      'Annual third-party penetration testing — planned for 2026.',
      'Responsible disclosure program for security researchers — planned.',
      'Bug bounty program — under consideration.',
    ],
  },
  {
    icon: AlertTriangle,
    title: '8. Incident Response',
    status: 'planned',
    items: [
      'Supabase infrastructure monitoring and incident response is managed by the Supabase operations team.',
    ],
    roadmap: [
      'Documented application-level incident response plan — in development.',
      'Defined notification timelines for data breaches affecting participant data — planned.',
      'Post-incident review process — planned.',
      'We are committed to transparent, timely communication if a security event affects your data.',
    ],
  },
  {
    icon: MapPin,
    title: '9. Data Residency',
    status: 'active',
    items: [
      'All primary data stored in US-based AWS data centers.',
      'Supabase project configured for US region.',
      'No international data transfers without explicit consent.',
    ],
  },
  {
    icon: Award,
    title: '10. Certifications & Compliance Status',
    status: 'active',
    items: [
      'Supabase: SOC 2 Type II certified (infrastructure provider).',
      'Resurrectio application: built on SOC 2 certified infrastructure.',
      'CJIS Security Policy: partial alignment — encryption, access controls, physical security met via AWS.',
      '42 CFR Part 2: foundational protections in place, full compliance in progress.',
      'HIPAA: technical safeguards in place, BAA available via Supabase.',
    ],
    roadmap: [
      'Resurrectio application-level SOC 2 Type II — targeted for 2027.',
      'Full CJIS Security Policy assessment — planned.',
      'Independent security audit — planned for 2026.',
    ],
  },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  active: { label: 'Active', color: 'bg-green-100 text-green-800' },
  partial: { label: 'Partial', color: 'bg-amber-100 text-amber-800' },
  planned: { label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
};

export default function DataSecurity() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-12 text-center">
        <h1 className="font-serif text-4xl font-bold text-red-900 mb-3">
          Data Security & Compliance
        </h1>
        <p className="text-red-950/50 text-sm max-w-2xl mx-auto mb-4">
          Technical security details for organizations conducting due diligence on the
          Resurrectio platform. We believe in transparency — here's what's in place today
          and what's on our roadmap.
        </p>
        <div className="flex items-center justify-center gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500" /> Active — in production</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Partial — foundational measures in place</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> In Progress — on our roadmap</span>
        </div>
      </header>

      <div className="space-y-6">
        {sections.map((section) => {
          const Icon = section.icon;
          const status = statusLabels[section.status];
          return (
            <Card key={section.title} className="border-red-100">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="font-serif text-lg text-red-900 flex-1">
                    {section.title}
                  </CardTitle>
                  <Badge className={status.color}>{status.label}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-950/70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-400" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                {section.roadmap && section.roadmap.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-red-100">
                    <p className="text-xs font-medium text-blue-700 mb-2 uppercase tracking-wider">Roadmap</p>
                    <ul className="space-y-1.5">
                      {section.roadmap.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-blue-900/60">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 p-4 rounded-lg bg-red-50 border border-red-200 text-center">
        <p className="text-sm text-red-900 font-medium">
          For detailed security documentation, compliance questionnaire responses, or to
          schedule a security review, contact{' '}
          <a href="mailto:security@resurrectio.app" className="underline">
            security@resurrectio.app
          </a>
        </p>
      </div>

      <div className="mt-4 p-4 rounded-lg bg-amber-50 border border-amber-200 text-center">
        <p className="text-xs text-amber-800">
          Resurrectio is transparent about our security posture. Items marked "Active" are in production.
          Items marked "In Progress" are on our roadmap with planned timelines. We'd rather be honest
          about where we are than overpromise. If your organization has specific compliance requirements,
          contact us — we'll tell you exactly what we can and can't do today.
        </p>
      </div>

      <div className="mt-8 text-center text-xs text-red-950/40">
        <p>&copy; {new Date().getFullYear()} Resurrectio. All rights reserved.</p>
      </div>
    </div>
  );
}
