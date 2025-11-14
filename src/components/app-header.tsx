
import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { SidebarTrigger } from './ui/sidebar';

export function AppHeader() {
  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/agenda', label: 'Agenda' },
    { href: '/templates/create', label: 'Gestión de Plantillas' },
  ];

  return (
    <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden"/>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-xl font-bold text-primary"
            >
              <Stethoscope className="h-7 w-7" />
              <span className="hidden sm:inline">MediSim</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Button variant="ghost" asChild key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
            <Button variant="ghost" asChild>
                <Link href="/consultation">Consulta</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
