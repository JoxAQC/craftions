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
      <Label htmlFor="occupation">Ocupación</Label>
      <Input
        id="occupation"
        name="occupation"
        placeholder="Ej: Arquitecto"
        required
      />
    </div>
  </div>
);

export const LifestyleForm = () => (
  <div className="space-y-4">
    {commonFields}
    <div className="space-y-2">
      <Label htmlFor="lifestyle_title">Hábito</Label>
      <Input id="lifestyle_title" name="title" placeholder="Ej: Ejercicio" required />
    </div>
    <div className="space-y-2">
      <Label htmlFor="lifestyle_description">Descripción</Label>
      <Textarea
        id="lifestyle_description"
        name="description"
        placeholder="Ej: Corre 3 veces por semana"
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
      <Label htmlFor="reaction">Reacción</Label>
      <Input id="reaction" name="reaction" placeholder="Ej: Urticaria" required />
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
    <div className="space-y-2">
      <Label htmlFor="medication">Medicamento</Label>
      <Input id="medication" name="medication" placeholder="Ej: Losartán" required />
    </div>
    <div className="space-y-2">
      <Label htmlFor="dosage">Dosis</Label>
      <Input id="dosage" name="dosage" placeholder="Ej: 50mg" required />
    </div>
    <div className="space-y-2">
      <Label htmlFor="frequency">Frecuencia</Label>
      <Input
        id="frequency"
        name="frequency"
        placeholder="Ej: 1 vez al día"
        required
      />
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
