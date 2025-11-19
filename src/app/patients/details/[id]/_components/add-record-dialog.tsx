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
import React, { useState, cloneElement } from 'react';

interface AddRecordDialogProps {
  children: React.ReactElement;
  title: string;
  form: React.ReactNode;
  onSave: (data: any) => void;
}

export function AddRecordDialog({
  children,
  title,
  form,
  onSave,
}: AddRecordDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    onSave(data);
    setIsOpen(false);
  };
  
  // This allows the dialog to be controlled by the child trigger
  const trigger = cloneElement(children, {
    onClick: () => setIsOpen(true),
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
                {form}
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit">Guardar</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
