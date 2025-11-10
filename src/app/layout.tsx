
'use client';

import './globals.css';
import { AppHeader } from '@/components/app-header';
import { Toaster } from '@/components/ui/toaster';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noHeaderPaths = ['/', '/login'];
  const showHeader = !noHeaderPaths.includes(pathname);

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
        <div className="relative flex min-h-screen flex-col">
          {showHeader && <AppHeader />}
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
