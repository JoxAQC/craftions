'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { PATIENTS_DATA } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { ArrowLeft, Edit } from 'lucide-react';
import * as RecordForms from '../../_components/record-forms';

const RECORD_TYPE_MAP: Record<string, { title: string; dataKey: keyof typeof PATIENTS_DATA[0] }> = {
    occupation: { title: 'Ocupación', dataKey: 'occupation' },
    lifestyle: { title: 'Estilo de Vida', dataKey: 'lifestyle' },
    allergy: { title: 'Alergias', dataKey: 'allergies' },
    condition: { title: 'Condiciones Crónicas', dataKey: 'chronicConditions' },
    incapacity: { title: 'Incapacidades', dataKey: 'incapacities' },
    vaccination: { title: 'Vacunaciones', dataKey: 'vaccinations' },
    medication: { title: 'Medicación Actual', dataKey: 'currentMedication' },
};


const RecordItem = ({ record, recordType, patientId, index }: { record: any, recordType: string, patientId: string, index: number }) => {
    
    const renderRecordContent = () => {
        switch (recordType) {
            case 'occupation':
                return <p>Ocupación: {record.occupation}</p>;
            case 'lifestyle':
                return <>
                    <p className="font-semibold">{record.title}</p>
                    <p className="text-sm text-muted-foreground">{record.description}</p>
                </>;
            case 'allergy':
                return <>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">{record.substance}</p>
                        <Badge variant={record.severity === 'severa' ? 'destructive' : 'secondary'}>{record.severity}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Reacción: {record.reaction}</p>
                    <p className="text-xs text-muted-foreground">Estado: {record.status}</p>
                </>;
            case 'condition':
                 return <>
                    <p className="font-semibold">{record.condition}</p>
                    <p className="text-sm text-muted-foreground">Diagnosticado: {format(new Date(record.diagnosed), 'P', { locale: es })}</p>
                 </>;
            case 'incapacity':
                const totalDays = differenceInDays(new Date(record.endDate), new Date(record.startDate));
                return <>
                    <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold">{record.specialty} - <span className='capitalize'>{record.type}</span></p>
                        <Badge variant={record.status === 'Activa' ? 'default' : record.status === 'Finalizada' ? 'outline' : 'destructive'}>{record.status}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">{record.detail}</p>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Inicio: {format(new Date(record.startDate), 'P', { locale: es })}</span>
                        <span>Fin: {format(new Date(record.endDate), 'P', { locale: es })}</span>
                        <span>Días: {totalDays}</span>
                    </div>
                </>
            case 'vaccination':
                 return <>
                    <p className="font-semibold">{record.vaccine}</p>
                    <p className="text-sm text-muted-foreground">Fecha: {format(new Date(record.date), 'P', { locale: es })}</p>
                 </>;
            case 'medication':
                return <>
                    <p className="font-semibold">{record.name} ({record.dosage})</p>
                    <p className="text-sm text-muted-foreground">
                        {record.quantity} {record.presentation} - Vía {record.route}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Cada {record.frequency} {record.frequency_unit} por {record.duration} {record.duration_unit}
                    </p>
                    {record.details && <p className="text-xs italic text-muted-foreground pt-1">Nota: {record.details}</p>}
                </>;
            default:
                return <p>Contenido no disponible.</p>;
        }
    };
    
    return (
        <Card className="flex items-start justify-between gap-4 p-4">
            <div className="flex-1 space-y-1">
                {renderRecordContent()}
            </div>
            <Button variant="outline" size="sm" asChild>
                <Link href={`/patients/details/${patientId}/history/${recordType}/edit/${index}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Ver/Editar
                </Link>
            </Button>
        </Card>
    );
};


export default function HistoryListPage() {
    const params = useParams();
    const { id: patientId, recordType } = params as { id: string; recordType: string };
    
    const patient = PATIENTS_DATA.find((p) => p.id === patientId);
    const recordInfo = RECORD_TYPE_MAP[recordType];
    
    if (!patient || !recordInfo) {
        notFound();
    }

    const records = useMemo(() => {
        const data = patient[recordInfo.dataKey as keyof typeof patient];
        if (!data) return [];
        // The 'occupation' is a single string, not an array. We wrap it for consistency.
        if (recordType === 'occupation' && typeof data === 'string') {
            return [{ occupation: data, comments: [] }];
        }
        return Array.isArray(data) ? data : [];
    }, [patient, recordInfo.dataKey, recordType]);


    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" asChild>
                    <Link href={`/patients/details/${patientId}`}>
                        <ArrowLeft />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Historial de {recordInfo.title}</h1>
                    <p className="text-muted-foreground">Paciente: {patient.name} {patient.lastName}</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Todos los Registros</CardTitle>
                    <CardDescription>Aquí puede ver y editar todos los registros de {recordInfo.title.toLowerCase()} para este paciente.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {records.length > 0 ? (
                        records.map((record, index) => (
                           <RecordItem key={index} record={record} recordType={recordType} patientId={patientId} index={index} />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-48 border-2 border-dashed rounded-lg">
                            <p>No hay registros para mostrar.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
