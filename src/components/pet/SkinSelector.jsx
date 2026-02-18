import { Lock } from 'lucide-react';
import { usePetContext } from '../../context/PetContext';
import { PET_SKINS } from '../../data/petTypes';

export default function SkinSelector() {
  const { pet, setSkin } = usePetContext();

  return (
    <div className="space-y-3">
      <h3 className="font-display font-bold text-sm">Skin</h3>
      <div className="grid grid-cols-4 gap-2">
        {Object.values(PET_SKINS).map((skin) => {
          const isUnlocked = pet.unlockedSkins.includes(skin.id);
          const isActive = pet.activeSkin === skin.id;

          return (
            <button
              key={skin.id}
              onClick={() => isUnlocked && setSkin(skin.id)}
              disabled={!isUnlocked}
              className={`relative p-2 rounded-xl text-center transition-all ${
                isActive ? 'ring-2' : ''
              }`}
              style={{
                background: isActive ? 'var(--color-surface-light)' : 'var(--color-surface)',
                border: `1px solid ${isActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
                ringColor: 'var(--color-primary)',
                opacity: isUnlocked ? 1 : 0.4,
              }}
            >
              {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock size={16} className="text-[var(--color-text-muted)]" />
                </div>
              )}
              <div className="text-xs font-medium truncate" style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}>
                {skin.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
