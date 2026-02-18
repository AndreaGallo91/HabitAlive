import { useState } from 'react';
import { Lock, CheckCircle, ChevronRight, Zap } from 'lucide-react';
import { usePetContext } from '../../context/PetContext';
import { useDungeonContext } from '../../context/DungeonContext';
import { DUNGEONS } from '../../data/dungeons';
import DungeonDetail from './DungeonDetail';

export default function DungeonList() {
  const { pet } = usePetContext();
  const { dungeonState, getDungeonStatus } = useDungeonContext();
  const [selectedDungeon, setSelectedDungeon] = useState(null);

  if (selectedDungeon) {
    return (
      <DungeonDetail
        dungeon={selectedDungeon.dungeon}
        dungeonIndex={selectedDungeon.index}
        onBack={() => setSelectedDungeon(null)}
      />
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-display font-bold text-lg">Dungeon</h2>
        <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
          <Zap size={14} className="text-[var(--color-warning)]" />
          <span>Potere: </span>
          <span className="font-mono font-bold text-[var(--color-warning)]">{pet.power}</span>
        </div>
      </div>

      {pet.energy < 30 && (
        <div className="p-3 rounded-xl border text-center text-sm" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'var(--color-danger)' }}>
          <span className="text-[var(--color-danger)]">⚡ Energia insufficiente ({Math.round(pet.energy)}/30)</span>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Completa abitudini per ricaricare!</p>
        </div>
      )}

      <div className="space-y-2">
        {DUNGEONS.map((dungeon, index) => {
          const status = getDungeonStatus(dungeon.id);
          const isUnlocked = status?.unlocked;
          const isCompleted = status?.completed;
          const canEnter = isUnlocked && pet.power >= dungeon.minPower && pet.energy >= 30;
          const currentFloor = status?.currentFloor || 1;
          const floorsCompleted = status ? Object.values(status.floors).filter(f => f.completed).length : 0;

          return (
            <button
              key={dungeon.id}
              onClick={() => canEnter && setSelectedDungeon({ dungeon, index })}
              disabled={!canEnter}
              className="w-full flex items-center gap-3 p-4 rounded-xl border transition-all text-left"
              style={{
                background: isCompleted
                  ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))'
                  : isUnlocked
                  ? 'var(--color-surface)'
                  : 'var(--color-bg)',
                borderColor: isCompleted
                  ? 'var(--color-accent)'
                  : isUnlocked
                  ? 'var(--color-border)'
                  : 'var(--color-bg)',
                opacity: isUnlocked ? 1 : 0.5,
              }}
            >
              <div className="text-2xl w-10 text-center">
                {isCompleted ? '✅' : !isUnlocked ? '🔒' : dungeon.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-sm">
                  {index + 1}. {dungeon.name}
                </div>
                <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {isCompleted ? (
                    <span className="text-[var(--color-accent)]">Completato!</span>
                  ) : isUnlocked ? (
                    <span>Piano {currentFloor}/5 — {dungeon.theme}</span>
                  ) : (
                    <span>Potere richiesto: {dungeon.minPower}</span>
                  )}
                </div>
                {isUnlocked && !isCompleted && (
                  <div className="flex gap-1 mt-1.5">
                    {[1, 2, 3, 4, 5].map((f) => (
                      <div
                        key={f}
                        className="w-3 h-1.5 rounded-full"
                        style={{
                          background: status?.floors[f]?.completed
                            ? 'var(--color-accent)'
                            : f === 5
                            ? 'var(--color-danger)'
                            : 'var(--color-border)',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              {canEnter && !isCompleted && (
                <ChevronRight size={18} className="text-[var(--color-text-muted)]" />
              )}
            </button>
          );
        })}
      </div>

      <div className="p-3 rounded-xl text-center text-xs text-[var(--color-text-muted)]" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        Boss sconfitti: <span className="font-bold font-mono text-[var(--color-primary)]">{dungeonState.totalBossesDefeated}</span>
      </div>
    </div>
  );
}
