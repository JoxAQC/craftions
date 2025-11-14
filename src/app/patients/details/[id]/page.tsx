
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { PATIENTS_DATA } from '@/lib/data';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { PlusCircle, User, Briefcase, HeartPulse, Shield, Syringe, Pill, Accessibility, Apple } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function InfoPill({ label, value }: { label: string; value: string | undefined }) {
    if (!value) return null;
    return (
        <div className="text-sm">
            <p className="text-muted-foreground">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    );
}

function SectionCard({ title, icon: Icon, children, onAdd }: { title: string; icon: React.ElementType, children: React.ReactNode; onAdd: () => void; }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className='flex items-center gap-3'>
                    <Icon className="w-6 h-6 text-primary" />
                    <CardTitle className="text-xl">{title}</CardTitle>
                </div>
                <Button variant="outline" size="sm" onClick={onAdd}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Añadir
                </Button>
            </CardHeader>
            <CardContent className="pt-2">
                {children}
            </CardContent>
        </Card>
    )
}

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const patient = PATIENTS_DATA.find((p) => p.id === params.id);

  if (!patient) {
    notFound();
  }
  
  const handleAdd = (section: string) => {
    toast({
        title: 'Acción Simulada',
        description: `Se abriría un formulario para añadir un nuevo registro en "${section}".`
    })
  }

  const patientAge = format(new Date(), 'yyyy') - format(new Date(patient.birthDate), 'yyyy');

  return (
    <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tight">{patient.name} {patient.lastName}</h1>
            <p className="text-muted-foreground">ID Paciente: {patient.id} / Ficha de Paciente</p>
        </div>

        {/* Patient Details Card */}
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <User className="w-6 h-6 text-primary" />
                    <CardTitle className="text-xl">Información Personal</CardTitle>
                </div>
                <CardDescription>Datos demográficos y de contacto.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <InfoPill label="Nombre Completo" value={`${patient.name} ${patient.lastName}`} />
                <InfoPill label="Edad" value={`${patientAge} años`} />
                <InfoPill label="Fecha de Nacimiento" value={format(new Date(patient.birthDate), 'PPP', { locale: es })} />
                <InfoPill label="Género" value={patient.gender} />
                <InfoPill label="Documento" value={patient.document} />
                <InfoPill label="Email" value={patient.email} />
                <InfoPill label="Teléfono" value={patient.phone} />
                <InfoPill label="Dirección" value={`${patient.address}, ${patient.city}, ${patient.country}`} />
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Occupation */}
            <SectionCard title="Ocupación" icon={Briefcase} onAdd={() => handleAdd('Ocupación')}>
                {patient.occupation ? (
                    <p className="text-sm">{patient.occupation}</p>
                ): <p className="text-sm text-muted-foreground">No hay datos registrados.</p>}
            </SectionCard>

            {/* Lifestyle */}
            <SectionCard title="Estilo de Vida" icon={Apple} onAdd={() => handleAdd('Estilo de Vida')}>
                {patient.lifestyle && patient.lifestyle.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                        {patient.lifestyle.map((item, i) => (
                            <li key={i}><span className="font-semibold">{item.title}:</span> {item.description}</li>
                        ))}
                    </ul>
                ) : <p className="text-sm text-muted-foreground">No hay datos registrados.</p>}
            </SectionCard>

            {/* Allergies */}
            <SectionCard title="Alergias" icon={Shield} onAdd={() => handleAdd('Alergias')}>
                {patient.allergies && patient.allergies.length > 0 ? (
                     <div className="space-y-2">
                        {patient.allergies.map((allergy, i) => (
                            <div key={i} className="text-sm p-2 bg-secondary/50 rounded-md">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold">{allergy.substance}</p>
                                    <Badge variant={allergy.severity === 'severa' ? 'destructive' : 'secondary'}>{allergy.severity}</Badge>
                                </div>
                                <p className="text-muted-foreground">{allergy.reaction}</p>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-sm text-muted-foreground">No hay datos registrados.</p>}
            </SectionCard>

            {/* Chronic Conditions */}
            <SectionCard title="Condiciones Crónicas" icon={HeartPulse} onAdd={() => handleAdd('Condiciones Crónicas')}>
                 {patient.chronicConditions && patient.chronicConditions.length > 0 ? (
                     <ul className="space-y-2 text-sm list-disc list-inside">
                        {patient.chronicConditions.map((item, i) => (
                            <li key={i}>{item.condition} <span className="text-muted-foreground">(Diagnóstico: {format(new Date(item.diagnosed), 'MMM yyyy', {locale: es})})</span></li>
                        ))}
                    </ul>
                ) : <p className="text-sm text-muted-foreground">No hay datos registrados.</p>}
            </SectionCard>

            {/* Disabilities */}
            <SectionCard title="Discapacidades" icon={Accessibility} onAdd={() => handleAdd('Discapacidades')}>
                {patient.disabilities && patient.disabilities.length > 0 ? (
                     <ul className="space-y-2 text-sm list-disc list-inside">
                        {patient.disabilities.map((item, i) => (
                            <li key={i}>{item.disability}: <span className="text-muted-foreground">{item.details}</span></li>
                        ))}
                    </ul>
                ) : <p className="text-sm text-muted-foreground">No hay datos registrados.</p>}
            </SectionCard>

            {/* Vaccinations */}
            <SectionCard title="Vacunaciones" icon={Syringe} onAdd={() => handleAdd('Vacunaciones')}>
                {patient.vaccinations && patient.vaccinations.length > 0 ? (
                     <ul className="space-y-2 text-sm list-disc list-inside">
                        {patient.vaccinations.map((item, i) => (
                           <li key={i}>{item.vaccine} - <span className="text-muted-foreground">{format(new Date(item.date), 'dd/MM/yyyy')}</span></li>
                        ))}
                    </ul>
                ) : <p className="text-sm text-muted-foreground">No hay datos registrados.</p>}
            </SectionCard>
            
            {/* Current Medication */}
            <SectionCard title="Medicación Actual" icon={Pill} onAdd={() => handleAdd('Medicación Actual')}>
                {patient.currentMedication && patient.currentMedication.length > 0 ? (
                    <div className="space-y-2">
                        {patient.currentMedication.map((med, i) => (
                            <div key={i} className="text-sm p-2 bg-secondary/50 rounded-md">
                                <p className="font-semibold">{med.medication}</p>
                                <p className="text-muted-foreground">{med.dosage} - {med.frequency}</p>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-sm text-muted-foreground">No hay datos registrados.</p>}
            </SectionCard>
        </div>
    </div>
  );
}
