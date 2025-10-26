import { z } from 'zod';

export const templateFieldSchema = z.object({
  field_code: z
    .string()
    .min(1, 'El código es requerido')
    .max(10, 'Máximo 10 caracteres'),
  name: z.string().min(1, 'El nombre es requerido'),
  data_type: z.enum(['string', 'double', 'boolean', 'date']),
  unit: z.string().optional(),
});

export const createTemplateSchema = z.object({
  name: z.string().min(1, 'El nombre de la plantilla es requerido'),
  description: z.string().optional(),
  type: z.enum(['clinical_report', 'laboratory_template', 'treatment_control']),
  fields: z.array(templateFieldSchema).min(1, 'Debe añadir al menos un campo'),
});

export type CreateTemplateValues = z.infer<typeof createTemplateSchema>;
