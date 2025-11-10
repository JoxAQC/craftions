
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simula el inicio de sesión y redirige al dashboard
    router.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-center w-full">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
                  <Stethoscope className="h-7 w-7" />
                  <span>MediSim</span>
              </Link>
            </div>
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingrese sus credenciales para acceder a su cuenta.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@example.com"
                required
                defaultValue="doctor@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                defaultValue="password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit">
              Ingresar
            </Button>
            <p className="text-xs text-muted-foreground text-center">
                Al iniciar sesión, aceptas nuestros Términos de Servicio y Política de Privacidad.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
