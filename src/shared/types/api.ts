export interface ApiResponse<T = unknown> {
  code: number;
  status: string;
  messages?: string;
  data: T;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface AssessmentFormResponse {
  id: string;
  name: string;
  code: string;
  category: string;
  isActive: boolean;
  fields: AssessmentField[];
}

export interface AssessmentField {
  id: string;
  name: string;
  type:
    | 'text'
    | 'textarea'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'date'
    | 'number';
  required: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface CreateAssessmentRequest {
  formId: string;
  patientId: string;
  data: Record<string, unknown>;
  notes?: string;
}

export interface DiagnosisRequest {
  patientId: string;
  icd10Code: string;
  description: string;
  type: 'primary' | 'secondary';
  severity?: 'mild' | 'moderate' | 'severe';
  status: 'active' | 'resolved' | 'inactive';
  notes?: string;
}

export interface TherapyRequest {
  patientId: string;
  type: 'medication' | 'procedure' | 'therapy' | 'investigation';
  name: string;
  description: string;
  dosage?: string;
  frequency?: string;
  duration?: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'discontinued';
}

export interface CPPTRequest {
  patientId: string;
  soap: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
  vitalSigns?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
  };
  professionalId: string;
  professionalName: string;
  department: string;
}

export interface DischargePlanRequest {
  patientId: string;
  dischargeType: 'normal' | 'against_medical_advice' | 'transfer' | 'death';
  dischargeDate: string;
  followUpInstructions?: string;
  medications?: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  restrictions?: string[];
  nextAppointment?: {
    date: string;
    department: string;
    notes?: string;
  };
}

// Query keys factory
export const queryKeys = {
  all: ['api'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) =>
    [...queryKeys.lists(), { filters }] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: string | number) => [...queryKeys.details(), id] as const,
} as const;
