export type Category = 'general' | 'obc' | 'sc' | 'st' | 'ews' | 'pwd';

export type EligibilityStatus = 'ELIGIBLE' | 'NOT ELIGIBLE';

export interface UserProfile {
  // Personal
  name: string;
  age: number;
  category: Category;
  stateDomicile: string;
  language: 'EN' | 'HI';
  
  // Education
  degree: string;
  graduationYear: number;
  percentage: number;
  
  // Skills / Subjects
  skills: string[];
  certifications: string[];
  subjects: string[];
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
  syllabus: string[];
  requirements: {
    minAge: number;
    maxAge: Record<Category, number>;
    minEducation: 'graduation' | '12th' | '10th';
    minPercentage: number;
    attempts?: Record<string, number>;
  };
  tips: string[];
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
