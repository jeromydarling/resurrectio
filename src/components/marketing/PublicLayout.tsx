import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { brand } from '@/config/brand';
import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { ResurrectioLogo } from '@/components/brand/ResurrectioLogo';

const navLinks = [
  { label: 'Features', to: '/#features' },
  { label: 'Mission', to: '/#mission' },
  { label: 'Built For', to: '/#built-for' },
];

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/#features' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Security', to: '/security' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Mission', to: '/#mission' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms', to: '/terms' },
      { label: 'Privacy', to: '/privacy' },
    ],
  },
];

export default function PublicLayout({ children }: { children?: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f3]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-red-100 bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <ResurrectioLogo size={28} color="#991b1b" />
            <span className="font-serif text-xl font-bold text-red-900 tracking-tight">
              {brand.appName}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="text-red-950/60 hover:text-red-950 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-red-950/70 hover:text-red-950"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                size="sm"
                className="rounded-full bg-red-800 text-white hover:bg-red-900 px-5"
              >
                Get Started <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-red-950"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t border-red-100 bg-white px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="block text-sm font-medium text-red-950/70 py-1.5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 pt-3 border-t border-red-100">
              <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" size="sm" className="w-full rounded-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button
                  size="sm"
                  className="w-full rounded-full bg-red-800 text-white hover:bg-red-900"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1">
        {children ?? <Outlet />}
      </main>

      {/* Footer */}
      <footer className="border-t border-red-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand column */}
            <div className="col-span-2">
              <span className="font-serif text-lg font-bold text-red-900">
                {brand.appName}
              </span>
              <p className="mt-2 text-sm text-red-950/50 max-w-xs">
                {brand.tagline}
              </p>
              <p className="mt-1 text-xs text-red-950/40">
                Powered by CROS/NRI
              </p>
            </div>

            {/* Link columns */}
            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-wider text-red-950/40 mb-3">
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="text-sm text-red-950/50 hover:text-red-950 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-red-100 text-xs text-red-950/40">
            <span>&copy; {new Date().getFullYear()} {brand.appName}. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
