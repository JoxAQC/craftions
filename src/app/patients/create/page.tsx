
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
import { COUNTRIES_DATA } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreatePatientPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: 'Paciente Guardado',
      description: 'El nuevo paciente ha sido registrado exitosamente.',
    });
    router.push('/patients');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Agregar Nuevo Paciente
        </h1>
        <p className="text-muted-foreground">
          Complete el formulario para registrar un nuevo paciente en el sistema.
        </p>
      </div>

      <form onSubmit={handleSave}>
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>
              Datos demográficos y de contacto del paciente.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="document">Documento</Label>
              <Input id="document" placeholder="Número de documento" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">País</Label>
              <Select name="country" required>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Seleccione un país..." />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES_DATA.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Nombre del paciente" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input id="lastName" placeholder="Apellido del paciente" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="correo@ejemplo.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" placeholder="Número de teléfono" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
              <Input id="birthDate" type="date" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Género</Label>
              <Select name="gender" required>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Seleccione un género..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Femenino</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" placeholder="Dirección de residencia" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input id="city" placeholder="Ciudad de residencia" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="verification">Método de Verificación</Label>
              <Select name="verification" required>
                <SelectTrigger id="verification">
                  <SelectValue placeholder="Seleccione un método..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="whatsapp">Whatsapp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-8">
            <Button variant="outline" asChild>
                <Link href="/patients">Cancelar</Link>
            </Button>
            <Button type="submit">Guardar Paciente</Button>
        </div>
      </form>
    </div>
  );
}
