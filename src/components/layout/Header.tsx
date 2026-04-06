import { ReactNode } from 'react';
import { Menu, LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  mobileTitle?: string;
  subtitle?: string;
  onMenuClick?: () => void;
  headerActions?: ReactNode;
}

export function Header({ title, mobileTitle, subtitle, onMenuClick, headerActions }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-card border-b border-border">
      <div className="h-16 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden shrink-0"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="min-w-0">
            <h1 className="text-lg font-semibold text-foreground truncate font-serif">
              <span className="hidden md:inline">{title}</span>
              <span className="md:hidden">{mobileTitle || title}</span>
            </h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {headerActions}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="font-normal">
                <p className="text-sm font-medium">Ministry Admin</p>
                <p className="text-xs text-muted-foreground">admin@resurrectio.app</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/login')}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
