import { Lock } from 'lucide-react';

export default function AchievementCard({ achievement, isUnlocked }) {
  return (
    <div
      className="card p-3 text-center transition-all"
      style={{
        background: isUnlocked
          ? 'linear-gradient(135deg, var(--color-surface), var(--color-surface-light))'
          : 'var(--color-bg)',
        borderColor: isUnlocked ? 'var(--color-warning)' : undefined,
        opacity: isUnlocked ? 1 : 0.5,
        boxShadow: isUnlocked ? '0 0 15px rgba(245, 158, 11, 0.15)' : 'none',
      }}
    >
      <div className="text-2xl mb-1">
        {isUnlocked ? achievement.badge : <Lock size={20} className="mx-auto text-[var(--color-text-muted)]" />}
      </div>
      <div className="font-display font-bold text-xs truncate">
        {achievement.name}
      </div>
      <div className="text-[10px] text-[var(--color-text-muted)] mt-0.5 line-clamp-2">
        {achievement.description}
      </div>
    </div>
  );
}
