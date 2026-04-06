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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { brand } from '@/config/brand';

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

const TENANT_SLUG = 'ministry';

function tp(path: string) {
  return `/${TENANT_SLUG}${path}`;
}

const standaloneItems: NavItem[] = [
  { label: 'Dashboard', href: tp('/dashboard'), icon: LayoutDashboard },
];

const navGroups: NavGroup[] = [
  {
    label: 'Journeys',
    icon: Heart,
    items: [
      { label: 'People', href: tp('/people'), icon: Users },
      { label: 'Journey Map', href: tp('/journey-map'), icon: Map },
      { label: 'Case Notes', href: tp('/case-notes'), icon: FileText },
      { label: 'Milestones', href: tp('/milestones'), icon: Award },
      { label: 'Family', href: tp('/family'), icon: UserPlus },
    ],
  },
  {
    label: 'Services',
    icon: Briefcase,
    items: [
      { label: 'Service Coordination', href: tp('/services'), icon: Handshake },
      { label: 'Housing', href: tp('/housing'), icon: Home },
      { label: 'Employment', href: tp('/employment'), icon: Building2 },
      { label: 'Compliance', href: tp('/compliance'), icon: Scale },
      { label: 'Programs', href: tp('/programs'), icon: GraduationCap },
    ],
  },
  {
    label: 'Community',
    icon: Users,
    items: [
      { label: 'Mentors', href: tp('/mentors'), icon: HandHeart },
      { label: 'Stories', href: tp('/stories'), icon: BookOpen },
      { label: 'Events', href: tp('/events'), icon: Calendar },
      { label: 'Blog', href: tp('/blog'), icon: Newspaper },
      { label: 'Knowledge Base', href: tp('/knowledge'), icon: Library },
      { label: 'Communio', href: tp('/communio'), icon: Globe },
      { label: 'Directory', href: tp('/directory'), icon: FolderOpen },
      { label: 'Resources', href: tp('/resources'), icon: BookMarked },
    ],
  },
  {
    label: 'Organize',
    icon: FolderOpen,
    items: [
      { label: 'Partners', href: tp('/partners'), icon: Handshake },
      { label: 'Activities', href: tp('/activities'), icon: Activity },
      { label: 'Territories', href: tp('/territories'), icon: MapPin },
      { label: 'Templates', href: tp('/templates'), icon: ClipboardList },
    ],
  },
  {
    label: 'Intelligence',
    icon: Brain,
    items: [
      { label: 'NRI Signals', href: tp('/signals'), icon: Sparkles },
      { label: 'Reports', href: tp('/reports'), icon: BarChart3 },
      { label: 'Presentation Mode', href: tp('/presentation'), icon: Presentation },
      { label: 'Garden Pulse', href: tp('/garden-pulse'), icon: Sprout },
    ],
  },
];

const bottomItems: NavItem[] = [
  { label: 'Settings', href: tp('/settings'), icon: Settings },
  { label: 'Help', href: tp('/help'), icon: HelpCircle },
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
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Sprout className="h-5 w-5 text-purple-300" />
            </div>
            <span className="font-serif text-lg font-semibold text-white tracking-tight">
              {brand.appName}
            </span>
          </Link>
          <button onClick={onClose} className="lg:hidden text-purple-300 hover:text-white">
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
