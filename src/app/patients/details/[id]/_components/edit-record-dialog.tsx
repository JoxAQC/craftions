'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React, { useState, cloneElement, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface EditRecordDialogProps {
  children: React.ReactElement;
  title: string;
  form: React.ReactNode;
  recordData: any;
  onSave: (data: any) => void;
}

export function EditRecordDialog({
  children,
  title,
  form,
  recordData,
  onSave,
}: EditRecordDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState('');
  const { toast } = useToast();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Remove comment from main form data to handle it separately
    formData.delete('new_comment'); 
    const data = Object.fromEntries(formData.entries());
    
    const saveData = {
        ...data,
        comments: [...(recordData.comments || []), { text: comment, date: new Date().toISOString() }]
    }

    onSave(saveData);

    toast({
        title: 'Registro Actualizado (Simulación)',
        description: 'Los cambios han sido guardados.',
    });

    setIsOpen(false);
    setComment('');
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
      <DialogContent className="sm:max-w-md" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="grid gap-4 py-4">
            {/* We pass default values to the form clone */}
            {cloneElement(form as React.ReactElement, { ...recordData })}
          </div>
           <div className="space-y-2 mt-4">
              <Label htmlFor="new_comment">Añadir Comentario</Label>
              <Textarea 
                id="new_comment"
                name="new_comment"
                placeholder="Escriba un nuevo comentario..." 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
          </div>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
