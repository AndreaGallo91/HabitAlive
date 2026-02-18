import { useState, useCallback, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import { useHabitContext } from '../../context/HabitContext';
import { usePetContext } from '../../context/PetContext';
import { getToday, isToday } from '../../utils/dateHelpers';
import { XP_REWARDS } from '../../utils/xpCalculator';
import { ACHIEVEMENTS } from '../../data/achievements';
import DayNavigator from './DayNavigator';
import DailyProgress from './DailyProgress';
import HabitCard from './HabitCard';
import HabitForm from './HabitForm';
import StreakFlame from '../gamification/StreakFlame';
import PetMiniPreview from '../pet/PetMiniPreview';
import Confetti from '../gamification/Confetti';

export default function HabitList() {
  const {
    habits, profile, addHabit, updateHabit, deleteHabit, toggleHabit,
    addXP, getCompletionsForDate, getActiveHabits, unlockAchievement,
    queueAchievement,
  } = useHabitContext();
  const { pet } = usePetContext();

  const [selectedDate, setSelectedDate] = useState(getToday());
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevCompletedRef = useRef(new Set());

  const activeHabits = getActiveHabits();
  const completions = getCompletionsForDate(selectedDate);
  const todayMode = isToday(selectedDate);

  const handleToggle = useCallback((habitId) => {
    if (!todayMode) return;
    
    const wasCompleted = completions[habitId]?.completed;
    toggleHabit(habitId, selectedDate);

    if (!wasCompleted) {
      addXP(XP_REWARDS.COMPLETE_HABIT, 'habit');
      
      if (profile.totalHabitsCompleted === 0) {
        const ach = ACHIEVEMENTS.find((a) => a.id === 'primo-passo');
        if (ach && !profile.achievements.includes('primo-passo')) {
          unlockAchievement('primo-passo');
          queueAchievement(ach);
          addXP(XP_REWARDS.ACHIEVEMENT || 100, 'achievement');
        }
      }

      const newCompleted = activeHabits.filter(
        (h) => h.id === habitId || completions[h.id]?.completed
      ).length;
      
      if (newCompleted === activeHabits.length && activeHabits.length > 0) {
        addXP(XP_REWARDS.PERFECT_DAY, 'perfect_day');
        setShowConfetti(true);
        
        const ach = ACHIEVEMENTS.find((a) => a.id === 'giornata-perfetta');
        if (ach && !profile.achievements.includes('giornata-perfetta')) {
          unlockAchievement('giornata-perfetta');
          queueAchievement(ach);
          addXP(100, 'achievement');
        }
      }
    }
  }, [todayMode, completions, selectedDate, toggleHabit, addXP, profile, activeHabits, unlockAchievement, queueAchievement]);

  const handleSaveHabit = useCallback((data) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, data);
    } else {
      addHabit(data);
      
      const totalHabits = habits.length + 1;
      if (totalHabits >= 5 && !profile.achievements.includes('collezionista')) {
        const ach = ACHIEVEMENTS.find((a) => a.id === 'collezionista');
        if (ach) {
          unlockAchievement('collezionista');
          queueAchievement(ach);
          addXP(100, 'achievement');
        }
      }
    }
    setShowForm(false);
    setEditingHabit(null);
  }, [editingHabit, updateHabit, addHabit, habits, profile, unlockAchievement, queueAchievement, addXP]);

  const handleDeleteHabit = useCallback((id) => {
    deleteHabit(id);
    setShowForm(false);
    setEditingHabit(null);
  }, [deleteHabit]);

  useEffect(() => {
    const streak = profile.currentStreak;
    if (streak >= 7 && !profile.achievements.includes('guerriero-settimana')) {
      const ach = ACHIEVEMENTS.find((a) => a.id === 'guerriero-settimana');
      if (ach) { unlockAchievement('guerriero-settimana'); queueAchievement(ach); addXP(100, 'achievement'); }
    }
    if (streak >= 30 && !profile.achievements.includes('signore-mese')) {
      const ach = ACHIEVEMENTS.find((a) => a.id === 'signore-mese');
      if (ach) { unlockAchievement('signore-mese'); queueAchievement(ach); addXP(100, 'achievement'); }
    }
    if (profile.xp >= 1000 && !profile.achievements.includes('cacciatore-xp')) {
      const ach = ACHIEVEMENTS.find((a) => a.id === 'cacciatore-xp');
      if (ach) { unlockAchievement('cacciatore-xp'); queueAchievement(ach); addXP(100, 'achievement'); }
    }
    if (profile.level >= 5 && !profile.achievements.includes('club-livello-5')) {
      const ach = ACHIEVEMENTS.find((a) => a.id === 'club-livello-5');
      if (ach) { unlockAchievement('club-livello-5'); queueAchievement(ach); addXP(100, 'achievement'); }
    }
    if (profile.level >= 10 && !profile.achievements.includes('club-livello-10')) {
      const ach = ACHIEVEMENTS.find((a) => a.id === 'club-livello-10');
      if (ach) { unlockAchievement('club-livello-10'); queueAchievement(ach); addXP(100, 'achievement'); }
    }
  }, [profile.currentStreak, profile.xp, profile.level, profile.achievements, unlockAchievement, queueAchievement, addXP]);

  return (
    <div className="space-y-3">
      <DayNavigator selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <div className="flex items-center justify-between px-1">
        <StreakFlame compact />
        <PetMiniPreview />
      </div>

      <DailyProgress selectedDate={selectedDate} />

      <div className="space-y-2">
        {activeHabits.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🌱</div>
            <p className="text-[var(--color-text-secondary)] text-sm mb-1">
              Nessuna abitudine ancora
            </p>
            <p className="text-[var(--color-text-muted)] text-xs">
              Crea la tua prima abitudine per iniziare!
            </p>
          </div>
        ) : (
          activeHabits.map((habit) => (
            <div key={habit.id} className="animate-slide-up">
              <HabitCard
                habit={habit}
                isCompleted={!!completions[habit.id]?.completed}
                onToggle={() => handleToggle(habit.id)}
                disabled={!todayMode}
              />
              {todayMode && (
                <button
                  onClick={() => { setEditingHabit(habit); setShowForm(true); }}
                  className="text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] ml-12 mt-0.5 transition-colors"
                >
                  modifica
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {todayMode && (
        <button
          onClick={() => { setEditingHabit(null); setShowForm(true); }}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed transition-all hover:border-[var(--color-primary)] hover:bg-[var(--color-surface)]"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
        >
          <Plus size={18} />
          <span className="text-sm font-medium">Nuova Abitudine</span>
        </button>
      )}

      {showForm && (
        <HabitForm
          habit={editingHabit}
          onSave={handleSaveHabit}
          onDelete={handleDeleteHabit}
          onClose={() => { setShowForm(false); setEditingHabit(null); }}
        />
      )}

      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />
    </div>
  );
}
