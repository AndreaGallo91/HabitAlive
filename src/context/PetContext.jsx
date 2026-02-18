import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { getStageForLevel, getDominantCategory, getCategoryToPetType, calculatePetEnergy, calculatePetMood, calculatePetPower } from '../utils/petEvolution';
import { useHabitContext } from './HabitContext';
import { getToday } from '../utils/dateHelpers';

const PetContext = createContext();

const DEFAULT_PET = {
  type: 'prismo',
  stage: 'cucciolo',
  energy: 50,
  mood: 50,
  power: 0,
  activeSkin: 'default',
  unlockedSkins: ['default'],
  dominantCategory: 'balanced',
  transitionProgress: 0,
  lastEnergyReset: null,
};

export function PetProvider({ children }) {
  const [pet, setPet] = useState(() => loadFromStorage('PET') || DEFAULT_PET);
  const { habits, logs, profile } = useHabitContext();

  useEffect(() => { saveToStorage('PET', pet); }, [pet]);

  useEffect(() => {
    const today = getToday();
    const todayCompletions = logs[today]?.completions || {};
    const activeHabits = habits.filter((h) => h.isActive);
    
    const energy = calculatePetEnergy(todayCompletions, activeHabits.length);
    const mood = calculatePetMood(profile.currentStreak, false);
    const power = calculatePetPower(profile.level, profile.achievements.length, 0);
    const stage = getStageForLevel(profile.level);
    const dominantCategory = getDominantCategory(logs, habits);
    const petType = getCategoryToPetType(dominantCategory);

    setPet((prev) => ({
      ...prev,
      energy,
      mood,
      power,
      stage,
      dominantCategory,
      type: prev.type !== petType ? petType : prev.type,
    }));
  }, [habits, logs, profile]);

  const setSkin = useCallback((skinId) => {
    setPet((prev) => {
      if (!prev.unlockedSkins.includes(skinId)) return prev;
      return { ...prev, activeSkin: skinId };
    });
  }, []);

  const unlockSkin = useCallback((skinId) => {
    setPet((prev) => {
      if (prev.unlockedSkins.includes(skinId)) return prev;
      return { ...prev, unlockedSkins: [...prev.unlockedSkins, skinId] };
    });
  }, []);

  const value = {
    pet,
    setPet,
    setSkin,
    unlockSkin,
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
}

export function usePetContext() {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePetContext must be used within a PetProvider');
  }
  return context;
}
