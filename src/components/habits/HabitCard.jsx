import { Check } from 'lucide-react';
import { CATEGORIES } from '../../data/petTypes';

export default function HabitCard({ habit, isCompleted, onToggle, disabled }) {
  const category = CATEGORIES[habit.category] || CATEGORIES.custom;

  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 text-left ${
        disabled ? 'opacity-60' : 'active:scale-[0.98]'
      }`}
      style={{
        background: isCompleted
          ? `linear-gradient(135deg, ${category.color}10, ${category.color}05)`
          : 'var(--color-surface)',
        borderColor: isCompleted ? category.color : 'var(--color-border)',
        boxShadow: isCompleted ? `0 0 15px ${category.color}20` : 'none',
      }}
    >
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 ${
          isCompleted ? 'scale-110' : ''
        }`}
        style={{
          background: isCompleted ? category.color : 'var(--color-bg)',
          border: `2px solid ${isCompleted ? category.color : 'var(--color-border)'}`,
        }}
      >
        {isCompleted && <Check size={16} className="text-white" strokeWidth={3} />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-lg">{habit.emoji}</span>
          <span
            className={`font-medium text-sm truncate ${
              isCompleted ? 'line-through opacity-60' : ''
            }`}
          >
            {habit.name}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
            style={{
              background: `${category.color}20`,
              color: category.color,
            }}
          >
            {category.emoji} {category.name}
          </span>
        </div>
      </div>

      <div className="text-right shrink-0">
        {isCompleted ? (
          <span className="text-xs font-bold text-[var(--color-accent)]">Fatto!</span>
        ) : (
          <span className="text-xs font-mono text-[var(--color-text-muted)]">+10 XP</span>
        )}
      </div>
    </button>
  );
}
