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
import { Plus, Trash2 } from 'lucide-react';

const defaultValues: CreateTemplateValues = {
  name: '',
  description: '',
  type: 'clinical_report',
  fields: [
    { field_code: 'MOTCON', name: 'Motivo de Consulta', data_type: 'string', unit: '' },
  ],
};

export default function CreateTemplatePage() {
  const { toast } = useToast();
  const form = useForm<CreateTemplateValues>({
    resolver: zodResolver(createTemplateSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'fields',
  });

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
                Defina los campos que contendrá el formulario.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-4 border rounded-lg relative space-y-4 bg-secondary/30"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`fields.${index}.field_code`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Código del Campo</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej: T1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`fields.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre del Campo</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej: Temperatura" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`fields.${index}.data_type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de Dato</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="string">Texto</SelectItem>
                                <SelectItem value="double">Número</SelectItem>
                                <SelectItem value="boolean">Sí/No</SelectItem>
                                <SelectItem value="date">Fecha</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`fields.${index}.unit`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unidad (Opcional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej: °C, mg/dL" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar campo</span>
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                className="mt-6"
                onClick={() =>
                  append({
                    field_code: '',
                    name: '',
                    data_type: 'string',
                    unit: '',
                  })
                }
              >
                <Plus className="mr-2 h-4 w-4" /> Añadir Campo
              </Button>
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
