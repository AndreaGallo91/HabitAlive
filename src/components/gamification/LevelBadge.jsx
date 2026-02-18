import { useHabitContext } from '../../context/HabitContext';

export default function LevelBadge({ size = 'md' }) {
  const { profile } = useHabitContext();
  
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-bold font-display ${sizes[size]}`}
      style={{
        background: 'linear-gradient(135deg, var(--color-surface), var(--color-surface-light))',
        border: '1px solid var(--color-border)',
        color: 'var(--color-primary)',
      }}
    >
      {profile.title}
    </span>
  );
}
