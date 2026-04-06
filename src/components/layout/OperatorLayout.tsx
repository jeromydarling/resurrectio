/**
 * OperatorLayout — Gardener Console for the /operator routes.
 * Dark crimson sidebar with 3 zones: Content, Ecosystem, System.
 */
import { ReactNode, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Pen,
  Globe,
  Settings,
  FileText,
  Database,
  Search,
  Calendar,
  LayoutDashboard,
  Building2,
  Activity,
  Users,
  Megaphone,
  Wifi,
  Shield,
  Cog,
  Menu,
  X,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { ResurrectioLogo } from '@/components/brand/ResurrectioLogo';
import { Button } from '@/components/ui/button';
import { brand } from '@/config/brand';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ZoneItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Zone {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  items: ZoneItem[];
}

const zones: Zone[] = [
  {
    label: 'Content',
    icon: Pen,
    color: 'text-red-400',
    items: [
      { label: 'Content Studio', href: '/operator/content-studio', icon: FileText },
      { label: 'Source Manager', href: '/operator/sources', icon: Database },
      { label: 'SEO Dashboard', href: '/operator/seo', icon: Search },
      { label: 'Pub Calendar', href: '/operator/calendar', icon: Calendar },
    ],
  },
  {
    label: 'Ecosystem',
    icon: Globe,
    color: 'text-red-500',
    items: [
      { label: 'Overview', href: '/operator/overview', icon: LayoutDashboard },
      { label: 'Ministries', href: '/operator/ministries', icon: Building2 },
      { label: 'Ecosystem Pulse', href: '/operator/pulse', icon: Activity },
      { label: 'People', href: '/operator/people', icon: Users },
      { label: 'Announcements', href: '/operator/announcements', icon: Megaphone },
    ],
  },
  {
    label: 'System',
    icon: Settings,
    color: 'text-red-600',
    items: [
      { label: 'API Health', href: '/operator/api-health', icon: Wifi },
      { label: 'Moderation Queue', href: '/operator/moderation', icon: Shield },
      { label: 'Settings', href: '/operator/settings', icon: Cog },
    ],
  },
];

interface OperatorLayoutProps {
  children: ReactNode;
}

export function OperatorLayout({ children }: OperatorLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openZone, setOpenZone] = useState<string | null>('Ecosystem');

  const isActive = (href: string) => location.pathname === href;

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-red-900/50">
        <Link to="/operator/overview" className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            <ResurrectioLogo size={26} color="#fca5a5" />
          </div>
          <div>
            <span className="font-serif text-sm font-semibold text-white block leading-tight">
              {brand.appName}
            </span>
            <span className="text-[10px] text-red-500 uppercase tracking-wider">
              Gardener Console
            </span>
          </div>
        </Link>
        <button onClick={() => setMobileOpen(false)} className="lg:hidden text-red-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Zone Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
        {zones.map((zone) => (
          <Collapsible
            key={zone.label}
            open={openZone === zone.label}
            onOpenChange={(open) => setOpenZone(open ? zone.label : null)}
          >
            <CollapsibleTrigger className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-300 hover:bg-red-900/30 transition-colors">
              <zone.icon className={cn('h-4 w-4 shrink-0', zone.color)} />
              <span className="flex-1 text-left">{zone.label}</span>
              <ChevronDown className={cn(
                'h-3.5 w-3.5 transition-transform duration-200 text-red-500',
                openZone === zone.label && 'rotate-180'
              )} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 space-y-0.5 pt-0.5">
              {zone.items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors',
                    isActive(item.href)
                      ? 'bg-red-800/50 text-white'
                      : 'text-red-400/80 hover:bg-red-900/30 hover:text-red-300'
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

      {/* Footer */}
      <div className="px-3 py-3 border-t border-red-900/50">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400/80 hover:bg-red-900/30 hover:text-red-300 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Back to App</span>
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-[#450a0a] flex flex-col transition-transform duration-300',
          'lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-sm font-medium text-gray-600 uppercase tracking-wider">
            Gardener Console
          </h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
