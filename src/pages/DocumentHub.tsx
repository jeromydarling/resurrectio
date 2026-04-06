/**
 * Document Hub — Cloud-connected document management.
 *
 * WHAT: Central document management connecting to Google Drive and Dropbox.
 * WHERE: /document-hub
 * WHY: Documents live where they already live. Resurrectio indexes, organizes,
 *       and connects them to people. NRI learns your organization's voice.
 */

import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Cloud,
  HardDrive,
  FileText,
  File,
  Image,
  FolderOpen,
  Upload,
  CheckCircle,
  Sparkles,
  ClipboardList,
  Scale,
  Briefcase,
  Home,
  BarChart3,
  Heart,
  ArrowRight,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Inline mock data                                                   */
/* ------------------------------------------------------------------ */

interface CloudConnection {
  provider: string;
  icon: typeof Cloud;
  connected: boolean;
  account?: string;
  storageUsed?: string;
  storageTotal?: string;
  lastSync?: string;
}

const cloudConnections: CloudConnection[] = [
  {
    provider: 'Google Drive',
    icon: Cloud,
    connected: true,
    account: 'ministry@stvincent-reentry.org',
    storageUsed: '2.4 GB',
    storageTotal: '15 GB',
    lastSync: '2 minutes ago',
  },
  {
    provider: 'Dropbox',
    icon: HardDrive,
    connected: false,
  },
];

type FileIcon = 'pdf' | 'docx' | 'image';

interface PersonFile {
  name: string;
  type: FileIcon;
  modified: string;
}

interface PersonFolder {
  id: string;
  name: string;
  href: string;
  fileCount: number;
  recentFiles: PersonFile[];
}

const personFolders: PersonFolder[] = [
  {
    id: 'person-1',
    name: 'Marcus Johnson',
    href: '/people/person-1',
    fileCount: 12,
    recentFiles: [
      { name: 'Resume_Marcus_Johnson_2026.pdf', type: 'pdf', modified: '2 days ago' },
      { name: 'OSHA_10_Certificate.pdf', type: 'pdf', modified: '1 month ago' },
      { name: 'Case_Plan_Q1_2026.docx', type: 'docx', modified: '1 week ago' },
      { name: 'Birth_Certificate_Application.pdf', type: 'pdf', modified: '3 weeks ago' },
      { name: 'Parole_Conditions.pdf', type: 'pdf', modified: '2 months ago' },
    ],
  },
  {
    id: 'person-2',
    name: 'Denise Williams',
    href: '/people/person-2',
    fileCount: 8,
    recentFiles: [
      { name: 'GED_Certificate.pdf', type: 'pdf', modified: '1 week ago' },
      { name: 'Housing_Application.pdf', type: 'pdf', modified: '3 days ago' },
      { name: 'Resume_Draft.docx', type: 'docx', modified: '5 days ago' },
    ],
  },
  {
    id: 'person-3',
    name: 'Anthony Brown',
    href: '/people/person-3',
    fileCount: 5,
    recentFiles: [
      { name: 'Intake_Form.pdf', type: 'pdf', modified: '1 day ago' },
      { name: 'Release_Documents.pdf', type: 'pdf', modified: '2 weeks ago' },
      { name: 'ID_Application.pdf', type: 'pdf', modified: '4 days ago' },
    ],
  },
  {
    id: 'person-4',
    name: 'Robert Davis',
    href: '/people/person-4',
    fileCount: 15,
    recentFiles: [
      { name: 'Employer_Reference_Letter.pdf', type: 'pdf', modified: '3 days ago' },
      { name: 'Cooperative_Application.pdf', type: 'pdf', modified: '1 week ago' },
      { name: 'Tax_Forms_2025.pdf', type: 'pdf', modified: '2 weeks ago' },
    ],
  },
];

interface TemplateCategory {
  name: string;
  icon: typeof ClipboardList;
  count: number;
  templates: string[];
}

const templateCategories: TemplateCategory[] = [
  {
    name: 'Intake & Assessment',
    icon: ClipboardList,
    count: 4,
    templates: ['Intake Form', 'Risk Assessment', 'Needs Assessment', 'Goals Worksheet'],
  },
  {
    name: 'Legal & Compliance',
    icon: Scale,
    count: 3,
    templates: ['Parole Conditions Template', 'Court Order Summary', 'Expungement Checklist'],
  },
  {
    name: 'Employment',
    icon: Briefcase,
    count: 3,
    templates: ['Resume Template', 'Job Application Cover Letter', 'WOTC Employer Packet'],
  },
  {
    name: 'Housing',
    icon: Home,
    count: 3,
    templates: ['Housing Application', 'Lease Review Checklist', 'Section 8 Voucher Guide'],
  },
  {
    name: 'Reporting',
    icon: BarChart3,
    count: 3,
    templates: ['Monthly Case Summary', 'Quarterly Funder Report', 'PIRL Data Worksheet'],
  },
  {
    name: 'Ministry',
    icon: Heart,
    count: 2,
    templates: ['Mentor Agreement', 'Volunteer Background Check Form'],
  },
];

