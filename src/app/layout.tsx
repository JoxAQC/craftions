
'use client';

import './globals.css';
import { AppHeader } from '@/components/app-header';
import { Toaster } from '@/components/ui/toaster';
import { usePathname } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarInset, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { Stethoscope, LayoutDashboard, Calendar, FileText, Users } from 'lucide-react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noHeaderPaths = ['/', '/login'];
  const showSidebar = !noHeaderPaths.includes(pathname);

  const isAuthPage = noHeaderPaths.includes(pathname);

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/agenda', label: 'Agenda', icon: Calendar },
    { href: '/patients', label: 'Pacientes', icon: Users },
    { href: '/templates/create', label: 'Plantillas', icon: FileText },
  ];

  return (
    <html lang="es" className="dark">
      <head>
        <title>MediSim</title>
        <meta name="description" content="Prototipo de Plataforma Web de Gestión Médica" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased min-h-screen bg-background text-foreground">
        {isAuthPage ? (
          <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#0c2a44_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <main className="flex-1 w-full flex flex-col items-center justify-center">
              {children}
            </main>
          </div>
        ) : (
          <SidebarProvider>
            <div className="flex h-full w-full">
              <Sidebar>
                <SidebarContent>
                  <div className="flex flex-col gap-2 p-2">
                    <div className="flex items-center gap-2 p-2 text-xl font-bold text-primary">
                        <Stethoscope className="h-7 w-7" />
                        <span className="group-data-[collapsible=icon]:hidden">MediSim</span>
                    </div>
                  </div>
                  <SidebarMenu>
                    {navLinks.map((link) => (
                      <SidebarMenuItem key={link.href}>
                         <Link href={link.href}>
                           <SidebarMenuButton isActive={pathname.startsWith(link.href)} tooltip={link.label}>
                             <link.icon/>
                             <span>{link.label}</span>
                           </SidebarMenuButton>
                         </Link>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarContent>
              </Sidebar>
              <div className="flex-1 flex flex-col">
                <header className="bg-card border-b sticky top-0 z-40 shadow-sm p-2 flex items-center gap-2">
                    <SidebarTrigger className="md:hidden"/>
                    <h2 className="text-lg font-semibold ml-2">MediSim</h2>
                </header>
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        )}
        <Toaster />
      </body>
    </html>
  );
}
