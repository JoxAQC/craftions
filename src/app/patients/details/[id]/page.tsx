
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
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  PlusCircle,
  User,
  Briefcase,
  HeartPulse,
  Shield,
  Syringe,
  Pill,
  Accessibility,
  Apple,
  FileText,
  Contact,
  TrendingUp,
  History,
  ClipboardList,
  Heart,
  FileKey,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AddRecordDialog } from './_components/add-record-dialog';
import {
  AllergyForm,
  ConditionForm,
  IncapacityForm,
  LifestyleForm,
  MedicationForm,
  OccupationForm,
  VaccinationForm,
} from './_components/record-forms';
import { use } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

function InfoPill({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  if (!value) return null;
  return (
    <div className="text-sm">
      <p className="text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function SectionCard({
  title,
  icon: Icon,
  children,
  form,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  form: React.ReactNode;
}) {
  const { toast } = useToast();
  
  const handleSave = (data: any) => {
    console.log(`Saving data for ${title}`, data);
    toast({
      title: 'Registro Guardado (Simulación)',
      description: `Se ha guardado un nuevo registro en "${title}".`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-primary" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <AddRecordDialog title={`Añadir a ${title}`} form={form} onSave={handleSave}>
          <Button variant="outline" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Añadir
          </Button>
        </AddRecordDialog>
      </CardHeader>
      <CardContent className="pt-2">{children}</CardContent>
    </Card>
  );
}

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const patient = PATIENTS_DATA.find((p) => p.id === use(params).id);

  if (!patient) {
    notFound();
  }

  const patientAge = format(new Date(), 'yyyy') - format(new Date(patient.birthDate), 'yyyy');

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          {patient.name} {patient.lastName}
        </h1>
        <p className="text-muted-foreground">
          ID Paciente: {patient.id} / Ficha de Paciente
        </p>
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
          <InfoPill
            label="Nombre Completo"
            value={`${patient.name} ${patient.lastName}`}
          />
          <InfoPill label="Edad" value={`${patientAge} años`} />
          <InfoPill
            label="Fecha de Nacimiento"
            value={format(new Date(patient.birthDate), 'PPP', { locale: es })}
          />
          <InfoPill label="Género" value={patient.gender} />
          <InfoPill label="Documento" value={patient.document} />
          <InfoPill label="Email" value={patient.email} />
          <InfoPill label="Teléfono" value={patient.phone} />
          <InfoPill
            label="Dirección"
            value={`${patient.address}, ${patient.city}, ${patient.country}`}
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general"><ClipboardList className="mr-2"/>General</TabsTrigger>
            <TabsTrigger value="contacts"><Contact className="mr-2"/>Contactos</TabsTrigger>
            <TabsTrigger value="evolution"><TrendingUp className="mr-2"/>Evolución</TabsTrigger>
            <TabsTrigger value="history"><History className="mr-2"/>Historial</TabsTrigger>
            <TabsTrigger value="security"><Shield className="mr-2"/>Seguridad</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-6">
             <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6 text-primary"/>
                    <CardTitle className="text-xl">Información Médica Clave</CardTitle>
                </div>
                <CardDescription>Datos médicos esenciales del paciente.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="blood-type">Tipo de Sangre</Label>
                    <Input id="blood-type" defaultValue="O+" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="medical-secure">Seguro Médico</Label>
                    <Input id="medical-secure" defaultValue="Sanitas" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="secure-code">Código de Seguro</Label>
                    <Input id="secure-code" defaultValue="SNT-987654321" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="patient-id">ID de Paciente</Label>
                    <Input id="patient-id" defaultValue={patient.id} readOnly />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Occupation */}
                <SectionCard title="Ocupación" icon={Briefcase} form={<OccupationForm />}>
                {patient.occupation ? (
                    <p className="text-sm">{patient.occupation}</p>
                ) : (
                    <p className="text-sm text-muted-foreground">
                    No hay datos registrados.
                    </p>
                )}
                </SectionCard>

                {/* Lifestyle */}
                <SectionCard title="Estilo de Vida" icon={Apple} form={<LifestyleForm />}>
                {patient.lifestyle && patient.lifestyle.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                    {patient.lifestyle.map((item, i) => (
                        <li key={i}>
                        <span className="font-semibold">{item.title}:</span>{' '}
                        {item.description}
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground">
                    No hay datos registrados.
                    </p>
                )}
                </SectionCard>

                {/* Allergies */}
                <SectionCard title="Alergias" icon={Shield} form={<AllergyForm />}>
                {patient.allergies && patient.allergies.length > 0 ? (
                    <div className="space-y-2">
                    {patient.allergies.map((allergy, i) => (
                        <div key={i} className="text-sm p-2 bg-secondary/50 rounded-md">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">{allergy.substance}</p>
                            <Badge
                            variant={
                                allergy.severity === 'severa' ? 'destructive' : 'secondary'
                            }
                            >
                            {allergy.severity}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground">{allergy.reaction}</p>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">
                    No hay datos registrados.
                    </p>
                )}
                </SectionCard>

                {/* Chronic Conditions */}
                <SectionCard
                title="Condiciones Crónicas"
                icon={HeartPulse}
                form={<ConditionForm />}
                >
                {patient.chronicConditions && patient.chronicConditions.length > 0 ? (
                    <ul className="space-y-2 text-sm list-disc list-inside">
                    {patient.chronicConditions.map((item, i) => (
                        <li key={i}>
                        {item.condition}{' '}
                        <span className="text-muted-foreground">
                            (Diagnóstico:{' '}
                            {format(new Date(item.diagnosed), 'MMM yyyy', {
                            locale: es,
                            })}
                            )
                        </span>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground">
                    No hay datos registrados.
                    </p>
                )}
                </SectionCard>

                {/* Disabilities */}
                <SectionCard
                title="Discapacidades"
                icon={Accessibility}
                form={<></>} // Placeholder for Disabilities Form
                >
                {patient.disabilities && patient.disabilities.length > 0 ? (
                    <ul className="space-y-2 text-sm list-disc list-inside">
                    {patient.disabilities.map((item, i) => (
                        <li key={i}>
                        {item.disability}:{' '}
                        <span className="text-muted-foreground">{item.details}</span>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground">
                    No hay datos registrados.
                    </p>
                )}
                </SectionCard>
                
                {/* Incapacities */}
                <SectionCard title="Incapacidades" icon={FileText} form={<IncapacityForm />}>
                    {patient.incapacities && patient.incapacities.length > 0 ? (
                        <div className="space-y-2">
                            {patient.incapacities.map((item, i) => {
                                const totalDays = differenceInDays(new Date(item.endDate), new Date(item.startDate));
                                return (
                                    <div key={i} className="text-sm p-3 bg-secondary/50 rounded-md">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className="font-semibold">{item.specialty} - <span className='capitalize'>{item.type}</span></p>
                                            <Badge variant={item.status === 'Activa' ? 'default' : item.status === 'Finalizada' ? 'outline' : 'destructive'}>{item.status}</Badge>
                                        </div>
                                        <p className="text-muted-foreground">{item.detail}</p>
                                        <Separator className="my-2" />
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>Inicio: {format(new Date(item.startDate), 'P', { locale: es })}</span>
                                            <span>Fin: {format(new Date(item.endDate), 'P', { locale: es })}</span>
                                            <span>Días: {totalDays}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No hay datos de incapacidades registrados.</p>
                    )}
                </SectionCard>


                {/* Vaccinations */}
                <SectionCard
                title="Vacunaciones"
                icon={Syringe}
                form={<VaccinationForm />}
                >
                {patient.vaccinations && patient.vaccinations.length > 0 ? (
                    <ul className="space-y-2 text-sm list-disc list-inside">
                    {patient.vaccinations.map((item, i) => (
                        <li key={i}>
                        {item.vaccine} -{' '}
                        <span className="text-muted-foreground">
                            {format(new Date(item.date), 'dd/MM/yyyy')}
                        </span>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground">
                    No hay datos registrados.
                    </p>
                )}
                </SectionCard>

                {/* Current Medication */}
                <SectionCard
                title="Medicación Actual"
                icon={Pill}
                form={<MedicationForm />}
                >
                {patient.currentMedication &&
                patient.currentMedication.length > 0 ? (
                    <div className="space-y-2">
                    {patient.currentMedication.map((med, i) => (
                        <div key={i} className="text-sm p-2 bg-secondary/50 rounded-md">
                            <p className="font-semibold">{med.name} ({med.dosage})</p>
                            <p className="text-muted-foreground">
                                {med.quantity} {med.presentation} - Vía {med.route}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Cada {med.frequency} {med.frequency_unit} por {med.duration} {med.duration_unit}
                            </p>
                             {med.details && <p className="text-xs italic text-muted-foreground pt-1">Nota: {med.details}</p>}
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">
                    No hay datos registrados.
                    </p>
                )}
                </SectionCard>
            </div>
        </TabsContent>
        <TabsContent value="contacts">
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-48 border-2 border-dashed rounded-lg mt-6">
                <p>Sección de Contactos en construcción.</p>
            </div>
        </TabsContent>
        <TabsContent value="evolution">
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-48 border-2 border-dashed rounded-lg mt-6">
                <p>Sección de Evolución en construcción.</p>
            </div>
        </TabsContent>
        <TabsContent value="history">
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-48 border-2 border-dashed rounded-lg mt-6">
                <p>Sección de Historial en construcción.</p>
            </div>
        </TabsContent>
        <TabsContent value="security">
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-48 border-2 border-dashed rounded-lg mt-6">
                <p>Sección de Seguridad en construcción.</p>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    

    
