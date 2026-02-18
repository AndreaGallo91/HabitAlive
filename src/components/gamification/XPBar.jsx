import { useHabitContext } from '../../context/HabitContext';
import { xpProgress } from '../../utils/xpCalculator';

export default function XPBar({ compact = false }) {
  const { profile } = useHabitContext();
  const progress = xpProgress(profile.xp);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-[var(--color-surface)] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress.percentage}%`,
              background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
            }}
          />
        </div>
        <span className="text-xs font-mono text-[var(--color-text-muted)]">
          {Math.round(progress.percentage)}%
        </span>
      </div>
    );
  }

  return (
    <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{profile.title}</span>
        <span className="text-sm font-mono text-[var(--color-primary)]">
          {profile.xp} XP
        </span>
      </div>
      <div className="h-3 bg-[var(--color-bg)] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${progress.percentage}%`,
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
            boxShadow: '0 0 15px var(--color-primary)',
          }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
          Lv.{progress.currentLevel}
        </span>
        <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
          {progress.progressInLevel}/{progress.xpNeeded}
        </span>
        <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
          Lv.{progress.currentLevel + 1}
        </span>
      </div>
    </div>
  );
}
