
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PATIENTS_DATA } from '@/lib/data';
import { PlusCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function PatientsPage() {
    const router = useRouter();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Pacientes</h1>
          <p className="text-muted-foreground">
            Gestiona la información de tus pacientes.
          </p>
        </div>
        <Button asChild>
          <Link href="/patients/create">
            <PlusCircle className="mr-2" />
            Agregar Paciente
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Pacientes</CardTitle>
          <CardDescription>
            Busca y selecciona un paciente para ver su historial completo.
          </CardDescription>
          <div className="relative pt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar por nombre, apellido o documento..." className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre Completo</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Última Visita</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PATIENTS_DATA.map((patient) => (
                <TableRow key={patient.id} className="cursor-pointer" onClick={() => router.push(`/patients/details/${patient.id}`)}>
                  <TableCell className="font-medium">{`${patient.name} ${patient.lastName}`}</TableCell>
                  <TableCell>{patient.document}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{patient.lastVisit}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
