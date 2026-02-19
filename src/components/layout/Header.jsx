import { useHabitContext } from '../../context/HabitContext';
import { xpProgress } from '../../utils/xpCalculator';

export default function Header() {
  const { profile, pendingXP } = useHabitContext();
  const progress = xpProgress(profile.xp);

  return (
    <header className="sticky top-0 z-50 glass safe-top">
      <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3 md:max-w-2xl lg:max-w-3xl">
        <h1 className="text-lg font-bold font-display bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
          HabitAlive
        </h1>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-[var(--color-text-secondary)]">{profile.title}</div>
            <div className="text-xs font-mono text-[var(--color-primary)]">Lv.{profile.level}</div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[var(--color-primary)] sm:hidden">
              Lv.{profile.level}
            </span>
            <div className="w-24 sm:w-28">
              <div className="stat-bar h-2.5 border border-[var(--color-border)]">
                <div
                  className="stat-bar-fill"
                  style={{
                    width: `${progress.percentage}%`,
                    background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                    boxShadow: '0 0 10px var(--color-primary)',
                  }}
                />
              </div>
              <div className="text-[10px] font-mono text-[var(--color-text-muted)] text-center mt-0.5">
                {progress.progressInLevel}/{progress.xpNeeded} XP
              </div>
            </div>
          </div>

          {pendingXP && (
            <div className="absolute right-4 top-14 animate-slide-up">
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
