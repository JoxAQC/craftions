'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const commonFields = (
  <>
    <input type="hidden" name="medical_history_id" value="mh_123" />
    <input type="hidden" name="appointment_id" value="apt_abc" />
  </>
);

export const OccupationForm = () => (
  <div className="space-y-4">
    {commonFields}
    <div className="space-y-2">
      <Label htmlFor="occupation_select">Ocupación</Label>
      <Select name="occupation" required>
        <SelectTrigger id="occupation_select">
          <SelectValue placeholder="Seleccione una ocupación..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="arquitecto">Arquitecto</SelectItem>
          <SelectItem value="ingeniero">Ingeniero</SelectItem>
          <SelectItem value="docente">Docente</SelectItem>
          <SelectItem value="medico">Médico</SelectItem>
          <SelectItem value="otro">Otro (especificar en notas)</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <Label htmlFor="occupation_notes">Notas Adicionales</Label>
      <Textarea
        id="occupation_notes"
        name="notes"
        placeholder="Ej: Trabaja en oficina, muchas horas sentado."
      />
    </div>
  </div>
);

export const LifestyleForm = () => (
  <div className="space-y-4">
    {commonFields}
    <div className="space-y-2">
      <Label htmlFor="lifestyle_select">Hábito / Deporte</Label>
       <Select name="title" required>
        <SelectTrigger id="lifestyle_select">
          <SelectValue placeholder="Seleccione un hábito..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ciclismo">Ciclismo</SelectItem>
          <SelectItem value="natacion">Natación</SelectItem>
          <SelectItem value="gimnasio">Gimnasio</SelectItem>
          <SelectItem value="yoga">Yoga</SelectItem>
          <SelectItem value="otro">Otro (especificar en notas)</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <Label htmlFor="lifestyle_description">Descripción / Notas</Label>
      <Textarea
        id="lifestyle_description"
        name="description"
        placeholder="Ej: Corre 3 veces por semana, aprox. 5km."
        required
      />
    </div>
  </div>
);

export const AllergyForm = () => (
  <div className="space-y-4">
    {commonFields}
    <div className="space-y-2">
      <Label htmlFor="substance">Sustancia</Label>
      <Input id="substance" name="substance" placeholder="Ej: Penicilina" required />
    </div>
    <div className="space-y-2">
      <Label htmlFor="start_date">Fecha de Inicio / Detección</Label>
      <Input id="start_date" name="start_date" type="date" required />
    </div>
     <div className="space-y-2">
      <Label htmlFor="status">Estado</Label>
      <Select name="status" required>
        <SelectTrigger id="status">
          <SelectValue placeholder="Seleccione un estado..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="controlado">Controlado</SelectItem>
          <SelectItem value="no_controlado">No Controlado</SelectItem>
          <SelectItem value="en_observacion">En Observación</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <Label htmlFor="severity">Severidad</Label>
      <Select name="severity" required>
        <SelectTrigger id="severity">
          <SelectValue placeholder="Seleccione severidad..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="leve">Leve</SelectItem>
          <SelectItem value="moderada">Moderada</SelectItem>
          <SelectItem value="severa">Severa</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <Label htmlFor="reaction">Reacciones</Label>
      <Textarea id="reaction" name="reaction" placeholder="Ej: Urticaria, dificultad para respirar..." required />
    </div>
    <div className="space-y-2">
      <Label htmlFor="medication">Medicación para la Alergia</Label>
      <Input id="medication" name="medication" placeholder="Ej: Loratadina 10mg" />
    </div>
     <div className="space-y-2">
      <Label htmlFor="notes">Notas Adicionales</Label>
      <Textarea id="notes" name="notes" placeholder="Añadir comentarios..." />
    </div>
  </div>
);

export const ConditionForm = () => (
  <div className="space-y-4">
    {commonFields}
    <div className="space-y-2">
      <Label htmlFor="condition">Condición</Label>
      <Input
        id="condition"
        name="condition"
        placeholder="Ej: Hipertensión Arterial"
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="diagnosed_date">Fecha de Diagnóstico</Label>
      <Input id="diagnosed_date" name="diagnosed" type="date" required />
    </div>
  </div>
);

export const VaccinationForm = () => (
  <div className="space-y-4">
    {commonFields}
    <div className="space-y-2">
      <Label htmlFor="vaccine">Vacuna</Label>
      <Input
        id="vaccine"
        name="vaccine"
        placeholder="Ej: Gripe (Influenza)"
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="vaccination_date">Fecha de Aplicación</Label>
      <Input id="vaccination_date" name="date" type="date" required />
    </div>
  </div>
);

