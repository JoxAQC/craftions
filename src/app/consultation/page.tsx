'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  ANTECEDENTS_DATA,
  LAB_RESULTS_DATA,
  TEMPLATES_DATA,
  type Template,
} from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ConsultationPage() {
  const { toast } = useToast();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = TEMPLATES_DATA.find((t) => t.id === templateId) || null;
    setActiveTemplate(template);
    toast({
      title: 'Plantilla cargada',
      description: `Se ha cargado la plantilla "${template?.name}".`,
    });
  };

  const handleGenerateOrder = () => {
    toast({
      title: 'Simulación de Éxito',
      description:
        "La orden médica se insertaría en la tabla 'patients_medicals_orders'.",
      variant: 'default',
    });
  };

  const handleSave = () => {
    toast({
      title: 'Simulación de Guardado',
      description:
        "La consulta se guardaría en 'medical_consultation' y los valores en 'treatments_control_field_values'.",
      variant: 'default',
    });
  };

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)]">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Consulta Médica</h1>
        <p className="text-muted-foreground">
          Registro clínico, historial del paciente y generación de órdenes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
        {/* Left Panel */}
        <Card className="lg:col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>Historial del Paciente</CardTitle>
            <CardDescription>Juan Pérez, 45 años</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            <Tabs defaultValue="antecedents" className="flex-1 flex flex-col min-h-0">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="antecedents">Antecedentes</TabsTrigger>
                <TabsTrigger value="labs">Laboratorios</TabsTrigger>
              </TabsList>
              <ScrollArea className="flex-1 mt-4">
                <TabsContent value="antecedents" className="pr-4 space-y-4">
                  {ANTECEDENTS_DATA.map((item) => (
                    <div key={item.id} className="text-sm p-3 bg-secondary/50 rounded-md">
                      <p className="font-semibold text-primary">
                        {item.type} ({item.date})
                      </p>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="labs" className="pr-4 space-y-4">
                  {LAB_RESULTS_DATA.map((item) => (
                    <div key={item.id} className="text-sm p-3 bg-secondary/50 rounded-md">
                      <p className="font-semibold text-primary">
                        {item.test} ({item.date})
                      </p>
                      <p className="text-muted-foreground">{item.result}</p>
                    </div>
                  ))}
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </CardContent>
        </Card>

        {/* Center Panel */}
        <Card className="lg:col-span-6 flex flex-col">
          <CardHeader>
            <CardTitle>Registro de Consulta</CardTitle>
            <div className="flex items-center gap-4 pt-2">
              <Label htmlFor="template-selector" className="text-sm whitespace-nowrap">
                Seleccionar Plantilla
              </Label>
              <Select
                onValueChange={handleTemplateChange}
                value={selectedTemplateId}
              >
                <SelectTrigger id="template-selector" className="w-full">
                  <SelectValue placeholder="Elija una plantilla..." />
                </SelectTrigger>
                <SelectContent>
                  {TEMPLATES_DATA.filter(
                    (t) => t.type === 'clinical_report'
                  ).map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ScrollArea className="h-full pr-4">
              {activeTemplate ? (
                <form className="space-y-6">
                  {activeTemplate.fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <Label htmlFor={field.id}>{field.name}</Label>
                      {field.data_type === 'string' &&
                      field.name.toLowerCase().includes('diagnóstico') ? (
                        <Textarea
                          id={field.id}
                          placeholder={`Ingrese ${field.name.toLowerCase()}...`}
                          rows={4}
                        />
                      ) : field.data_type === 'string' ? (
                        <Input
                          id={field.id}
                          placeholder={`Ingrese ${field.name.toLowerCase()}...`}
                        />
                      ) : field.data_type === 'boolean' ? (
                        <Select>
                          <SelectTrigger id={field.id}>
                            <SelectValue placeholder="Seleccione..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Sí</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="relative">
                          <Input id={field.id} type="number" placeholder="0.0" />
                          {field.unit && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                              {field.unit}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </form>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground border-2 border-dashed rounded-lg">
                  <p>Seleccione una plantilla para comenzar.</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Right Panel */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Acciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col">
            <Button onClick={handleGenerateOrder} className="w-full">
              Generar Orden Médica
            </Button>
            <Button onClick={handleSave} className="w-full" variant="outline">
              Finalizar y Guardar
            </Button>

            <div className="pt-4 flex-1 flex flex-col">
              <h4 className="font-semibold mb-2">Resumen de Diagnóstico</h4>
              <Textarea
                placeholder="Añadir notas o resumen final..."
                className="flex-1"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
