'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React, { useState, cloneElement } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { format, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EditRecordDialog } from './edit-record-dialog';
import { Separator } from '@/components/ui/separator';

interface ViewRecordsDialogProps {
  children: React.ReactElement;
  title: string;
  records: any[];
  recordType: string;
  editForm: React.ReactNode;
}

const RecordItem = ({ record, recordType, onEdit }: { record: any, recordType: string, onEdit: (record: any) => void }) => {
    const { toast } = useToast();

    const handleDelete = () => {
        toast({
            title: 'Registro Eliminado (Simulación)',
            description: 'El registro ha sido eliminado.',
            variant: 'destructive'
        });
    };
    
    const renderRecordContent = () => {
        switch (recordType) {
            case 'occupation':
                return <p>Ocupación: {record}</p>;
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
        <div className="p-4 border rounded-lg flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1">
                {renderRecordContent()}
            </div>
            <div className="flex flex-col gap-2">
                 <EditRecordDialog title={`Editar ${recordType}`} form={onEdit(record)} recordData={record} onSave={() => {}}>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                    </Button>
                </EditRecordDialog>
                <Button variant="destructive" size="icon" className="h-8 w-8" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};


export function ViewRecordsDialog({
  children,
  title,
  records,
  recordType,
  editForm,
}: ViewRecordsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleEdit = (record: any) => {
    // Here you would pass the specific form for editing
    console.log("Editing record:", record);
    // For simulation, we return a placeholder or the same form
    return editForm;
  };
  
  const trigger = cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(true);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4 py-4">
                {records && records.length > 0 ? (
                    records.map((record, index) => (
                        <RecordItem key={index} record={record} recordType={recordType} onEdit={handleEdit} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-48 border-2 border-dashed rounded-lg">
                        <p>No hay registros para mostrar.</p>
                    </div>
                )}
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
