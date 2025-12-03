export type PredefinedField = {
    field_code: string;
    name: string;
    data_type: 'string' | 'double' | 'boolean' | 'date';
    unit?: string;
}

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

export type Medication = {
    formula_type: 'comercial' | 'generico' | 'magistral';
    name: string;
    route: string;
    dosage: string;
    quantity: number;
    presentation: string;
    frequency: number;
    frequency_unit: 'horas' | 'dias' | 'minutos';
    duration: number;
    duration_unit: 'dias' | 'semanas' | 'meses';
    details?: string;
}


export type Patient = {
    id: string;
    name: string;
    lastName: string;
    document: string;
    email: string;
    phone: string;
    birthDate: string;
    gender: string;
    address: string;
    city: string;
    country: string;
    lastVisit: string;
    occupation?: string;
    lifestyle?: { title: string; description: string }[];
    allergies?: { substance: string; reaction: string; severity: 'leve' | 'moderada' | 'severa' }[];
    chronicConditions?: { condition: string; diagnosed: string }[];
    disabilities?: { disability: string; details: string }[];
    vaccinations?: { vaccine: string; date: string }[];
    currentMedication?: Medication[];
    incapacities?: { type: string; specialty: string; startDate: string; endDate: string, detail: string, status: string }[];
}

export const PATIENTS_DATA: Patient[] = [
    { 
        id: 'p1', 
        name: 'Juan', 
        lastName: 'Pérez', 
        document: '12345678A', 
        email: 'juan.perez@example.com', 
        phone: '611223344',
        birthDate: '1979-03-15',
        gender: 'Masculino',
        address: 'Calle Falsa 123',
        city: 'Madrid',
        country: 'España',
        lastVisit: '2024-05-10',
        occupation: 'Arquitecto',
        lifestyle: [
            { title: 'Ejercicio', description: 'Corre 3 veces por semana.' },
            { title: 'Dieta', description: 'Dieta mediterránea, bajo en sal.' },
        ],
        allergies: [
            { substance: 'Penicilina', reaction: 'Urticaria', severity: 'moderada' },
        ],
        chronicConditions: [
            { condition: 'Hipertensión Arterial', diagnosed: '2020-01-10' },
            { condition: 'Diabetes Mellitus Tipo 2', diagnosed: '2022-06-20' },
        ],
        disabilities: [],
        vaccinations: [
            { vaccine: 'Gripe (Influenza)', date: '2023-10-05' },
            { vaccine: 'COVID-19 (Refuerzo)', date: '2023-12-15' },
        ],
        currentMedication: [
            { 
                formula_type: 'generico',
                name: 'Losartán',
                dosage: '50mg',
                route: 'Oral',
                quantity: 30,
                presentation: 'Pastillas',
                frequency: 24,
                frequency_unit: 'horas',
                duration: 6,
                duration_unit: 'meses',
                details: 'Tomar por la mañana.'
            },
            {
                formula_type: 'comercial',
                name: 'Metformina',
                dosage: '850mg',
                route: 'Oral',
                quantity: 60,
                presentation: 'Pastillas',
                frequency: 12,
                frequency_unit: 'horas',
                duration: 6,
                duration_unit: 'meses',
                details: 'Tomar con las comidas.'
            }
        ],
        incapacities: [
            { type: 'Parcial', specialty: 'Traumatología', startDate: '2023-01-10', endDate: '2023-01-25', detail: 'Esguince de tobillo', status: 'Finalizada' }
        ]
    },
    { id: 'p2', name: 'María', lastName: 'Gómez', document: '87654321B', email: 'maria.gomez@example.com', phone: '622334455', birthDate: '1990-07-22', gender: 'Femenino', address: 'Avenida Siempre Viva 742', city: 'Barcelona', country: 'España', lastVisit: '2024-05-08' },
    { id: 'p3', name: 'Carlos', lastName: 'López', document: '11223344C', email: 'carlos.lopez@example.com', phone: '633445566', birthDate: '1985-11-02', gender: 'Masculino', address: 'Plaza Mayor 1', city: 'Sevilla', country: 'España', lastVisit: '2024-04-22' },
    { id: 'p4', name: 'Ana', lastName: 'Torres', document: '44556677D', email: 'ana.torres@example.com', phone: '644556677', birthDate: '2000-01-30', gender: 'Femenino', address: 'Calle Luna 4', city: 'Valencia', country: 'España', lastVisit: '2024-05-12' },
];

