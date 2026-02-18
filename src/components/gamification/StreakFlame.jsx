import { useHabitContext } from '../../context/HabitContext';
import { Flame } from 'lucide-react';

export default function StreakFlame({ compact = false }) {
  const { profile } = useHabitContext();
  const streak = profile.currentStreak;
  
  const flameSize = compact ? 16 : Math.min(32, 16 + streak);
  const flameColor = streak >= 30 ? '#EF4444' : streak >= 7 ? '#F97316' : '#F59E0B';

  if (streak === 0) {
    return compact ? null : (
      <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
        <Flame size={16} />
        <span className="text-sm">Nessuna streak attiva</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative" style={{ color: flameColor }}>
        <Flame
          size={flameSize}
          className={streak >= 3 ? 'animate-flame' : ''}
          fill={flameColor}
          strokeWidth={1.5}
        />
        {streak >= 7 && (
          <Flame
            size={flameSize * 0.6}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 animate-flame opacity-50"
            fill={flameColor}
            strokeWidth={0}
            style={{ animationDelay: '0.2s' }}
          />
        )}
      </div>
      <div>
        <span className={`font-bold font-mono ${compact ? 'text-sm' : 'text-lg'}`} style={{ color: flameColor }}>
          {streak}
        </span>
        {!compact && (
          <span className="text-xs text-[var(--color-text-secondary)] ml-1">
            {streak === 1 ? 'giorno' : 'giorni'}
          </span>
        )}
      </div>
      {!compact && profile.bestStreak > 0 && (
        <span className="text-xs text-[var(--color-text-muted)] ml-2">
          Record: {profile.bestStreak}
        </span>
      )}
    </div>
  );
}
