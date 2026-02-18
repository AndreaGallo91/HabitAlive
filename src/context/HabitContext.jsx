import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { getToday, formatDate } from '../utils/dateHelpers';
import { calculateStreak } from '../utils/streakTracker';
import { calculateLevel, xpProgress, getTitleForLevel, XP_REWARDS } from '../utils/xpCalculator';

const HabitContext = createContext();

const DEFAULT_PROFILE = {
  xp: 0,
  level: 0,
  title: '🌱 Novizio',
  currentStreak: 0,
  bestStreak: 0,
  streakShieldAvailable: false,
  totalHabitsCompleted: 0,
  totalDaysActive: 0,
  achievements: [],
  joinedAt: getToday(),
  activeTheme: 'default',
};

export function HabitProvider({ children }) {
  const [habits, setHabits] = useState(() => loadFromStorage('HABITS') || []);
  const [logs, setLogs] = useState(() => loadFromStorage('LOGS') || {});
  const [profile, setProfile] = useState(() => loadFromStorage('PROFILE') || DEFAULT_PROFILE);
  const [pendingXP, setPendingXP] = useState(null);
  const [newAchievements, setNewAchievements] = useState([]);

  useEffect(() => { saveToStorage('HABITS', habits); }, [habits]);
  useEffect(() => { saveToStorage('LOGS', logs); }, [logs]);
  useEffect(() => { saveToStorage('PROFILE', profile); }, [profile]);

  const addHabit = useCallback((habitData) => {
    const newHabit = {
      id: uuidv4(),
      ...habitData,
      createdAt: getToday(),
      isActive: true,
    };
    setHabits((prev) => [...prev, newHabit]);
    return newHabit;
  }, []);

  const updateHabit = useCallback((id, updates) => {
    setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, ...updates } : h)));
  }, []);

  const deleteHabit = useCallback((id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const reorderHabits = useCallback((newOrder) => {
    setHabits(newOrder);
  }, []);

  const toggleHabit = useCallback((habitId, date) => {
    const dateKey = date || getToday();
    
    setLogs((prev) => {
      const dayLog = prev[dateKey] || { date: dateKey, completions: {} };
      const current = dayLog.completions[habitId];
      const wasCompleted = current?.completed;
      const newCompleted = !wasCompleted;

      const newLog = {
        ...prev,
        [dateKey]: {
          ...dayLog,
          completions: {
            ...dayLog.completions,
            [habitId]: {
              completed: newCompleted,
              completedAt: newCompleted ? new Date().toISOString() : null,
            },
          },
        },
      };
      return newLog;
    });
  }, []);

  const addXP = useCallback((amount, source) => {
    setProfile((prev) => {
      const newXP = prev.xp + amount;
      const newLevel = calculateLevel(newXP);
      const titleInfo = getTitleForLevel(newLevel);
      const leveledUp = newLevel > prev.level;

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        title: `${titleInfo.emoji} ${titleInfo.title}`,
      };
    });
    setPendingXP({ amount, source });
    setTimeout(() => setPendingXP(null), 2000);
  }, []);

  const unlockAchievement = useCallback((achievementId) => {
    setProfile((prev) => {
      if (prev.achievements.includes(achievementId)) return prev;
      return {
        ...prev,
        achievements: [...prev.achievements, achievementId],
      };
    });
  }, []);

  const dismissAchievement = useCallback(() => {
    setNewAchievements((prev) => prev.slice(1));
  }, []);

  const queueAchievement = useCallback((achievement) => {
    setNewAchievements((prev) => [...prev, achievement]);
  }, []);

  useEffect(() => {
    const streak = calculateStreak(logs);
    setProfile((prev) => ({
      ...prev,
      currentStreak: streak.current,
      bestStreak: Math.max(prev.bestStreak, streak.best),
      totalDaysActive: Object.keys(logs).filter((date) => {
        const completions = logs[date]?.completions;
        return completions && Object.values(completions).some((c) => c.completed);
      }).length,
      totalHabitsCompleted: Object.values(logs).reduce((sum, dayLog) => {
        if (!dayLog.completions) return sum;
        return sum + Object.values(dayLog.completions).filter((c) => c.completed).length;
      }, 0),
    }));
  }, [logs]);

  const getCompletionsForDate = useCallback((date) => {
    return logs[date]?.completions || {};
  }, [logs]);

  const getActiveHabits = useCallback(() => {
    return habits.filter((h) => h.isActive);
  }, [habits]);

  const value = {
    habits,
    logs,
    profile,
    pendingXP,
    newAchievements,
    addHabit,
    updateHabit,
    deleteHabit,
    reorderHabits,
    toggleHabit,
    addXP,
    unlockAchievement,
    queueAchievement,
    dismissAchievement,
    getCompletionsForDate,
    getActiveHabits,
    setProfile,
  };

  return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>;
}

export function useHabitContext() {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabitContext must be used within a HabitProvider');
  }
  return context;
}
