'use client';

import { useState, useMemo } from 'react';
import { notFound, useRouter, useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { PATIENTS_DATA } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ArrowLeft, MessageSquarePlus, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import * as RecordForms from '../../../../_components/record-forms';

// Helper to get the correct form component
const getFormComponent = (recordType: string) => {
    switch (recordType) {
        case 'occupation': return RecordForms.OccupationForm;
        case 'lifestyle': return RecordForms.LifestyleForm;
        case 'allergy': return RecordForms.AllergyForm;
        case 'condition': return RecordForms.ConditionForm;
        case 'incapacity': return RecordForms.IncapacityForm;
        case 'vaccination': return RecordForms.VaccinationForm;
        case 'medication': return RecordForms.MedicationForm;
        default: return () => <p>Formulario no encontrado.</p>;
    }
};

const getRecordTitle = (recordType: string, record: any) => {
    switch(recordType) {
        case 'occupation': return record;
        case 'lifestyle': return record.title;
        case 'allergy': return record.substance;
        case 'condition': return record.condition;
        case 'incapacity': return record.specialty;
        case 'vaccination': return record.vaccine;
        case 'medication': return record.name;
        default: return 'Registro';
    }
}


export default function EditRecordPage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();

    const { id: patientId, recordType, recordId } = params as { id: string; recordType: string; recordId: string };

    const patient = PATIENTS_DATA.find((p) => p.id === patientId);
    
    // This is a simulation, so we find the record from the data.
    // In a real app, you'd fetch this from your database.
    const recordSource = useMemo(() => {
        if (!patient || !recordType) return [];
        switch (recordType) {
            case 'occupation': return patient.occupation ? [patient.occupation] : [];
            case 'lifestyle': return patient.lifestyle || [];
            case 'allergy': return patient.allergies || [];
            case 'condition': return patient.chronicConditions || [];
            case 'incapacity': return patient.incapacities || [];
            case 'vaccination': return patient.vaccinations || [];
            case 'medication': return patient.currentMedication || [];
            default: return [];
        }
    }, [patient, recordType]);

    // Simulating finding a record by its index, as we don't have unique IDs in the mock data
    const record = recordSource[parseInt(recordId, 10)];
    
    // This is a local state to simulate DB updates.
    const [currentRecord, setCurrentRecord] = useState(record ? { ...record, comments: record.comments || [] } : null);
    const [newComment, setNewComment] = useState('');

    if (!patient || !currentRecord) {
        notFound();
    }

    const FormComponent = getFormComponent(recordType);

    const handleUpdateRecord = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Updating record with data:', data);

        toast({
            title: 'Registro Actualizado (Simulación)',
            description: 'Los cambios en el registro han sido guardados.',
        });
        
        // You would typically redirect or show a success message
    };

    const handleAddComment = () => {
        if (newComment.trim() === '') return;

        const commentToAdd = {
            id: `comment_${Date.now()}`,
            text: newComment,
            author: 'Dr. García', // Simulated author
            date: new Date().toISOString(),
        };
        
        // @ts-ignore
        setCurrentRecord(prev => ({...prev, comments: [...prev.comments, commentToAdd]}));
        setNewComment('');

        toast({
            title: 'Comentario Añadido',
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href={`/patients/details/${patientId}/history/${recordType}`}>
                        <ArrowLeft />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Editar Registro: {getRecordTitle(recordType, currentRecord)}</h1>
                    <p className="text-muted-foreground">Paciente: {patient.name} {patient.lastName}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Edit Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleUpdateRecord}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Detalles del Registro</CardTitle>
                                <CardDescription>Modifique la información del registro y guarde los cambios.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormComponent {...currentRecord} />
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button type="submit">Guardar Cambios</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </div>

                {/* Comments Section */}
                <div className="lg:col-span-1 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquarePlus className="h-5 w-5"/>
                                Comentarios
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="new-comment">Añadir Nuevo Comentario</Label>
                                <Textarea 
                                    id="new-comment"
                                    placeholder="Escriba un comentario..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                            </div>
                            <Button onClick={handleAddComment} className="w-full">Añadir Comentario</Button>
                        </CardContent>
                    </Card>
                    
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Historial de Comentarios</h3>
                        {currentRecord.comments.length > 0 ? (
                             // @ts-ignore
                            currentRecord.comments.slice().reverse().map((comment, index) => (
                                <Card key={index} className="bg-secondary/50">
                                    <CardContent className="p-4 space-y-2">
                                        <p className="text-sm">{comment.text}</p>
                                        <Separator />
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>{comment.author}</span>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                <span>{format(new Date(comment.date), "Pp", { locale: es })}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">No hay comentarios todavía.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
