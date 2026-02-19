import { useState, useCallback, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useHabitContext } from '../../context/HabitContext';
import { usePetContext } from '../../context/PetContext';
import { getToday, isToday } from '../../utils/dateHelpers';
import { XP_REWARDS } from '../../utils/xpCalculator';
import { tryUnlockAchievement, checkProfileAchievements } from '../../utils/achievementChecker';
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

  const activeHabits = getActiveHabits();
  const completions = getCompletionsForDate(selectedDate);
  const todayMode = isToday(selectedDate);

  const achCtx = { profile, unlockAchievement, queueAchievement, addXP };

  const handleToggle = useCallback((habitId) => {
    if (!todayMode) return;

    const wasCompleted = completions[habitId]?.completed;
    toggleHabit(habitId, selectedDate);

    if (!wasCompleted) {
      addXP(XP_REWARDS.COMPLETE_HABIT, 'habit');
      tryUnlockAchievement('primo-passo', achCtx);

      const newCompleted = activeHabits.filter(
        (h) => h.id === habitId || completions[h.id]?.completed
      ).length;

      if (newCompleted === activeHabits.length && activeHabits.length > 0) {
        addXP(XP_REWARDS.PERFECT_DAY, 'perfect_day');
        setShowConfetti(true);
        tryUnlockAchievement('giornata-perfetta', achCtx);
      }
    }
  }, [todayMode, completions, selectedDate, toggleHabit, addXP, profile, activeHabits, unlockAchievement, queueAchievement]);

  const handleSaveHabit = useCallback((data) => {
    if (editingHabit) {
      updateHabit(editingHabit.id, data);
    } else {
      addHabit(data);
      if (habits.length + 1 >= 5) {
        tryUnlockAchievement('collezionista', achCtx);
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
    checkProfileAchievements(achCtx);
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
            <p className="text-sm text-[var(--color-text-secondary)] mb-1">
              Nessuna abitudine ancora
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
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
                onEdit={() => { setEditingHabit(habit); setShowForm(true); }}
                disabled={!todayMode}
              />
            </div>
          ))
        )}
      </div>

      {todayMode && (
        <button
          onClick={() => { setEditingHabit(null); setShowForm(true); }}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-[var(--color-border)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-primary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-secondary)] min-h-[44px] touch-bounce"
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
