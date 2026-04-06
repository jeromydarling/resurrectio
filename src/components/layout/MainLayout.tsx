import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export interface MainLayoutProps {
  children: ReactNode;
  title: string;
  mobileTitle?: string;
  subtitle?: string;
  headerActions?: ReactNode;
  'data-testid'?: string;
}

export function MainLayout({ children, title, mobileTitle, subtitle, headerActions, 'data-testid': testId }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background" data-testid={testId}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64 min-h-screen flex flex-col transition-all duration-300">
        <Header
          title={title}
          mobileTitle={mobileTitle}
          subtitle={subtitle}
          onMenuClick={() => setSidebarOpen(true)}
          headerActions={headerActions}
        />
        <main id="main-content" className="flex-1 p-4 md:p-6 overflow-auto" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}
