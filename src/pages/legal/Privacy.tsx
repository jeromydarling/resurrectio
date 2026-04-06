import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Eye,
  ClipboardList,
  Settings,
  Database,
  ShieldCheck,
  Lock,
  Heart,
  Trash2,
  Server,
  UserCheck,
  Baby,
  MapPin,
  RefreshCw,
  Mail,
} from 'lucide-react';

const sections = [
  {
    icon: Eye,
    title: '1. Overview',
    content:
      'Resurrectio is built for organizations serving people with criminal justice involvement. We take privacy seriously because the people in your system are among the most vulnerable to data misuse. This Privacy Policy describes how we collect, use, store, and protect information processed through the Resurrectio platform. We are committed to the highest standards of data protection in the criminal justice, behavioral health, and social services domains.',
  },
  {
    icon: ClipboardList,
    title: '2. What We Collect',
    content: [
      'We collect the following categories of information:',
      '',
      'Account Information: Organization name, administrator email addresses, billing details, and user profile information.',
      '',
      'Participant Data: Information entered by your organization about the individuals you serve, including names, demographics, case notes, service records, milestones, and outcomes.',
      '',
      'Usage Analytics: Anonymized, aggregated usage data to improve platform performance and features.',
      '',
      'We do NOT collect: Social Security Numbers (these should be stored locally only and never entered into Resurrectio), biometric data, or genetic information.',
    ].join('\n'),
  },
  {
    icon: Settings,
    title: '3. How We Use Data',
    content: [
      'We use your data solely for the following purposes:',
      '',
      'To provide and operate the Resurrectio service.',
      'To generate NRI (Narrative Relational Intelligence) signals within your tenant only.',
      'To produce reports, dashboards, and data exports you request.',
      'To improve the platform using anonymized, aggregated analytics only.',
      '',
      'We NEVER: sell your data to third parties, share individual participant data with anyone outside your organization, use participant data for advertising or marketing purposes, or train AI models on your organization\'s data.',
    ].join('\n'),
  },
  {
    icon: Database,
    title: '4. Data Architecture',
    content:
      'Resurrectio operates on a multi-tenant architecture with strict row-level security (RLS) enforced at the database level. Each organization\'s data is logically isolated — no organization can access another\'s records. The platform operator (Gardener role) can view aggregate ecosystem metrics such as total active participants and service utilization rates, but cannot access individual participant records. Our database infrastructure is built on Supabase PostgreSQL with enforced RLS policies on every table containing tenant data.',
  },
  {
    icon: ShieldCheck,
    title: '5. 42 CFR Part 2 Compliance',
    content:
      'Substance use disorder (SUD) records entered into Resurrectio are protected under 42 CFR Part 2, the federal regulation governing confidentiality of substance use disorder patient records. We do not disclose SUD records without proper written consent from the individual or a valid court order meeting the requirements of Part 2. Our platform supports consent management workflows to help your organization comply with Part 2 requirements. Our February 2026 alignment with the HHS Final Rule consolidating 42 CFR Part 2 with HIPAA is complete.',
  },
  {
    icon: Lock,
    title: '6. CJIS Security Policy',
    content:
      'Organizations using Resurrectio to access or store criminal justice information (CJI) must maintain compliance with the FBI\'s Criminal Justice Information Services (CJIS) Security Policy. Resurrectio supports CJIS requirements including: encryption at rest (AES-256) and in transit (TLS 1.3), role-based access controls with least-privilege principles, comprehensive audit logging of all data access, personnel security awareness training resources, and documented incident response procedures.',
  },
  {
    icon: Heart,
    title: '7. HIPAA',
    content:
      'Resurrectio can be used in HIPAA-covered workflows involving Protected Health Information (PHI). We offer a Business Associate Agreement (BAA) upon request for organizations that require one. PHI within Resurrectio is encrypted at rest and in transit, access-controlled via role-based permissions, and protected by audit logging in accordance with the HIPAA Security Rule\'s administrative, physical, and technical safeguard requirements.',
  },
  {
    icon: Trash2,
    title: '8. Data Retention & Deletion',
    content:
      'Your data is retained for as long as your account remains active, plus 90 days after account termination to allow for data export. You may request full data deletion at any time by contacting us in writing. Upon receiving a deletion request, all primary data is removed promptly and backup copies are purged within 30 days. We will provide written confirmation when deletion is complete.',
  },
  {
    icon: Server,
    title: '9. Subprocessors',
    content:
      'We use the following subprocessors to deliver the Resurrectio service: Supabase (database hosting, authentication, and file storage), Stripe (payment processing), and Resend (transactional email delivery). Each subprocessor is bound by data processing agreements. A full, current list of subprocessors is available upon request by contacting privacy@resurrectio.app.',
  },
  {
    icon: UserCheck,
    title: '10. Your Rights',
    content: [
      'You and the individuals your organization serves have the following rights regarding data in Resurrectio:',
      '',
      'Access: View all data associated with your organization at any time.',
      'Export: Download all your data in CSV format for portability.',
      'Deletion: Request complete removal of your data from our systems.',
      'Correction: Update or correct inaccurate records.',
      'Audit: Review who has accessed participant records through our comprehensive audit log.',
    ].join('\n'),
  },
  {
    icon: Baby,
    title: "11. Children's Privacy",
    content:
      'We do not knowingly collect personal information from individuals under the age of 13. Organizations operating youth reentry programs that serve minors must ensure compliance with the Children\'s Online Privacy Protection Act (COPPA) and the Family Educational Rights and Privacy Act (FERPA) as applicable. If we become aware that data has been collected from a child under 13 without proper consent, we will take steps to delete that information.',
  },
  {
    icon: MapPin,
    title: '12. State Privacy Laws',
    content:
      'Resurrectio complies with applicable state privacy laws, including but not limited to: the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), the Virginia Consumer Data Protection Act (VCDPA), the Colorado Privacy Act (CPA), and other state privacy laws as they take effect. Residents of these states may exercise their rights under applicable law by contacting privacy@resurrectio.app.',
  },
  {
    icon: RefreshCw,
    title: '13. Changes',
    content:
      'We will provide at least 30 days advance notice before making material changes to this Privacy Policy. Notice will be sent via email to all active account administrators. The effective date at the top of this policy will be updated to reflect the most recent revision. Previous versions are available upon request.',
  },
  {
    icon: Mail,
    title: '14. Contact',
    content:
      'For privacy-related questions or requests: privacy@resurrectio.app. Data Protection Officer: dpo@resurrectio.app. Mailing address available upon request.',
  },
];

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-12 text-center">
        <h1 className="font-serif text-4xl font-bold text-red-900 mb-3">
          Resurrectio Privacy Policy
        </h1>
        <p className="text-red-950/50 text-sm">
          Effective: April 2026
        </p>
      </header>

      <div className="p-4 mb-8 rounded-lg bg-red-50 border border-red-200">
        <p className="text-sm text-red-900 font-medium text-center">
          Resurrectio handles criminal justice, substance abuse, and sensitive personal data.
          This policy reflects our commitment to the highest standards of data protection
          for the most vulnerable populations.
        </p>
      </div>

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
                <p className="text-sm leading-relaxed text-red-950/70 whitespace-pre-line">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 text-center text-xs text-red-950/40">
        <p>&copy; {new Date().getFullYear()} CROS LLC. All rights reserved.</p>
      </div>
    </div>
  );
}