const nriBullets = [
  'Draft case notes that sound like your team wrote them',
  'Generate funder reports in your organization\'s narrative style',
  'Suggest document templates based on similar situations',
  'Flag inconsistencies between case plans and actual services delivered',
  'Auto-tag and organize new uploads into the right person\'s folder',
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fileIconFor(type: FileIcon) {
  switch (type) {
    case 'pdf':
      return FileText;
    case 'docx':
      return File;
    case 'image':
      return Image;
    default:
      return FileText;
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DocumentHub() {
  return (
    <div className="space-y-10">
      {/* ---- Top description ---- */}
      <Card className="border-red-200 bg-red-50/40">
        <CardContent className="pt-6">
          <p className="text-gray-700 leading-relaxed text-[15px]">
            Your documents live where they already live — Google Drive or Dropbox.
            Resurrectio indexes, organizes, and connects them to the people they belong to.
            Over time, NRI learns how your organization speaks.
          </p>
        </CardContent>
      </Card>

      {/* ---- Section 1: Cloud Storage Connection ---- */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-semibold text-gray-900">Cloud Storage Connection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cloudConnections.map((conn) => (
            <Card key={conn.provider} className="border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <conn.icon className="h-5 w-5 text-red-700" />
                    </div>
                    <CardTitle className="font-serif text-lg">{conn.provider}</CardTitle>
                  </div>
                  {conn.connected ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                      Not Connected
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {conn.connected ? (
                  <>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Connected account</span>
                        <span className="font-medium text-gray-900">{conn.account}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Storage used</span>
                        <span className="font-medium text-gray-900">
                          {conn.storageUsed} of {conn.storageTotal}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: '16%' }}
                        />
                      </div>
                      <div className="flex justify-between">
                        <span>Last sync</span>
                        <span className="font-medium text-gray-900 flex items-center gap-1">
                          <RefreshCw className="h-3 w-3 text-green-600" />
                          {conn.lastSync}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2 border-red-200 text-red-700 hover:bg-red-50">
                      Manage Connection
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-500">
                      Store and sync documents via Dropbox Business
                    </p>
                    <Button size="sm" className="w-full bg-red-700 hover:bg-red-800 text-white">
                      Connect Dropbox
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ---- Section 2: Person Documents ---- */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-semibold text-gray-900">Person Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personFolders.map((folder) => (
            <Card key={folder.id} className="border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-red-100 flex items-center justify-center">
                      <FolderOpen className="h-4 w-4 text-red-700" />
                    </div>
                    <div>
                      <Link
                        to={folder.href}
                        className="font-serif text-base font-semibold text-red-800 hover:text-red-900 hover:underline"
                      >
                        {folder.name}
                      </Link>
                      <p className="text-xs text-gray-500">{folder.fileCount} files</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Recent files</p>
                <ul className="space-y-1.5">
                  {folder.recentFiles.map((file) => {
                    const Icon = fileIconFor(file.type);
                    return (
                      <li key={file.name} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-gray-700 truncate">
                          <Icon className="h-3.5 w-3.5 text-red-500 shrink-0" />
                          <span className="truncate">{file.name}</span>
                        </span>
                        <span className="text-xs text-gray-400 shrink-0 ml-2">{file.modified}</span>
                      </li>
                    );
                  })}
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-2 border-red-200 text-red-700 hover:bg-red-50">
                  <FolderOpen className="h-3.5 w-3.5 mr-1.5" />
                  Open Folder
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ---- Section 3: Shared Library ---- */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-semibold text-gray-900">Shared Library</h2>
        <p className="text-sm text-gray-500">Organization-wide document templates</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templateCategories.map((cat) => (
            <Card key={cat.name} className="border-gray-200">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-red-100 flex items-center justify-center">
                    <cat.icon className="h-4 w-4 text-red-700" />
                  </div>
                  <div>
                    <CardTitle className="font-serif text-base">{cat.name}</CardTitle>
                    <CardDescription>{cat.count} templates</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="space-y-1">
                  {cat.templates.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="h-3 w-3 text-red-400 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-2 border-red-200 text-red-700 hover:bg-red-50">
                  View Templates
                  <ExternalLink className="h-3 w-3 ml-1.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ---- Section 4: NRI Document Intelligence ---- */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-semibold text-gray-900">NRI Document Intelligence</h2>
        <div className="rounded-xl border-2 border-transparent bg-gradient-to-r from-red-50 via-white to-red-50 p-[2px]">
          <div
            className="rounded-[10px] bg-white p-0"
            style={{
              background: 'linear-gradient(135deg, rgba(254,226,226,0.3) 0%, rgba(255,255,255,1) 40%, rgba(254,226,226,0.2) 100%)',
            }}
          >
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="font-serif text-lg">NRI Learns How You Speak</CardTitle>
                    <CardDescription className="mt-1">
                      As your team uploads case notes, reports, and correspondence, NRI learns your
                      organization's voice — your vocabulary, your tone, your way of describing progress.
                      Over time, it can help:
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {nriBullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <ArrowRight className="h-3.5 w-3.5 text-red-600 mt-0.5 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="rounded-lg bg-red-50 border border-red-100 p-3 space-y-1">
                  <p className="text-sm font-medium text-gray-800">
                    NRI has analyzed <span className="text-red-700 font-semibold">847 documents</span> across
                    your organization. Narrative voice model:{' '}
                    <span className="text-red-700 font-semibold">78% confidence</span>.
                  </p>
                </div>

                <p className="text-xs text-gray-400 italic">
                  NRI never shares document content across tenant boundaries. Your voice model is yours alone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ---- Bottom: Upload Section ---- */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-semibold text-gray-900">Upload Documents</h2>
        <div className="border-2 border-dashed border-red-300 rounded-xl p-10 text-center hover:border-red-400 hover:bg-red-50/30 transition-colors cursor-pointer">
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <Upload className="h-6 w-6 text-red-700" />
            </div>
            <p className="text-base font-medium text-gray-700">Drop files here or click to upload</p>
            <p className="text-sm text-gray-500 max-w-md">
              Files are synced to your connected cloud storage and automatically linked to the
              relevant person's profile
            </p>
            <p className="text-xs text-gray-400">Supported: PDF, DOCX, XLSX, JPG, PNG (max 25MB)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
