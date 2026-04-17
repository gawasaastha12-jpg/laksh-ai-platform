import { create } from 'zustand';
import { UserProfile } from './types';

interface AppState {
  profile: UserProfile;
  setProfile: (profile: Partial<UserProfile>) => void;
  setLanguage: (lang: 'EN' | 'HI') => void;
}

export const useAppStore = create<AppState>((set) => ({
  profile: {
    name: '',
    stateDomicile: '',
    language: 'EN',
    age: 0,
    education: '',
    degree: '',
    graduationYear: 0,
    percentage: 0,
    category: 'general',
    skills: [],
    certifications: [],
    subjects: [],
  },
  setProfile: (newProfile) => set((state) => ({ profile: { ...state.profile, ...newProfile } })),
  setLanguage: (lang) => set((state) => ({ profile: { ...state.profile, language: lang } })),
}));
