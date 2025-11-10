
import { Button } from '@/components/ui/button';
import { Stethoscope } from 'lucide-react';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center -mt-16">
      <Stethoscope className="w-24 h-24 text-primary mb-6" />
      <h1 className="text-5xl font-extrabold tracking-tight mb-4">
        Bienvenido a MediSim
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mb-8">
        Una plataforma moderna e intuitiva para la gestión médica. Simplifique la administración de su clínica, desde la agenda hasta el historial clínico.
      </p>
      <div className="flex gap-4">
        <Button size="lg" asChild>
          <Link href="/login">Iniciar Sesión</Link>
        </Button>
        <Button size="lg" variant="outline">
          Solicitar una Demo
        </Button>
      </div>
    </div>
  );
}