export const COUNTRIES_DATA = [
    { code: 'ES', name: 'España' },
    { code: 'MX', name: 'México' },
    { code: 'CO', name: 'Colombia' },
    { code: 'AR', name: 'Argentina' },
    { code: 'PE', name: 'Perú' },
    { code: 'VE', name: 'Venezuela' },
    { code: 'CL', name: 'Chile' },
    { code: 'EC', name: 'Ecuador' },
    { code: 'GT', name: 'Guatemala' },
    { code: 'US', name: 'Estados Unidos' },
];


export const PREDEFINED_FIELDS_DATA: PredefinedField[] = [
    { field_code: 'MOTCON', name: 'Motivo de Consulta', data_type: 'string' },
    { field_code: 'ANTEC', name: 'Antecedentes Relevantes', data_type: 'string' },
    { field_code: 'PRES_ART', name: 'Presión Arterial', data_type: 'string', unit: 'mmHg' },
    { field_code: 'TEMP', name: 'Temperatura', data_type: 'double', unit: '°C' },
    { field_code: 'GLUC', name: 'Glucosa', data_type: 'double', unit: 'mg/dL' },
    { field_code: 'DIAG_PLAN', name: 'Diagnóstico y Plan', data_type: 'string' },
    { field_code: 'DOL_TOR', name: 'Dolor Torácico', data_type: 'boolean' },
    { field_code: 'ECG_RES', name: 'Resultado ECG', data_type: 'string' },
    { field_code: 'COLES_LDL', name: 'Colesterol LDL', data_type: 'double', unit: 'mg/dL' },
    { field_code: 'COLES_HDL', name: 'Colesterol HDL', data_type: 'double', unit: 'mg/dL' },
    { field_code: 'GLU_PRE', name: 'Glucosa Pre-prandial', data_type: 'double', unit: 'mg/dL' },
    { field_code: 'GLU_POST', name: 'Glucosa Post-prandial', data_type: 'double', unit: 'mg/dL' },
    { field_code: 'SINTOMAS', name: 'Síntomas Reportados', data_type: 'string' },
    { field_code: 'HERIDA_Q', name: 'Aspecto de Herida Quirúrgica', data_type: 'string' },
    { field_code: 'DOLOR_ESC', name: 'Escala de Dolor (1-10)', data_type: 'double' },
    { field_code: 'FIEBRE', name: 'Fiebre', data_type: 'boolean' },
    { field_code: 'HEMO', name: 'Hemoglobina', data_type: 'double', unit: 'g/dL' },
    { field_code: 'HEMAT', name: 'Hematocrito', data_type: 'double', unit: '%' },
    { field_code: 'PLAQ', name: 'Plaquetas', data_type: 'double', unit: 'x10^3/μL' },
    { field_code: 'PESO', name: 'Peso Corporal', data_type: 'double', unit: 'kg' },
    { field_code: 'TALLA', name: 'Talla', data_type: 'double', unit: 'cm' },
    { field_code: 'IMC', name: 'Índice de Masa Corporal (IMC)', data_type: 'double', unit: 'kg/m²' },
    { field_code: 'SAT_O2', name: 'Saturación de Oxígeno', data_type: 'double', unit: '%' },
    { field_code: 'FREQ_CARD', name: 'Frecuencia Cardíaca', data_type: 'double', unit: 'lpm' },
    { field_code: 'FREQ_RESP', name: 'Frecuencia Respiratoria', data_type: 'double', unit: 'rpm' },
];

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
      { id: 'f6', field_code: 'DIAG_PLAN', name: 'Diagnóstico y Plan', data_type: 'string' },
    ],
  },
  {
    id: 'tpl_cardiologia',
    name: 'Cardiología',
    description: 'Plantilla para seguimiento cardiológico.',
    type: 'clinical_report',
    fields: [
      { id: 'c1', field_code: 'DOL_TOR', name: 'Dolor Torácico', data_type: 'boolean' },
      { id: 'c2', field_code: 'ECG_RES', name: 'Resultado ECG', data_type: 'string' },
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
