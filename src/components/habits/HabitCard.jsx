import { Check, Pencil } from 'lucide-react';
import { CATEGORIES } from '../../data/petTypes';

export default function HabitCard({ habit, isCompleted, onToggle, onEdit, disabled }) {
  const category = CATEGORIES[habit.category] || CATEGORIES.custom;

  return (
    <div
      className="card p-0 overflow-hidden transition-all duration-300"
      style={{
        background: isCompleted
          ? `linear-gradient(135deg, ${category.color}10, ${category.color}05)`
          : 'var(--color-surface)',
        borderColor: isCompleted ? category.color : undefined,
        boxShadow: isCompleted ? `0 0 15px ${category.color}20` : 'none',
      }}
    >
      <div className="flex items-center gap-3 p-3">
        <button
          onClick={onToggle}
          disabled={disabled}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 touch-bounce ${
            disabled ? 'opacity-60' : ''
          } ${isCompleted ? 'scale-110' : ''}`}
          style={{
            background: isCompleted ? category.color : 'var(--color-bg)',
            border: `2px solid ${isCompleted ? category.color : 'var(--color-border)'}`,
          }}
        >
          {isCompleted && <Check size={16} className="text-white" strokeWidth={3} />}
        </button>

        <button
          onClick={onToggle}
          disabled={disabled}
          className={`flex-1 min-w-0 text-left ${disabled ? 'opacity-60' : ''}`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{habit.emoji}</span>
            <span className={`font-medium text-sm truncate ${isCompleted ? 'line-through opacity-60' : ''}`}>
              {habit.name}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className="badge"
              style={{ background: `${category.color}20`, color: category.color }}
            >
              {category.emoji} {category.name}
            </span>
          </div>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          {isCompleted ? (
            <span className="text-xs font-bold text-[var(--color-accent)]">Fatto!</span>
          ) : (
            <span className="text-xs font-mono text-[var(--color-text-muted)]">+10 XP</span>
          )}
          {onEdit && !disabled && (
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              className="p-1.5 rounded-lg hover:bg-[var(--color-surface-light)] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
            >
              <Pencil size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
