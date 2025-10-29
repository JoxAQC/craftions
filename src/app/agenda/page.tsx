'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Clock, User, Stethoscope } from 'lucide-react';
import Link from 'next/link';

// Datos simulados de citas
const appointments = [
  {
    id: 'apt1',
    time: '09:00',
    patient: 'Juan Pérez',
    type: 'Consulta Nueva',
    doctor: 'Dr. García',
    href: '/consultation',
    isControl: false,
  },
  {
    id: 'apt2',
    time: '10:30',
    patient: 'María Gómez',
    type: 'Control Diabetes',
    doctor: 'Dr. Rodríguez',
    href: '/controls/start/ctrl_123',
    isControl: true,
  },
  {
    id: 'apt3',
    time: '11:00',
    patient: 'Carlos López',
    type: 'Consulta General',
    doctor: 'Dr. García',
    href: '/consultation',
    isControl: false,
  },
  {
    id: 'apt4',
    time: '14:00',
    patient: 'Ana Torres',
    type: 'Control Post-Operatorio',
    doctor: 'Dra. Martínez',
    href: '/controls/start/ctrl_456',
    isControl: true,
  },
];

export default function AgendaPage() {
  const today = new Date();
  const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' });
  const dayMonth = today.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Agenda / Calendario</h1>
          <p className="text-muted-foreground">
            Vista semanal de citas programadas.
          </p>
        </div>
        <Button asChild>
          <Link href="/appointments/create">
            <PlusCircle className="mr-2" />
            Agendar Nueva Cita
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="capitalize">
            Citas para Hoy: {dayName}, {dayMonth}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.map((apt) => (
              <Link href={apt.href} key={apt.id}>
                <div className={`p-4 rounded-lg border h-full flex flex-col cursor-pointer transition-all hover:shadow-lg hover:border-primary ${apt.isControl ? 'bg-blue-900/10 border-blue-500/30' : 'bg-secondary/50'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-xl font-bold">{apt.time}</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <p className="font-semibold text-lg">{apt.type}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{apt.patient}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Stethoscope className="w-4 h-4" />
                      <span>{apt.doctor}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
             <Link href="/appointments/create">
                <div className="p-4 rounded-lg border-2 border-dashed h-full flex flex-col items-center justify-center cursor-pointer transition-all hover:border-primary hover:text-primary hover:bg-secondary/30">
                    <PlusCircle className="w-10 h-10 mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-semibold">Agendar Cita</span>
                </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
