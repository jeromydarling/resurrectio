import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Heart,
  Users,
  Map,
  FileText,
  Award,
  UserPlus,
  Briefcase,
  Home,
  Building2,
  Scale,
  GraduationCap,
  HandHeart,
  BookOpen,
  Calendar,
  Newspaper,
  Library,
  Globe,
  FolderOpen,
  BookMarked,
  Handshake,
  Activity,
  MapPin,
  ClipboardList,
  Brain,
  Sparkles,
  BarChart3,
  Presentation,
  Sprout,
  Settings,
  HelpCircle,
  ChevronDown,
  X,
  DollarSign,
  Package,
  Plug,
  PenSquare,
  CalendarDays,
  Send,
  PlusCircle,
  Upload,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { brand } from '@/config/brand';
import { ResurrectioLogo } from '@/components/brand/ResurrectioLogo';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavItem[];
}

const standaloneItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
];

const navGroups: NavGroup[] = [
  {
    label: 'Journeys',
    icon: Heart,
    items: [
      { label: 'People', href: '/people', icon: Users },
      { label: 'Journey Map', href: '/journey-map', icon: Map },
      { label: 'Case Notes', href: '/case-notes', icon: FileText },
      { label: 'Milestones', href: '/milestones', icon: Award },
      { label: 'Family', href: '/family', icon: UserPlus },
      { label: 'New Intake', href: '/intake', icon: ClipboardList },
    ],
  },
  {
    label: 'Services',
    icon: Briefcase,
    items: [
      { label: 'Service Coordination', href: '/services', icon: Handshake },
      { label: 'Housing', href: '/housing', icon: Home },
      { label: 'Employment', href: '/employment', icon: Building2 },
      { label: 'Compliance', href: '/compliance', icon: Scale },
      { label: 'Parole Scheduler', href: '/parole-scheduler', icon: CalendarDays },
      { label: 'Programs', href: '/programs', icon: GraduationCap },
      { label: 'Provisions', href: '/provisions', icon: Package },
    ],
  },
  {
    label: 'Community',
    icon: Users,
    items: [
      { label: 'Mentors', href: '/mentors', icon: HandHeart },
      { label: 'Mentor Matching', href: '/mentor-matching', icon: Users },
      { label: 'Stories', href: '/stories', icon: BookOpen },
      { label: 'Volunteers', href: '/volunteers', icon: Users },
      { label: 'Events', href: '/events', icon: Calendar },
      { label: 'Calendar', href: '/calendar', icon: CalendarDays },
      { label: 'Blog', href: '/blog', icon: Newspaper },
      { label: 'Knowledge Base', href: '/knowledge', icon: Library },
      { label: 'Communio', href: '/communio', icon: Globe },
      { label: 'Directory', href: '/directory', icon: FolderOpen },
      { label: 'Resources', href: '/resources', icon: BookMarked },
    ],
  },
  {
    label: 'Organize',
    icon: FolderOpen,
    items: [
      { label: 'Partners', href: '/partners', icon: Handshake },
      { label: 'Activities', href: '/activities', icon: Activity },
      { label: 'Territories', href: '/territories', icon: MapPin },
      { label: 'Templates', href: '/templates', icon: ClipboardList },
      { label: 'Grants', href: '/grants', icon: DollarSign },
      { label: 'Projects', href: '/projects', icon: FolderOpen },
      { label: 'Campaigns', href: '/campaigns', icon: Send },
      { label: 'Import Center', href: '/import', icon: Upload },
    ],
  },
  {
    label: 'Intelligence',
    icon: Brain,
    items: [
      { label: 'NRI Signals', href: '/signals', icon: Sparkles },
      { label: 'Reports', href: '/reports', icon: BarChart3 },
      { label: 'Presentation Mode', href: '/presentation', icon: Presentation },
      { label: 'Garden Pulse', href: '/garden-pulse', icon: Sprout },
      { label: 'Testimonium', href: '/testimonium', icon: BookOpen },
      { label: 'Impact Journal', href: '/impulsus', icon: PenSquare },
      { label: 'Government Reports', href: '/government-reports', icon: Building2 },
    ],
  },
];

const bottomItems: NavItem[] = [
  { label: 'Quick Add', href: '/quick-add', icon: PlusCircle },
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Help', href: '/help', icon: HelpCircle },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const [openGroup, setOpenGroup] = useState<string | null>('Journeys');

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))] flex flex-col transition-transform duration-300 shadow-sidebar',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[hsl(var(--sidebar-border))]">
          <Link to="/" className="flex items-center gap-2">
            <ResurrectioLogo size={28} color="#fca5a5" />
            <span className="font-serif text-lg font-semibold text-white tracking-tight">
              {brand.appName}
            </span>
          </Link>
          <button onClick={onClose} className="lg:hidden text-red-300 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {/* Standalone items */}
          {standaloneItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={cn('nav-item', isActive(item.href) ? 'nav-item-active' : 'nav-item-inactive')}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="pt-2" />

          {/* Grouped navigation */}
          {navGroups.map((group) => (
            <Collapsible
              key={group.label}
              open={openGroup === group.label}
              onOpenChange={(open) => setOpenGroup(open ? group.label : null)}
            >
              <CollapsibleTrigger className="w-full nav-item nav-item-inactive group">
                <group.icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 text-left">{group.label}</span>
                <ChevronDown className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
                  openGroup === group.label && 'rotate-180'
                )} />
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-4 space-y-0.5 pt-0.5">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      'nav-item text-[13px]',
                      isActive(item.href) ? 'nav-item-active' : 'nav-item-inactive'
                    )}
                  >
                    <item.icon className="h-3.5 w-3.5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </nav>

        {/* Bottom items */}
        <div className="px-3 py-3 border-t border-[hsl(var(--sidebar-border))] space-y-0.5">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={cn('nav-item', isActive(item.href) ? 'nav-item-active' : 'nav-item-inactive')}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
