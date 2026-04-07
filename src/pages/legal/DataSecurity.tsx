import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    items: [
      'Multi-tenant PostgreSQL database with enforced row-level security (RLS) on all tenant data tables.',
      'All data encrypted at rest using AES-256 encryption.',
      'All data encrypted in transit using TLS 1.3.',
      'Infrastructure hosted on Supabase, running on AWS with SOC 2 certified data centers.',
      'Application-level security with parameterized queries, input validation, and CSRF protection.',
    ],
  },
  {
    icon: Key,
    title: '2. Access Controls',
    items: [
      'Role-based access control (RBAC) with five distinct roles: Volunteer, Mentor, Case Manager, Program Lead, and Gardener (platform operator).',
      'Each role has precisely scoped permissions following the principle of least privilege.',
      'Multi-factor authentication (MFA) available for all accounts.',
      'Session management with configurable inactivity timeouts.',
      'IP allowlisting available on the Coalition plan for organizations requiring network-level restrictions.',
      'Password policies enforcing minimum complexity requirements.',
    ],
  },
  {
    icon: Eye,
    title: '3. Audit Logging',
    items: [
      'All data access events are logged with the user identity, timestamp, action performed, and affected records.',
      'Audit trails are exportable in standard formats for compliance reviews.',
      'Configurable retention periods for audit log data.',
      'Audit logs are immutable — they cannot be modified or deleted by tenant users.',
      'Gardener-level access to audit logs is separately logged for accountability.',
    ],
  },
  {
    icon: Shield,
    title: '4. CJIS Alignment',
    items: [
      'Encryption: AES-256 at rest, TLS 1.3 in transit, meeting CJIS encryption requirements.',
      'Access Control: Role-based permissions with least-privilege enforcement.',
      'Identification & Authentication: MFA support, session management, password complexity policies.',
      'Audit & Accountability: Comprehensive audit logging of all data access and modifications.',
      'Personnel Security: Background check support documentation, security awareness resources.',
      'Incident Response: Documented incident response plan with defined escalation procedures.',
      'Media Protection: Encrypted storage, secure data export controls.',
      'Physical Protection: AWS data center physical security (SOC 2 certified).',
      'Systems & Communications Protection: Network segmentation, firewall rules, intrusion detection.',
      'Information Integrity: Input validation, data integrity checks, backup verification.',
    ],
  },
  {
    icon: Lock,
    title: '5. 42 CFR Part 2',
    items: [
      'Substance use disorder (SUD) records are identified and protected per 42 CFR Part 2 requirements.',
      'Consent management features for tracking and managing SUD disclosure authorizations.',
      'Disclosure tracking to maintain records of all SUD information disclosures.',
      'Court order handling procedures documented and supported within the platform.',
      'Aligned with the HHS Final Rule (February 2026) consolidating Part 2 with HIPAA regulations.',
    ],
  },
  {
    icon: FileCheck,
    title: '6. HIPAA Security Rule',
    items: [
      'Administrative Safeguards: Security management processes, workforce security, information access management, security awareness training, contingency planning.',
      'Physical Safeguards: Facility access controls (via AWS), workstation security guidance, device and media controls.',
      'Technical Safeguards: Access controls, audit controls, integrity controls, transmission security.',
      'Business Associate Agreement (BAA) available upon request for HIPAA-covered organizations.',
    ],
  },
  {
    icon: Search,
    title: '7. Penetration Testing',
    items: [
      'Annual third-party penetration testing conducted by independent security firms.',
      'Findings remediated according to severity-based SLAs.',
      'Responsible disclosure program for security researchers.',
      'Summary results available to enterprise customers under NDA upon request.',
    ],
  },
  {
    icon: AlertTriangle,
    title: '8. Incident Response',
    items: [
      '24-hour notification commitment for confirmed data breaches affecting participant data.',
      'Documented incident response plan tested at least annually.',
      'Defined roles and responsibilities for incident response team members.',
      'Post-incident review process with lessons learned and corrective action tracking.',
      'Communication templates for timely, transparent notification to affected organizations.',
    ],
  },
  {
    icon: MapPin,
    title: '9. Data Residency',
    items: [
      'All primary data stored in US-based AWS data centers.',
      'No international data transfers without explicit written consent from the data-owning organization.',
      'Backup data stored in geographically separate US-based facilities for disaster recovery.',
      'Data residency documentation available for compliance reviews.',
    ],
  },
  {
    icon: Award,
    title: '10. Certifications & Assessments',
    items: [
      'SOC 2 Type II certification: in progress, with targeted completion in 2026.',
      'CJIS Security Policy: aligned with current policy requirements.',
      '42 CFR Part 2: compliant with the February 2026 HHS Final Rule.',
      'HIPAA: Security Rule safeguards implemented; BAA available.',
      'Annual security assessments conducted by independent third parties.',
      'Compliance documentation available to prospective and current customers upon request.',
    ],
  },
];

export default function DataSecurity() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-12 text-center">
        <h1 className="font-serif text-4xl font-bold text-red-900 mb-3">
          Data Security & Compliance
        </h1>
        <p className="text-red-950/50 text-sm max-w-2xl mx-auto">
          Technical security details for organizations conducting due diligence on the
          Resurrectio platform. We are committed to meeting the stringent requirements of
          criminal justice, behavioral health, and social services data protection.
        </p>
      </header>

      <div className="space-y-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} className="border-red-100">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="font-serif text-lg text-red-900">
                    {section.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-950/70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
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

      <div className="mt-8 text-center text-xs text-red-950/40">
        <p>&copy; {new Date().getFullYear()} Resurrectio. All rights reserved.</p>
      </div>
    </div>
  );
}
