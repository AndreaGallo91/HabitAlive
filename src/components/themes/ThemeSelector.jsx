import { Check, Lock, Palette } from 'lucide-react';
import { useThemeContext } from '../../context/ThemeContext';
import { useDungeonContext } from '../../context/DungeonContext';
import { THEMES } from '../../data/themes';

export default function ThemeSelector() {
  const { activeTheme, changeTheme } = useThemeContext();
  const { dungeonState } = useDungeonContext();

  const isThemeUnlocked = (themeId) => {
    if (themeId === 'default') return true;
    return dungeonState.unlockedThemes?.includes(themeId);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <Palette size={16} className="text-[var(--color-secondary)]" />
        <h3 className="font-display font-bold text-sm">Temi</h3>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {Object.values(THEMES).map((theme) => {
          const unlocked = isThemeUnlocked(theme.id);
          const isActive = activeTheme === theme.id;

          return (
            <button
              key={theme.id}
              onClick={() => unlocked && changeTheme(theme.id)}
              disabled={!unlocked}
              className="card p-3 text-left touch-bounce"
              style={{
                background: isActive ? 'var(--color-surface-light)' : 'var(--color-surface)',
                borderColor: isActive ? 'var(--color-primary)' : undefined,
                opacity: unlocked ? 1 : 0.4,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  {Object.values(theme.colors).slice(0, 4).map((color, i) => (
                    <div key={i} className="w-3 h-3 rounded-full" style={{ background: color }} />
                  ))}
                </div>
                {isActive && <Check size={14} className="text-[var(--color-primary)] ml-auto" />}
                {!unlocked && <Lock size={14} className="text-[var(--color-text-muted)] ml-auto" />}
              </div>
              <div className="font-display font-bold text-xs">{theme.name}</div>
              <div className="text-[10px] text-[var(--color-text-muted)]">{theme.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
