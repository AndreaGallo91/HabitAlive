import { useHabitContext } from '../../context/HabitContext';
import { getToday, addDays } from '../../utils/dateHelpers';

const DAY_LABELS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

export default function WeeklyHeatmap() {
  const { logs, getActiveHabits, getCompletionsForDate } = useHabitContext();
  const activeHabits = getActiveHabits();
  const today = getToday();

  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = addDays(today, -i);
    const completions = getCompletionsForDate(date);
    const completed = activeHabits.filter((h) => completions[h.id]?.completed).length;
    const total = activeHabits.length;
    const pct = total > 0 ? completed / total : 0;
    days.push({ date, completed, total, pct });
  }

  return (
    <div className="card">
      <h3 className="font-display font-bold text-sm mb-3">Ultimi 7 Giorni</h3>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day) => (
          <div key={day.date} className="text-center">
            <div className="text-[10px] text-[var(--color-text-muted)] mb-1">
              {DAY_LABELS[(new Date(day.date).getDay() + 6) % 7]}
            </div>
            <div
              className="aspect-square rounded-lg flex items-center justify-center text-[10px] font-mono font-bold transition-all"
              style={{
                background: day.pct === 0
                  ? 'var(--color-bg)'
                  : day.pct === 1
                  ? 'var(--color-accent)'
                  : day.pct >= 0.5
                  ? 'var(--color-primary)'
                  : 'var(--color-surface-light)',
                color: day.pct >= 0.5 ? 'white' : 'var(--color-text-muted)',
                boxShadow: day.pct === 1 ? '0 0 10px rgba(34, 197, 94, 0.3)' : 'none',
              }}
            >
              {day.completed}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
