"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from './types';

interface ProfileContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
  isLoading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STORAGE_KEY = 'laksh_profile';
const ONBOARDED_KEY = 'laksh_onboarded';

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [isOnboarded, setIsOnboardedState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(STORAGE_KEY);
      const savedOnboarded = localStorage.getItem(ONBOARDED_KEY);
      
      if (savedProfile) {
        setProfileState(JSON.parse(savedProfile));
      }
      if (savedOnboarded === 'true') {
        setIsOnboardedState(true);
      }
    } catch (error) {
      console.error('Error loading profile from localStorage:', error);
    }
    setIsLoading(false);
  }, []);

  // Save profile to localStorage
  const setProfile = (newProfile: UserProfile | null) => {
    setProfileState(newProfile);
    if (newProfile) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Save onboarded status to localStorage
  const setIsOnboarded = (value: boolean) => {
    setIsOnboardedState(value);
    localStorage.setItem(ONBOARDED_KEY, String(value));
    if (!value) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(ONBOARDED_KEY);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, setProfile, isOnboarded, setIsOnboarded, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
