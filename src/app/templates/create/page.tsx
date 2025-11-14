
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createTemplateSchema, type CreateTemplateValues } from '@/lib/schemas';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useState, useMemo } from 'react';
import { PREDEFINED_FIELDS_DATA } from '@/lib/data';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

const defaultValues: CreateTemplateValues = {
  name: '',
  description: '',
  type: 'clinical_report',
  fields: [],
};

export default function CreateTemplatePage() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  
  const form = useForm<CreateTemplateValues>({
    resolver: zodResolver(createTemplateSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: 'fields',
  });

  const selectedFieldCodes = useMemo(() => {
    return fields.map((field) => field.field_code);
  }, [fields]);

  function onSubmit(data: CreateTemplateValues) {
    console.log('Datos de la plantilla:', data);
    toast({
      title: 'Simulación de Creación de Plantilla',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (event: React.DragEvent, index: number) => {
    event.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    move(draggedIndex, index);
    setDraggedIndex(index);
  };
  
  const handleDrop = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Crear Nueva Plantilla
        </h1>
        <p className="text-muted-foreground">
          Defina la estructura de un formulario dinámico para sus registros.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
              <CardDescription>Detalles principales de la plantilla.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la Plantilla</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Control Pediátrico" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input placeholder="Breve descripción de su uso" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Plantilla</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="clinical_report">
                          Informe Clínico
                        </SelectItem>
                        <SelectItem value="laboratory_template">
                          Plantilla de Laboratorio
                        </SelectItem>
                        <SelectItem value="treatment_control">
                          Control de Tratamiento
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campos de la Plantilla</CardTitle>
              <CardDescription>
                Busque y asocie los campos que contendrá el formulario. Puede reordenarlos arrastrándolos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-4 border rounded-lg relative space-y-4 bg-secondary/30 flex items-center gap-4"
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={handleDrop}
                  >
                    <div className="flex items-center gap-2">
                        <GripVertical className="cursor-move text-muted-foreground" />
                        <span className="font-bold text-lg text-primary">{index + 1}.</span>
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                        <div>
                            <FormLabel>Nombre del Campo</FormLabel>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="font-semibold">{field.name}</p>
                                <Badge variant="secondary">Predefinido</Badge>
                            </div>
                        </div>
                        <div>
                            <FormLabel>Tipo de Dato</FormLabel>
                            <Badge variant="outline" className="capitalize mt-1">{field.data_type}</Badge>
                        </div>
                        <div>
                            <FormLabel>Unidad</FormLabel>
                            <p className="text-sm text-muted-foreground mt-1">{field.unit || 'N/A'}</p>
                        </div>
                         <FormField
                            control={form.control}
                            name={`fields.${index}.required`}
                            render={({ field: selectField }) => (
                              <FormItem>
                                <FormLabel>Requerido</FormLabel>
                                <Select
                                    onValueChange={(value) => selectField.onChange(value === 'true')}
                                    defaultValue={String(selectField.value)}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="true">Sí</SelectItem>
                                    <SelectItem value="false">No</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="shrink-0"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar campo</span>
                    </Button>
                  </div>
                ))}
                 {fields.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    Aún no ha añadido campos.
                  </div>
                )}
              </div>
              <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="mt-6"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Añadir Campo
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar campo..." />
                      <CommandList>
                        <CommandEmpty>No se encontraron campos.</CommandEmpty>
                        <CommandGroup>
                          {PREDEFINED_FIELDS_DATA.map((predefField) => (
                            <CommandItem
                              key={predefField.field_code}
                              value={predefField.name}
                              disabled={selectedFieldCodes.includes(predefField.field_code)}
                              onSelect={() => {
                                append({
                                  field_code: predefField.field_code,
                                  name: predefField.name,
                                  data_type: predefField.data_type,
                                  unit: predefField.unit || '',
                                  required: true,
                                });
                                setOpen(false);
                              }}
                            >
                              {predefField.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

              <FormField
                control={form.control}
                name="fields"
                render={() => (
                  <FormItem>
                    <FormMessage className="mt-2" />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit">Guardar Plantilla</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
