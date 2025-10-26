import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  Calendar,
  Syringe,
  Archive,
  AlertTriangle,
  Users,
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="hover:border-primary transition-colors duration-300 ease-in-out shadow-sm hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas para Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +3 programadas esta mañana
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-primary transition-colors duration-300 ease-in-out shadow-sm hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pacientes en Espera
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              2 para consulta, 2 para laboratorio
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-primary transition-colors duration-300 ease-in-out shadow-sm hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Vacunas Administradas
            </CardTitle>
            <Syringe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+42</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>

        <Card className="hover:border-accent transition-colors duration-300 ease-in-out border-accent/30 shadow-sm hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Alertas de Stock
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
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
                <div className="p-2 bg-secondary rounded-full">
                  <Calendar className="w-4 h-4 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-medium">Nueva cita programada</p>
                  <p className="text-sm text-muted-foreground">
                    Paciente: Ana Pérez, Doctor: Dr. García - Hace 5 min
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-2 bg-secondary rounded-full">
                  <Archive className="w-4 h-4 text-secondary-foreground" />
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
                <div className="p-2 bg-destructive/20 rounded-full">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
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
                <div className="p-2 bg-secondary rounded-full">
                  <Users className="w-4 h-4 text-secondary-foreground" />
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