export const MedicationForm = () => (
  <div className="space-y-4">
    {commonFields}
    
    <div className="space-y-3">
        <Label>Tipo de Fórmula</Label>
        <RadioGroup name="formula_type" defaultValue="comercial" className="flex gap-4">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="comercial" id="comercial" />
                <Label htmlFor="comercial" className="font-normal">Comercial</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="generico" id="generico" />
                <Label htmlFor="generico" className="font-normal">Genérico</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="magistral" id="magistral" />
                <Label htmlFor="magistral" className="font-normal">Magistral</Label>
            </div>
        </RadioGroup>
    </div>

    <div className="space-y-2">
      <Label htmlFor="medication_name">Nombre del Medicamento</Label>
      <Input id="medication_name" name="name" placeholder="Ej: Losartán" required />
    </div>
    
    <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="administration_route">Vía de Administración</Label>
            <Input id="administration_route" name="route" placeholder="Ej: Oral" required />
        </div>
        <div className="space-y-2">
            <Label htmlFor="presentation">Presentación</Label>
            <Input id="presentation" name="presentation" placeholder="Ej: Pastillas, Jarabe" required />
        </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="dosage">Dosis</Label>
            <Input id="dosage" name="dosage" placeholder="Ej: 50mg" required />
        </div>
        <div className="space-y-2">
            <Label htmlFor="quantity">Cantidad</Label>
            <Input id="quantity" name="quantity" type="number" placeholder="Ej: 30" required />
        </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="frequency">Frecuencia</Label>
            <Input id="frequency" name="frequency" type="number" placeholder="Ej: 8" required />
        </div>
        <div className="space-y-2">
            <Label htmlFor="frequency_unit">Unidad de Frecuencia</Label>
            <Select name="frequency_unit" required>
                <SelectTrigger id="frequency_unit"><SelectValue placeholder="Seleccione..." /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="horas">Horas</SelectItem>
                    <SelectItem value="dias">Días</SelectItem>
                    <SelectItem value="minutos">Minutos</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="duration">Duración</Label>
            <Input id="duration" name="duration" type="number" placeholder="Ej: 30" required />
        </div>
        <div className="space-y-2">
            <Label htmlFor="duration_unit">Unidad de Duración</Label>
            <Select name="duration_unit" required>
                <SelectTrigger id="duration_unit"><SelectValue placeholder="Seleccione..." /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="dias">Días</SelectItem>
                    <SelectItem value="semanas">Semanas</SelectItem>
                    <SelectItem value="meses">Meses</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>

    <div className="space-y-2">
      <Label htmlFor="medication_details">Comentario / Detalle</Label>
      <Textarea id="medication_details" name="details" placeholder="Ej: Tomar con alimentos" />
    </div>
  </div>
);

export const IncapacityForm = () => (
  <div className="space-y-4">
    {commonFields}
    <div className="space-y-2">
      <Label htmlFor="specialty">Especialidad</Label>
      <Input
        id="specialty"
        name="specialty"
        placeholder="Ej: Traumatología"
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="type">Tipo de Incapacidad</Label>
      <Select name="type" required>
        <SelectTrigger id="type">
          <SelectValue placeholder="Seleccione un tipo..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Parcial">Parcial</SelectItem>
          <SelectItem value="Permanente">Permanente</SelectItem>
          <SelectItem value="Prorroga">Prórroga</SelectItem>
          <SelectItem value="Unica">Única</SelectItem>
        </SelectContent>
      </Select>
    </div>
     <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="start_date">Fecha de Inicio</Label>
            <Input id="start_date" name="startDate" type="date" required />
        </div>
        <div className="space-y-2">
            <Label htmlFor="end_date">Fecha de Fin</Label>
            <Input id="end_date" name="endDate" type="date" required />
        </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="detail">Detalle / Diagnóstico</Label>
      <Textarea id="detail" name="detail" placeholder="Describa el motivo..." required />
    </div>
     <div className="space-y-2">
      <Label htmlFor="certificate">Certificado (Archivo)</Label>
      <Input id="certificate" name="certificate" type="file" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="status">Estado</Label>
      <Select name="status" required defaultValue="Activa">
        <SelectTrigger id="status">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Activa">Activa</SelectItem>
          <SelectItem value="Finalizada">Finalizada</SelectItem>
           <SelectItem value="Anulada">Anulada</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);
