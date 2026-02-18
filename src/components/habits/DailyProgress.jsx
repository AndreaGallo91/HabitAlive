import { useHabitContext } from '../../context/HabitContext';
import { Target } from 'lucide-react';

export default function DailyProgress({ selectedDate }) {
  const { getCompletionsForDate, getActiveHabits } = useHabitContext();
  const completions = getCompletionsForDate(selectedDate);
  const activeHabits = getActiveHabits();
  
  const total = activeHabits.length;
  const completed = activeHabits.filter((h) => completions[h.id]?.completed).length;
  const percentage = total > 0 ? (completed / total) * 100 : 0;
  const allDone = total > 0 && completed === total;

  return (
    <div
      className="p-3 rounded-xl border transition-all duration-300"
      style={{
        background: allDone
          ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))'
          : 'var(--color-surface)',
        borderColor: allDone ? 'var(--color-accent)' : 'var(--color-border)',
        boxShadow: allDone ? '0 0 20px rgba(34, 197, 94, 0.2)' : 'none',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Target size={16} className={allDone ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'} />
          <span className="text-sm font-medium">Progresso</span>
        </div>
        <span className="font-mono text-sm font-bold" style={{ color: allDone ? 'var(--color-accent)' : 'var(--color-primary)' }}>
          {completed}/{total}
        </span>
      </div>

      <div className="h-2.5 bg-[var(--color-bg)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            background: allDone
              ? 'linear-gradient(90deg, var(--color-accent), #4ADE80)'
              : 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
            boxShadow: allDone
              ? '0 0 10px var(--color-accent)'
              : '0 0 10px var(--color-primary)',
          }}
        />
      </div>

      {allDone && (
        <div className="text-center mt-2 text-xs font-bold text-[var(--color-accent)] animate-bounce-in">
          Giornata Perfetta!
        </div>
      )}
    </div>
  );
}
