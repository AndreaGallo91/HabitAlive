import { useHabitContext } from '../../context/HabitContext';
import { xpProgress } from '../../utils/xpCalculator';

export default function Header() {
  const { profile, pendingXP } = useHabitContext();
  const progress = xpProgress(profile.xp);

  return (
    <header className="sticky top-0 z-50 glass px-4 py-3">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold font-display bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            HabitAlive
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-[var(--color-text-secondary)]">{profile.title}</div>
            <div className="text-xs font-mono text-[var(--color-primary)]">Lv.{profile.level}</div>
          </div>

          <div className="w-28 relative">
            <div className="h-3 bg-[var(--color-surface)] rounded-full overflow-hidden border border-[var(--color-border)]">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${progress.percentage}%`,
                  background: `linear-gradient(90deg, var(--color-primary), var(--color-secondary))`,
                  boxShadow: '0 0 10px var(--color-primary)',
                }}
              />
            </div>
            <div className="text-[10px] font-mono text-[var(--color-text-muted)] text-center mt-0.5">
              {progress.progressInLevel}/{progress.xpNeeded} XP
            </div>
          </div>

          {pendingXP && (
            <div className="absolute right-4 top-12 animate-slide-up">
              <span className="text-sm font-bold font-mono text-[var(--color-accent)]">
                +{pendingXP.amount} XP
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
