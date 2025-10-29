'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { TEMPLATES_DATA, TREATMENTS_DATA } from '@/lib/data';
import { useRouter } from 'next/navigation';

export default function CreateAppointmentPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSchedule = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Simular inserción en DB
    console.log("Datos de la cita:", data);
    
    toast({
      title: 'Cita de Control Agendada',
      description: 'La cita ha sido creada exitosamente.',
      variant: 'default',
    });

    alert(
      'Simulación de Inserción:\n\n' +
      `Cita creada en 'appointment' y 'treatments_control'.\n` +
      `Paciente ID: ${data.patient_id}\n` +
      `Tratamiento ID: ${data.treatment_id}\n` +
      `Plantilla ID: ${data.template_id}`
    );

    // Redirigir a la agenda
    router.push('/agenda');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Agendar Nueva Cita de Control
        </h1>
        <p className="text-muted-foreground">
          Complete los detalles para programar un nuevo control de tratamiento.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles de la Cita</CardTitle>
          <CardDescription>
            Seleccione paciente, tratamiento y configure la cita.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSchedule} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="patient_id">Paciente</Label>
              <Select name="patient_id" required>
                <SelectTrigger id="patient_id">
                  <SelectValue placeholder="Seleccione un paciente..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="p1">Juan Pérez</SelectItem>
                  <SelectItem value="p2">María Gómez</SelectItem>
                  <SelectItem value="p3">Carlos López</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor_id">Doctor</Label>
              <Select name="doctor_id" required>
                <SelectTrigger id="doctor_id">
                  <SelectValue placeholder="Seleccione un doctor..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="d1">Dr. García</SelectItem>
                  <SelectItem value="d2">Dra. Martínez</SelectItem>
                  <SelectItem value="d3">Dr. Rodríguez</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="start_time">Fecha y Hora</Label>
                    <Input id="start_time" name="start_time" type="datetime-local" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="modality_code">Modalidad</Label>
                    <Input id="modality_code" name="modality_code" placeholder="Presencial, Telemedicina..." required />
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="treatment_id">Tratamiento Asociado</Label>
              <Select name="treatment_id" required>
                <SelectTrigger id="treatment_id">
                  <SelectValue placeholder="Seleccione el tratamiento a controlar..." />
                </SelectTrigger>
                <SelectContent>
                  {TREATMENTS_DATA.map((treatment) => (
                    <SelectItem key={treatment.id} value={treatment.id}>
                      {treatment.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="template_id">Plantilla para el Control</Label>
              <Select name="template_id" required>
                <SelectTrigger id="template_id">
                  <SelectValue placeholder="Seleccione una plantilla..." />
                </SelectTrigger>
                <SelectContent>
                  {TEMPLATES_DATA.filter((t) => t.type === 'treatment_control').map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit">Agendar Control</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
