import { useEffect } from 'react';
import { Trophy } from 'lucide-react';

export default function AchievementToast({ achievement, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!achievement) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-bounce-in">
      <div
        className="flex items-center gap-3 px-5 py-3 rounded-xl border"
        style={{
          background: 'linear-gradient(135deg, var(--color-surface), var(--color-surface-light))',
          border: '1px solid var(--color-warning)',
          boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)',
        }}
      >
        <div className="text-3xl">{achievement.badge}</div>
        <div>
          <div className="flex items-center gap-1.5">
            <Trophy size={14} className="text-[var(--color-warning)]" />
            <span className="text-xs font-bold text-[var(--color-warning)] uppercase tracking-wide">
              Traguardo Sbloccato!
            </span>
          </div>
          <div className="font-bold font-display text-[var(--color-text)]">
            {achievement.name}
          </div>
          <div className="text-xs text-[var(--color-text-secondary)]">
            {achievement.description}
          </div>
        </div>
      </div>
    </div>
  );
}
