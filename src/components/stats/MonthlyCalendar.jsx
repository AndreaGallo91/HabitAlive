import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useHabitContext } from '../../context/HabitContext';
import { getMonthDates, getToday, formatDate } from '../../utils/dateHelpers';

const MONTH_NAMES = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
const DAY_HEADERS = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];

export default function MonthlyCalendar() {
  const { logs, getActiveHabits, getCompletionsForDate } = useHabitContext();
  const activeHabits = getActiveHabits();
  const today = getToday();
  
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const dates = useMemo(() => getMonthDates(year, month), [year, month]);
  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;

  const navigateMonth = (delta) => {
    let newMonth = month + delta;
    let newYear = year;
    if (newMonth < 0) { newMonth = 11; newYear--; }
    if (newMonth > 11) { newMonth = 0; newYear++; }
    setMonth(newMonth);
    setYear(newYear);
  };

  return (
    <div className="p-4 rounded-xl border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => navigateMonth(-1)} className="p-1 rounded hover:bg-[var(--color-surface-light)] text-[var(--color-text-muted)]">
          <ChevronLeft size={16} />
        </button>
        <span className="font-display font-bold text-sm">{MONTH_NAMES[month]} {year}</span>
        <button onClick={() => navigateMonth(1)} className="p-1 rounded hover:bg-[var(--color-surface-light)] text-[var(--color-text-muted)]">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {DAY_HEADERS.map((d, i) => (
          <div key={i} className="text-center text-[10px] text-[var(--color-text-muted)] py-1">{d}</div>
        ))}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {dates.map((date) => {
          const completions = getCompletionsForDate(date);
          const completed = activeHabits.filter((h) => completions[h.id]?.completed).length;
          const total = activeHabits.length;
          const pct = total > 0 ? completed / total : 0;
          const isToday = date === today;
          const dayNum = parseInt(date.split('-')[2]);

          return (
            <div
              key={date}
              className={`aspect-square rounded-md flex items-center justify-center text-[11px] transition-all ${isToday ? 'ring-1 ring-[var(--color-primary)]' : ''}`}
              style={{
                background: pct === 0 ? 'transparent' : pct === 1 ? 'var(--color-accent)' : pct >= 0.5 ? `rgba(0, 212, 255, ${pct * 0.6})` : `rgba(0, 212, 255, ${pct * 0.3})`,
                color: pct >= 0.5 ? 'white' : 'var(--color-text-muted)',
                fontWeight: isToday ? 'bold' : 'normal',
              }}
            >
              {dayNum}
            </div>
          );
        })}
      </div>
    </div>
  );
}
