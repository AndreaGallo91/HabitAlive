import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { formatDisplayDate, isToday, getToday, addDays } from '../../utils/dateHelpers';

export default function DayNavigator({ selectedDate, setSelectedDate }) {
  const today = isToday(selectedDate);

  return (
    <div className="flex items-center justify-between px-1 py-2">
      <button
        onClick={() => setSelectedDate(addDays(selectedDate, -1))}
        className="p-2 rounded-lg hover:bg-[var(--color-surface-light)] transition-colors text-[var(--color-text-secondary)] min-w-[44px] min-h-[44px] flex items-center justify-center touch-bounce"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex items-center gap-2">
        <Calendar size={16} className="text-[var(--color-primary)]" />
        <span className="font-display font-semibold text-sm">
          {formatDisplayDate(selectedDate)}
        </span>
        {!today && (
          <button
            onClick={() => setSelectedDate(getToday())}
            className="text-xs px-2.5 py-1 rounded-full bg-[var(--color-primary)] text-[var(--color-bg)] font-bold min-h-[28px] touch-bounce"
          >
            Oggi
          </button>
        )}
      </div>

      <button
        onClick={() => setSelectedDate(addDays(selectedDate, 1))}
        disabled={today}
        className="p-2 rounded-lg hover:bg-[var(--color-surface-light)] transition-colors text-[var(--color-text-secondary)] min-w-[44px] min-h-[44px] flex items-center justify-center touch-bounce disabled:opacity-30"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
