import { usePetContext } from '../../context/PetContext';
import { useHabitContext } from '../../context/HabitContext';
import { PET_TYPES, PET_STAGES, CATEGORIES } from '../../data/petTypes';
import PetSVG from './PetSVG';
import PetStats from './PetStats';
import SkinSelector from './SkinSelector';

export default function PetDisplay() {
  const { pet } = usePetContext();
  const { profile } = useHabitContext();

  const petType = PET_TYPES[pet.type] || PET_TYPES.prismo;
  const petStage = PET_STAGES[pet.stage] || PET_STAGES.cucciolo;
  const category = CATEGORIES[pet.dominantCategory] || CATEGORIES.custom;

  return (
    <div className="space-y-4">
      <div className="card p-5 text-center card-glow">
        <div className="flex justify-center mb-3">
          <div className="animate-breathe">
            <PetSVG
              type={pet.type}
              stage={pet.stage}
              skin={pet.activeSkin}
              energy={pet.energy}
              mood={pet.mood}
              size={180}
            />
          </div>
        </div>

        <h2 className="font-display font-bold text-xl">{petType.name}</h2>
        <div className="flex items-center justify-center gap-2 mt-1 flex-wrap">
          <span className="text-sm">{petStage.emoji}</span>
          <span className="text-sm text-[var(--color-text-secondary)]">{petStage.name}</span>
          <span className="text-xs text-[var(--color-text-muted)]">·</span>
          <span className="text-sm" style={{ color: category.color }}>
            {category.emoji} {category.name}
          </span>
        </div>

        <div className="mt-4 px-4">
          <PetStats pet={pet} />
        </div>
      </div>

      <div className="card">
        <h3 className="font-display font-bold text-sm mb-2">Evoluzione</h3>
        <div className="flex justify-between gap-1">
          {Object.values(PET_STAGES).map((stage) => {
            const isCurrent = pet.stage === stage.id;
            const isReached = profile.level >= stage.minLevel;
            return (
              <div
                key={stage.id}
                className={`text-center flex-1 py-2 rounded-lg transition-all ${isCurrent ? 'scale-105' : ''}`}
                style={{
                  background: isCurrent ? 'var(--color-surface-light)' : 'transparent',
                  opacity: isReached ? 1 : 0.4,
                }}
              >
                <div className="text-xl">{stage.emoji}</div>
                <div className="text-[10px] font-medium mt-1" style={{ color: isCurrent ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                  {stage.name}
                </div>
                <div className="text-[10px] text-[var(--color-text-muted)]">
                  Lv.{stage.minLevel}+
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <SkinSelector />
      </div>
    </div>
  );
}
