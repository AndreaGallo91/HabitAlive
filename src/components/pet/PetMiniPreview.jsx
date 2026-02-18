import { usePetContext } from '../../context/PetContext';
import PetSVG from './PetSVG';
import PetStats from './PetStats';

export default function PetMiniPreview() {
  const { pet } = usePetContext();

  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10">
        <PetSVG
          type={pet.type}
          stage={pet.stage}
          skin={pet.activeSkin}
          energy={pet.energy}
          mood={pet.mood}
          size={40}
          animate={false}
        />
      </div>
      <div className="w-20">
        <PetStats pet={pet} compact />
      </div>
    </div>
  );
}
