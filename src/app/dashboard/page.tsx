
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  CalendarClock,
  Syringe,
  Archive,
  AlertTriangle,
  Users,
  Hourglass,
  FlaskConical,
  UserCheck,
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumen general de la actividad de la clínica.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:border-primary/80 transition-colors duration-300 ease-in-out shadow-sm hover:shadow-lg">
          <CardHeader>
             <div className='flex justify-between items-start'>
                <div className='flex flex-col gap-1'>
                    <CardTitle className="text-base font-semibold">Citas para Hoy</CardTitle>
                    <div className="text-4xl font-bold">12</div>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                    <CalendarClock className="h-8 w-8 text-primary" />
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              +3 programadas esta mañana
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-blue-500/80 transition-colors duration-300 ease-in-out shadow-sm hover:shadow-lg border-blue-500/20">
          <CardHeader>
            <div className='flex justify-between items-start'>
                <div className='flex flex-col gap-1'>
                    <CardTitle className="text-base font-semibold">
                    Pacientes en Espera
                    </CardTitle>
                    <div className="text-4xl font-bold">4</div>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Hourglass className="h-8 w-8 text-blue-500" />
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              2 para consulta, 2 para laboratorio
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-green-500/80 transition-colors duration-300 ease-in-out shadow-sm hover:shadow-lg border-green-500/20">
           <CardHeader>
            <div className='flex justify-between items-start'>
                <div className='flex flex-col gap-1'>
                    <CardTitle className="text-base font-semibold">
                    Vacunas del Día
                    </CardTitle>
                    <div className="text-4xl font-bold">+42</div>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg">
                    <Syringe className="h-8 w-8 text-green-500" />
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Administradas esta semana</p>
          </CardContent>
        </Card>

        <Card className="hover:border-destructive/80 transition-colors duration-300 ease-in-out border-destructive/30 shadow-sm hover:shadow-lg">
          <CardHeader>
            <div className='flex justify-between items-start'>
                <div className='flex flex-col gap-1'>
                    <CardTitle className="text-base font-semibold">
                    Alertas de Stock
                    </CardTitle>
                    <div className="text-4xl font-bold">3</div>
                </div>
                <div className="p-3 bg-destructive/10 rounded-lg">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Medicamentos con bajo inventario
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas acciones registradas en el sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <UserCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Nueva cita programada</p>
                  <p className="text-sm text-muted-foreground">
                    Paciente: Ana Pérez, Doctor: Dr. García - Hace 5 min
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-3 bg-secondary rounded-full">
                  <Archive className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-medium">
                    Stock de &apos;Paracetamol&apos; actualizado
                  </p>
                  <p className="text-sm text-muted-foreground">
                    50 unidades añadidas - Hace 30 min
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Tareas Pendientes</CardTitle>
            <CardDescription>Acciones que requieren su atención.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <div className="p-3 bg-destructive/10 rounded-full">
                  <FlaskConical className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="font-medium">
                    Revisar resultados de laboratorio
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Paciente: Carlos López - Urgente
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-full">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Confirmar seguimiento</p>
                  <p className="text-sm text-muted-foreground">
                    Paciente: María Rodríguez - Mañana
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
