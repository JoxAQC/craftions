export type TemplateField = {
  id: string;
  field_code: string;
  name: string;
  data_type: 'string' | 'double' | 'boolean' | 'date';
  unit?: string;
};

export type Template = {
  id: string;
  name: string;
  description: string;
  type: 'clinical_report' | 'laboratory_template' | 'treatment_control';
  fields: TemplateField[];
};

export type Treatment = {
    id: string;
    name: string;
    description: string;
}

export const TREATMENTS_DATA: Treatment[] = [
    { id: 'treat_htn', name: 'Tratamiento de Hipertensión', description: 'Seguimiento y control de la hipertensión arterial.' },
    { id: 'treat_dbts', name: 'Control de Diabetes Mellitus 2', description: 'Monitorización de glucosa y ajuste de tratamiento.' },
    { id: 'treat_postop', name: 'Cuidado Post-Operatorio', description: 'Revisión de herida quirúrgica y recuperación.' },
];

export const TEMPLATES_DATA: Template[] = [
  {
    id: 'tpl_med_general',
    name: 'Medicina General',
    description: 'Plantilla base para consultas de medicina general.',
    type: 'clinical_report',
    fields: [
      { id: 'f1', field_code: 'MOTCON', name: 'Motivo de Consulta', data_type: 'string' },
      { id: 'f2', field_code: 'ANTEC', name: 'Antecedentes Relevantes', data_type: 'string' },
      { id: 'f3', field_code: 'PRES_ART', name: 'Presión Arterial', data_type: 'string', unit: 'mmHg' },
      { id: 'f4', field_code: 'TEMP', name: 'Temperatura', data_type: 'double', unit: '°C' },
      { id: 'f5', field_code: 'GLUC', name: 'Glucosa', data_type: 'double', unit: 'mg/dL' },
      { id: 'f6', field_code: 'DIAG', name: 'Diagnóstico y Plan', data_type: 'string' },
    ],
  },
  {
    id: 'tpl_cardiologia',
    name: 'Cardiología',
    description: 'Plantilla para seguimiento cardiológico.',
    type: 'clinical_report',
    fields: [
      { id: 'c1', field_code: 'DOL_TOR', name: 'Dolor Torácico', data_type: 'boolean' },
      { id: 'c2', field_code: 'ECG', name: 'Resultado ECG', data_type: 'string' },
      { id: 'c3', field_code: 'COLES_LDL', name: 'Colesterol LDL', data_type: 'double', unit: 'mg/dL' },
      { id: 'c4', field_code: 'COLES_HDL', name: 'Colesterol HDL', data_type: 'double', unit: 'mg/dL' },
    ],
  },
   {
    id: 'tpl_control_diabetes',
    name: 'Control Diabetes',
    description: 'Plantilla para el control de la diabetes.',
    type: 'treatment_control',
    fields: [
        { id: 'd1', field_code: 'GLU_PRE', name: 'Glucosa Pre-prandial', data_type: 'double', unit: 'mg/dL' },
        { id: 'd2', field_code: 'GLU_POST', name: 'Glucosa Post-prandial', data_type: 'double', unit: 'mg/dL' },
        { id: 'd3', field_code: 'SINTOMAS', name: 'Síntomas Reportados', data_type: 'string' },
    ],
  },
  {
    id: 'tpl_control_postop',
    name: 'Control Post-Operatorio',
    description: 'Plantilla para el seguimiento post-operatorio.',
    type: 'treatment_control',
    fields: [
        { id: 'po1', field_code: 'HERIDA_Q', name: 'Aspecto de Herida Quirúrgica', data_type: 'string' },
        { id: 'po2', field_code: 'DOLOR_ESC', name: 'Escala de Dolor (1-10)', data_type: 'double' },
        { id: 'po3', field_code: 'FIEBRE', name: 'Fiebre', data_type: 'boolean' },
    ],
  },
  {
    id: 'tpl_lab_basico',
    name: 'Laboratorio Básico',
    description: 'Resultados de laboratorio de rutina.',
    type: 'laboratory_template',
    fields: [
      { id: 'l1', field_code: 'HEMO', name: 'Hemoglobina', data_type: 'double', unit: 'g/dL' },
      { id: 'l2', field_code: 'HEMAT', name: 'Hematocrito', data_type: 'double', unit: '%' },
      { id: 'l3', field_code: 'PLAQ', name: 'Plaquetas', data_type: 'double', unit: 'x10^3/μL' },
    ],
  },
];

export const ANTECEDENTS_DATA = [
    { id: 'a1', date: '2023-05-10', type: 'Personal', description: 'Hipertensión Arterial diagnosticada en 2020. En tratamiento con Losartán 50mg/día.' },
    { id: 'a2', date: '2022-11-20', type: 'Quirúrgico', description: 'Apendicectomía.' },
    { id: 'a3', date: '2021-01-15', type: 'Alérgico', description: 'Alergia a la penicilina.' },
    { id: 'a4', date: '2024-01-10', type: 'Personal', description: 'Diabetes tipo 2 diagnosticada en 2024.' },
];

export const LAB_RESULTS_DATA = [
    { id: 'lr1', date: '2024-03-01', test: 'Perfil Lipídico', result: 'Colesterol Total: 210 mg/dL, LDL: 140 mg/dL, HDL: 45 mg/dL.' },
    { id: 'lr2', date: '2024-03-01', test: 'Hemograma', result: 'Glóbulos Rojos: 4.5 M/μL, Hemoglobina: 14 g/dL.' },
    { id: 'lr3', date: '2023-09-15', test: 'Glucosa en Ayunas', result: '115 mg/dL.' },
];
