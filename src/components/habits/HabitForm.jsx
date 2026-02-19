import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { CATEGORIES } from '../../data/petTypes';

const COMMON_EMOJIS = ['🏋️', '📚', '🧘', '💼', '🍎', '🏃', '💧', '🎯', '✍️', '🎵', '🧠', '🌅', '💪', '🥗', '😴', '🚶', '📝', '🎨', '🧹', '💰', '📖', '🍳', '🚴', '🧘‍♂️'];

export default function HabitForm({ habit, onSave, onDelete, onClose }) {
  const [name, setName] = useState(habit?.name || '');
  const [emoji, setEmoji] = useState(habit?.emoji || '🎯');
  const [category, setCategory] = useState(habit?.category || 'custom');
  const [color, setColor] = useState(habit?.color || '#00D4FF');

  const isEditing = !!habit;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name: name.trim(), emoji, category, color });
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-4 mb-4 sm:mb-0 card p-5 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg">
            {isEditing ? 'Modifica Abitudine' : 'Nuova Abitudine'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--color-surface-light)] text-[var(--color-text-muted)] min-w-[44px] min-h-[44px] flex items-center justify-center">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1 block">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="es. Allenamento mattutino"
              className="input-field"
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1 block">Icona</label>
            <div className="flex flex-wrap gap-2">
              {COMMON_EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`w-10 h-10 rounded-lg text-lg flex items-center justify-center transition-all touch-bounce ${
                    emoji === e
                      ? 'bg-[var(--color-primary)] border-2 border-[var(--color-primary)] scale-110'
                      : 'bg-[var(--color-bg)] border-2 border-[var(--color-border)]'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[var(--color-text-secondary)] mb-1 block">Categoria</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(CATEGORIES).map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => { setCategory(cat.id); setColor(cat.color); }}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all touch-bounce min-h-[44px]"
                  style={{
                    background: category === cat.id ? `${cat.color}20` : 'var(--color-bg)',
                    border: `2px solid ${category === cat.id ? cat.color : 'var(--color-border)'}`,
                    color: category === cat.id ? cat.color : 'var(--color-text-secondary)',
                  }}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            {isEditing && onDelete && (
              <button
                type="button"
                onClick={() => onDelete(habit.id)}
                className="btn-ghost min-h-[44px] px-4"
                style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }}
              >
                <Trash2 size={16} />
              </button>
            )}
            <button type="button" onClick={onClose} className="btn-ghost flex-1">
              Annulla
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="btn-primary flex-1 disabled:opacity-40"
            >
              {isEditing ? 'Salva' : 'Crea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
