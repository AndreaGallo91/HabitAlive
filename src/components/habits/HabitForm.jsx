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
      <div
        className="relative w-full max-w-lg mx-4 mb-4 sm:mb-0 rounded-2xl p-5 animate-slide-up"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg">
            {isEditing ? 'Modifica Abitudine' : 'Nuova Abitudine'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--color-surface-light)] text-[var(--color-text-muted)]">
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
              className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-colors"
              style={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
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
                  className="w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all"
                  style={{
                    background: emoji === e ? 'var(--color-primary)' : 'var(--color-bg)',
                    border: `2px solid ${emoji === e ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    transform: emoji === e ? 'scale(1.1)' : 'scale(1)',
                  }}
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
                  onClick={() => {
                    setCategory(cat.id);
                    setColor(cat.color);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
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
                className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: 'var(--color-danger)',
                  border: '1px solid var(--color-danger)',
                }}
              >
                <Trash2 size={16} />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
              }}
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40"
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-bg)',
              }}
            >
              {isEditing ? 'Salva' : 'Crea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
