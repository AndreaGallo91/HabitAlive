import { useState } from 'react';
import { ArrowLeft, Skull, Shield } from 'lucide-react';
import { useDungeonContext } from '../../context/DungeonContext';
import { usePetContext } from '../../context/PetContext';
import BattleScreen from './BattleScreen';

export default function DungeonDetail({ dungeon, dungeonIndex, onBack }) {
  const { getDungeonStatus } = useDungeonContext();
  const { pet } = usePetContext();
  const [battleFloor, setBattleFloor] = useState(null);

  const status = getDungeonStatus(dungeon.id);
  const currentFloor = status?.currentFloor || 1;

  if (battleFloor) {
    const isBoss = battleFloor === 5;
    const enemy = isBoss ? dungeon.boss : dungeon.enemies[battleFloor - 1];
    return (
      <BattleScreen
        dungeon={dungeon}
        dungeonIndex={dungeonIndex}
        enemy={enemy}
        floor={battleFloor}
        isBoss={isBoss}
        onComplete={() => setBattleFloor(null)}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="p-2 rounded-lg hover:bg-[var(--color-surface-light)] text-[var(--color-text-secondary)]">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="font-display font-bold text-lg">{dungeon.icon} {dungeon.name}</h2>
          <p className="text-xs text-[var(--color-text-muted)]">{dungeon.theme}</p>
        </div>
      </div>

      {/* Reward preview */}
      <div className="p-3 rounded-xl border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h3 className="text-xs font-bold text-[var(--color-warning)] mb-1">Ricompense Boss</h3>
        <div className="flex flex-wrap gap-2 text-xs text-[var(--color-text-secondary)]">
          {dungeon.reward.skinName && <span>🎨 {dungeon.reward.skinName}</span>}
          {dungeon.reward.title && <span>🏆 {dungeon.reward.title}</span>}
          {dungeon.reward.themeName && <span>🎭 {dungeon.reward.themeName}</span>}
        </div>
      </div>

      {/* Floors */}
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((floor) => {
          const floorStatus = status?.floors[floor];
          const isCompleted = floorStatus?.completed;
          const isCurrent = floor === currentFloor && !status?.completed;
          const isLocked = floor > currentFloor;
          const isBoss = floor === 5;
          const enemy = isBoss ? dungeon.boss : dungeon.enemies[floor - 1];
          const canFight = isCurrent && pet.energy >= 30;

          return (
            <div
              key={floor}
              className="flex items-center gap-3 p-4 rounded-xl border transition-all"
              style={{
                background: isCompleted ? 'rgba(34, 197, 94, 0.05)' : isCurrent ? 'var(--color-surface-light)' : 'var(--color-surface)',
                borderColor: isCompleted ? 'var(--color-accent)' : isCurrent ? 'var(--color-primary)' : 'var(--color-border)',
                opacity: isLocked ? 0.4 : 1,
              }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{
                background: isCompleted ? 'var(--color-accent)' : isBoss ? 'var(--color-danger)' : 'var(--color-surface)',
                color: isCompleted ? 'white' : isBoss ? 'white' : 'var(--color-text-muted)',
              }}>
                {isCompleted ? '✓' : isBoss ? <Skull size={16} /> : floor}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">
                  {isBoss ? `👹 ${enemy?.name || 'Boss'}` : enemy?.name || `Nemico ${floor}`}
                </div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  {isCompleted ? 'Completato' : isLocked ? 'Bloccato' : `HP: ${enemy?.hp || '?'} — Potere: ${enemy?.power || '?'}`}
                </div>
              </div>
              {isCurrent && !isCompleted && (
                <button
                  onClick={() => canFight && setBattleFloor(floor)}
                  disabled={!canFight}
                  className="px-4 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-40"
                  style={{
                    background: isBoss ? 'var(--color-danger)' : 'var(--color-primary)',
                    color: 'white',
                  }}
                >
                  {isBoss ? 'Boss!' : 'Combatti'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
