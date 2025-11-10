'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Clock, User, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Datos simulados de citas
const allAppointments = [
  {
    id: 'apt1',
    date: new Date(),
    time: '09:00',
    patient: 'Juan Pérez',
    type: 'Consulta Nueva',
    doctor: 'Dr. García',
    href: '/consultation',
    isControl: false,
  },
  {
    id: 'apt2',
    date: new Date(),
    time: '10:30',
    patient: 'María Gómez',
    type: 'Control Diabetes',
    doctor: 'Dr. Rodríguez',
    href: '/controls/start/ctrl_123',
    isControl: true,
  },
  {
    id: 'apt3',
    date: new Date(),
    time: '11:00',
    patient: 'Carlos López',
    type: 'Consulta General',
    doctor: 'Dr. García',
    href: '/consultation',
    isControl: false,
  },
  {
    id: 'apt4',
    date: new Date(new Date().setDate(new Date().getDate() + 1)), // Cita para mañana
    time: '14:00',
    patient: 'Ana Torres',
    type: 'Control Post-Operatorio',
    doctor: 'Dra. Martínez',
    href: '/controls/start/ctrl_456',
    isControl: true,
  },
];

export default function AgendaPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedDayString = date ? format(date, 'yyyy-MM-dd') : '';

  const appointments = allAppointments.filter(
    (apt) => format(apt.date, 'yyyy-MM-dd') === selectedDayString
  );

  const selectedDayName = date ? format(date, 'eeee', { locale: es }) : '';
  const selectedDayMonth = date ? format(date, "d 'de' MMMM", { locale: es }) : '';

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Agenda / Calendario</h1>
          <p className="text-muted-foreground">
            Vista de citas programadas. Seleccione un día para ver los detalles.
          </p>
        </div>
        <Button asChild>
          <Link href="/appointments/create">
            <PlusCircle className="mr-2" />
            Agendar Nueva Cita
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
            <Card>
                <CardContent className="p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md"
                        locale={es}
                    />
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
          <Card className="min-h-[365px]">
            <CardHeader>
              <CardTitle className="capitalize">
                Citas para: {selectedDayName}, {selectedDayMonth}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointments.length > 0 ? (
                appointments.map((apt) => (
                  <Link href={apt.href} key={apt.id}>
                    <div className={`p-4 rounded-lg border h-full flex flex-col cursor-pointer transition-all hover:shadow-lg hover:border-primary ${apt.isControl ? 'bg-blue-900/10 border-blue-500/30' : 'bg-secondary/50'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="text-lg font-bold">{apt.time}</span>
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold">{apt.type}</p>
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
                ))
              ) : (
                <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-48 border-2 border-dashed rounded-lg">
                    <p>No hay citas para el día seleccionado.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
