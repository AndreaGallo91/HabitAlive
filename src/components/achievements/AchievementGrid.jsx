import { useHabitContext } from '../../context/HabitContext';
import { ACHIEVEMENTS } from '../../data/achievements';
import AchievementCard from './AchievementCard';

export default function AchievementGrid() {
  const { profile } = useHabitContext();
  const unlockedCount = profile.achievements.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-display font-bold text-lg">Traguardi</h2>
        <span className="text-xs font-mono text-[var(--color-text-muted)]">
          <span className="text-[var(--color-warning)] font-bold">{unlockedCount}</span>/{ACHIEVEMENTS.length}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {ACHIEVEMENTS.map((ach) => (
          <AchievementCard
            key={ach.id}
            achievement={ach}
            isUnlocked={profile.achievements.includes(ach.id)}
          />
        ))}
      </div>
    </div>
  );
}
