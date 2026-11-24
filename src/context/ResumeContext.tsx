import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import type { ResumeData, ExperienceEntry, EducationEntry, SkillEntry, AchievementEntry, HobbyEntry } from '@types';
import { DEFAULT_RESUME, isResumePageSize } from '@types';
import { generateId } from '@utils/helpers';

interface ResumeContextType {
  resume: ResumeData;
  updateResume: (updates: Partial<ResumeData>) => void;
  updateField: <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => void;
  toggleSection: (section: keyof ResumeData['sections']) => void;

  // Experience
  addExperience: () => void;
  updateExperience: (id: string, updates: Partial<ExperienceEntry>) => void;
  removeExperience: (id: string) => void;

  // Education
  addEducation: () => void;
  updateEducation: (id: string, updates: Partial<EducationEntry>) => void;
  removeEducation: (id: string) => void;

  // Skills
  addSkill: (label: string, initialValue?: number) => void;
  updateSkill: (id: string, updates: Partial<SkillEntry>) => void;
  removeSkill: (id: string) => void;

  // Achievements
  addAchievement: () => void;
  updateAchievement: (id: string, updates: Partial<AchievementEntry>) => void;
  removeAchievement: (id: string) => void;

  // Hobbies
  addHobby: (value: string) => void;
  removeHobby: (id: string) => void;

  resetResume: () => void;
  isLoaded: boolean;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const STORAGE_KEY = 'quiet-resume';

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resume, setResume] = useState<ResumeData>(DEFAULT_RESUME);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      // Check for legacy or new storage key
      const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('resume-data');
      if (stored) {
        const parsed = JSON.parse(stored);
        setResume(prev => ({
          ...prev,
          ...parsed,
          sections: { ...prev.sections, ...(parsed.sections || {}) },
          pageSize: isResumePageSize(parsed.pageSize) ? parsed.pageSize : prev.pageSize,
        }));
      }
    } catch (e) {
      console.error('Failed to load resume from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
      } catch (e) {
        console.error('Failed to save resume to localStorage:', e);
      }
    }
  }, [resume, isLoaded]);

  const updateResume = useCallback((updates: Partial<ResumeData>) => {
    setResume(prev => ({ ...prev, ...updates }));
  }, []);

  const updateField = useCallback(<K extends keyof ResumeData>(field: K, value: ResumeData[K]) => {
    setResume(prev => ({ ...prev, [field]: value }));
  }, []);

  const toggleSection = useCallback((section: keyof ResumeData['sections']) => {
    setResume(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: !prev.sections[section],
      },
    }));
  }, []);

  // Experience handlers
  const addExperience = useCallback(() => {
    const newEntry: ExperienceEntry = {
      id: generateId('exp'),
      role: 'New Role',
      company: 'Company Name',
      dates: { start: '2024', end: 'Present' },
      description: 'Describe your responsibilities, impact, and achievements.',
    };
    setResume(prev => ({
      ...prev,
      experience: [...prev.experience, newEntry],
    }));
  }, []);

  const updateExperience = useCallback((id: string, updates: Partial<ExperienceEntry>) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(item => item.id === id ? { ...item, ...updates } : item),
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.filter(item => item.id !== id),
    }));
  }, []);

  // Education handlers
  const addEducation = useCallback(() => {
    const newEntry: EducationEntry = {
      id: generateId('edu'),
      role: 'Degree or Certificate',
      company: 'Institution Name',
      dates: { start: '2020', end: '2024' },
      description: 'Relevant coursework, honors, or activities.',
    };
    setResume(prev => ({
      ...prev,
      education: [...prev.education, newEntry],
    }));
  }, []);

  const updateEducation = useCallback((id: string, updates: Partial<EducationEntry>) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.map(item => item.id === id ? { ...item, ...updates } : item),
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setResume(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id),
    }));
  }, []);

  // Skills handlers
  const addSkill = useCallback((label: string, initialValue = 85) => {
    if (!label.trim()) return;
    const newSkill: SkillEntry = {
      id: generateId('skill'),
      label: label.trim(),
      initialValue,
    };
    setResume(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  }, []);

  const updateSkill = useCallback((id: string, updates: Partial<SkillEntry>) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.map(item => item.id === id ? { ...item, ...updates } : item),
    }));
  }, []);

  const removeSkill = useCallback((id: string) => {
    setResume(prev => ({
      ...prev,
      skills: prev.skills.filter(item => item.id !== id),
    }));
  }, []);

  // Achievement handlers
  const addAchievement = useCallback(() => {
    const newEntry: AchievementEntry = {
      id: generateId('ach'),
      title: 'Key Achievement',
      value: 'Describe the measurable impact or recognition achieved.',
    };
    setResume(prev => ({
      ...prev,
      achievements: [...(prev.achievements || []), newEntry],
    }));
  }, []);

  const updateAchievement = useCallback((id: string, updates: Partial<AchievementEntry>) => {
    setResume(prev => ({
      ...prev,
      achievements: (prev.achievements || []).map(item => item.id === id ? { ...item, ...updates } : item),
    }));
  }, []);

  const removeAchievement = useCallback((id: string) => {
    setResume(prev => ({
      ...prev,
      achievements: (prev.achievements || []).filter(item => item.id !== id),
    }));
  }, []);

  // Hobbies handlers
  const addHobby = useCallback((value: string) => {
    if (!value.trim()) return;
    const newHobby: HobbyEntry = {
      id: generateId('hob'),
      value: value.trim(),
    };
    setResume(prev => ({
      ...prev,
      hobbies: [...(prev.hobbies || []), newHobby],
    }));
  }, []);

  const removeHobby = useCallback((id: string) => {
    setResume(prev => ({
      ...prev,
      hobbies: (prev.hobbies || []).filter(item => item.id !== id),
    }));
  }, []);

  const resetResume = useCallback(() => {
    setResume(DEFAULT_RESUME);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('resume-data');
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resume,
        updateResume,
        updateField,
        toggleSection,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        addAchievement,
        updateAchievement,
        removeAchievement,
        addHobby,
        removeHobby,
        resetResume,
        isLoaded,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within a ResumeProvider');
  return context;
}