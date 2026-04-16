export type Category = 'general' | 'obc' | 'sc' | 'st' | 'ews' | 'pwd';

export type EligibilityStatus = 'eligible' | 'near-eligible' | 'ineligible';

export type IndianState = 
  | 'all'
  | 'maharashtra'
  | 'uttar-pradesh'
  | 'karnataka'
  | 'tamil-nadu'
  | 'rajasthan'
  | 'gujarat'
  | 'madhya-pradesh'
  | 'bihar'
  | 'west-bengal'
  | 'andhra-pradesh';

export type Language = 'english' | 'hindi' | 'marathi' | 'tamil' | 'telugu' | 'kannada' | 'gujarati';

export interface UserProfile {
  // Personal
  name: string;
  age: number;
  category: Category;
  state: IndianState;
  language: Language;
  
  // Education
  degree: string;
  graduationYear: number;
  percentage: number;
  
  // Skills
  skills: string[];
  certifications: string[];
}

export interface JobSubject {
  name: string;
  topics: string[];
  weightage: number;
}

export interface LanguageResource {
  language: Language;
  mockTestUrl: string;
  studyMaterialUrl: string;
  label: string;
}

export interface EligibilityStep {
  title: string;
  description: string;
  actionUrl?: string;
  duration?: string;
}

export interface Job {
  id: string;
  name: string;
  fullName: string;
  department: string;
  description: string;
  salary: string;
  vacancies: number;
  examDate: string;
  applicationDeadline: string;
  officialUrl: string;
  state: IndianState;
  syllabus: string[];
  subjects: JobSubject[];
  languageResources: LanguageResource[];
  requirements: {
    minAge: number;
    maxAge: Record<Category, number>;
    minEducation: 'graduation' | '12th' | '10th';
    minPercentage: number;
    requiredCertifications?: string[];
    attempts?: Record<string, number>;
  };
  tips: string[];
  ineligibilitySteps: Record<string, EligibilityStep[]>;
}

export interface EligibilityResult {
  job: Job;
  status: EligibilityStatus;
  probability: number;
  reasons: string[];
  qualifications: string[];
  gaps: string[];
}

export interface WeaknessArea {
  subject: string;
  score: number;
  maxScore: number;
  recommendation: string;
}

export interface Course {
  id: string;
  name: string;
  provider: string;
  duration: string;
  description: string;
  link: string;
}

export interface Scholarship {
  id: string;
  name: string;
  organization: string;
  amount: string;
  eligibility: string;
  deadline: string;
}

export interface MockQuestion {
  id: string;
  question: Record<Language, string>;
  options: Record<Language, string[]>;
  correctAnswer: number;
  subject: string;
}

export interface MockTest {
  jobId: string;
  questions: MockQuestion[];
}
