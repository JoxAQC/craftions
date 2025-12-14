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
import Link from 'next/link';
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
  Eye,
  FileSignature,
  Activity,
  Phone,
  BarChart2,
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
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from 'recharts';
import { Switch } from '@/components/ui/switch';


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
  recordType,
  patientId,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  form: React.ReactNode;
  recordType: string;
  patientId: string;
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
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
         <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8" asChild>
                <Link href={`/patients/details/${patientId}/history/${recordType}`}>
                    <Eye className="mr-2 h-4 w-4" /> Ver Historial
                </Link>
            </Button>
            <AddRecordDialog title={`Añadir a ${title}`} form={form} onSave={handleSave}>
              <Button variant="outline" size="sm" className="h-8">
                <PlusCircle className="mr-2 h-4 w-4" />
                Añadir
              </Button>
            </AddRecordDialog>
        </div>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
}

const EvolutionChart = () => {
    const data = [
        { month: 'Ene', weight: 65 },
        { month: 'Feb', weight: 65.5 },
        { month: 'Mar', weight: 66 },
        { month: 'Abr', weight: 65 },
        { month: 'May', weight: 64.5 },
        { month: 'Jun', weight: 64 },
    ];
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                <Area type="monotone" dataKey="weight" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorWeight)" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const patientId = use(params).id;
  const patient = PATIENTS_DATA.find((p) => p.id === patientId);

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
            <div className='p-2 bg-primary/10 rounded-md'>
                <User className="w-6 h-6 text-primary" />
            </div>
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
                    <div className="p-2 bg-primary/10 rounded-md">
                        <Heart className="w-6 h-6 text-primary"/>
                    </div>
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
                <SectionCard title="Ocupación" icon={Briefcase} form={<OccupationForm />} recordType="occupation" patientId={patient.id}>
                {patient.occupation ? (
                    <p className="text-sm p-3 bg-secondary/50 rounded-md">{patient.occupation}</p>
                ) : (
                    <p className="text-sm text-muted-foreground">
                    No hay datos registrados.
                    </p>
                )}
                </SectionCard>

                {/* Lifestyle */}
                <SectionCard title="Estilo de Vida" icon={Apple} form={<LifestyleForm />} recordType="lifestyle" patientId={patient.id}>
                {patient.lifestyle && patient.lifestyle.length > 0 ? (
                    <ul className="space-y-2 text-sm">
                    {patient.lifestyle.slice(0, 2).map((item, i) => (
                        <li key={i} className="p-3 bg-secondary/50 rounded-md">
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
                <SectionCard title="Alergias" icon={Shield} form={<AllergyForm />} recordType="allergy" patientId={patient.id}>
                {patient.allergies && patient.allergies.length > 0 ? (
                    <div className="space-y-2">
                    {patient.allergies.slice(0, 1).map((allergy, i) => (
                        <div key={i} className="text-sm p-3 bg-secondary/50 rounded-md">
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
                recordType="condition"
                patientId={patient.id}
                >
                {patient.chronicConditions && patient.chronicConditions.length > 0 ? (
                    <ul className="space-y-2 text-sm list-disc list-inside">
                    {patient.chronicConditions.slice(0,2).map((item, i) => (
                        <li key={i} className="p-2">
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
                    form={<></>} 
                    recordType="disability"
                    patientId={patient.id}
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
                <SectionCard title="Incapacidades" icon={FileText} form={<IncapacityForm />} recordType="incapacity" patientId={patient.id}>
                    {patient.incapacities && patient.incapacities.length > 0 ? (
                        <div className="space-y-2">
                            {patient.incapacities.slice(0,1).map((item, i) => {
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
                recordType="vaccination"
                patientId={patient.id}
                >
                {patient.vaccinations && patient.vaccinations.length > 0 ? (
                    <ul className="space-y-2 text-sm list-disc list-inside">
                    {patient.vaccinations.slice(0,2).map((item, i) => (
                        <li key={i} className="p-2">
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
                recordType="medication"
                patientId={patient.id}
                >
                {patient.currentMedication &&
                patient.currentMedication.length > 0 ? (
                    <div className="space-y-2">
                    {patient.currentMedication.slice(0,1).map((med, i) => (
                        <div key={i} className="text-sm p-3 bg-secondary/50 rounded-md">
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
        <TabsContent value="contacts" className="mt-6 space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Contactos de Emergencia</CardTitle>
                        <CardDescription>Personas a notificar en caso de una emergencia.</CardDescription>
                    </div>
                    <Button><PlusCircle className="mr-2" /> Añadir Contacto</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg flex justify-between items-center bg-card">
                        <div>
                            <p className="font-semibold text-lg">Ana Pérez</p>
                            <p className="text-muted-foreground">Esposa</p>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                            <Phone className="h-5 w-5" />
                            <a href="tel:+34655443322" className="font-semibold">+34 655 44 33 22</a>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="evolution" className="mt-6 space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-primary/10 rounded-md">
                            <BarChart2 className="w-6 h-6 text-primary"/>
                        </div>
                        <div>
                            <CardTitle>Evolución del Paciente</CardTitle>
                            <CardDescription>Gráficos de seguimiento de métricas de salud.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <h3 className="font-semibold mb-4">Evolución del Peso (Últimos 6 meses)</h3>
                    <EvolutionChart />
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="history" className="mt-6 space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Historial de Consultas</CardTitle>
                    <CardDescription>Línea de tiempo de las visitas y eventos médicos importantes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-border">
                        <div className="relative mb-8">
                            <div className="absolute -left-[34px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-8 ring-background"></div>
                            <p className="font-bold">10 de Mayo, 2024</p>
                            <p className="text-muted-foreground">Consulta de Control de Hipertensión con Dr. García.</p>
                        </div>
                        <div className="relative mb-8">
                            <div className="absolute -left-[34px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-8 ring-background"></div>
                            <p className="font-bold">20 de Febrero, 2024</p>
                            <p className="text-muted-foreground">Analítica de sangre de rutina. Resultados estables.</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[34px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-8 ring-background"></div>
                            <p className="font-bold">15 de Noviembre, 2023</p>
                            <p className="text-muted-foreground">Consulta inicial. Diagnóstico de Diabetes tipo 2.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="security" className="mt-6 space-y-6">
            <Card>
                <CardHeader>
                     <div className="flex items-center gap-3">
                         <div className="p-2 bg-primary/10 rounded-md">
                            <FileSignature className="w-6 h-6 text-primary"/>
                        </div>
                        <div>
                            <CardTitle>Consentimientos Informados</CardTitle>
                            <CardDescription>Gestión de documentos y consentimientos firmados.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                            <p className="font-medium">Consentimiento de Tratamiento de Datos</p>
                            <p className="text-xs text-muted-foreground">Firmado el 15 de Noviembre, 2023</p>
                        </div>
                        <Button variant="outline" size="sm">Ver Documento</Button>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-primary/10 rounded-md">
                            <Activity className="w-6 h-6 text-primary"/>
                        </div>
                        <div>
                            <CardTitle>Actividad de la Cuenta</CardTitle>
                            <CardDescription>Control de accesos y notificaciones de seguridad.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Notificaciones por Email</p>
                            <p className="text-xs text-muted-foreground">Recibir alertas de seguridad y recordatorios.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                     <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Autenticación de Dos Factores (2FA)</p>
                             <p className="text-xs text-muted-foreground">Añade una capa extra de seguridad a la cuenta.</p>
                        </div>
                        <Button variant="outline" size="sm">Activar</Button>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
