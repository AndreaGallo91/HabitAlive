import IronbackSVG from './svgs/ironback/IronbackSVG';
import LuminoSVG from './svgs/lumino/LuminoSVG';
import ZephyrSVG from './svgs/zephyr/ZephyrSVG';
import GearlineSVG from './svgs/gearling/GearlineSVG';
import BloomieSVG from './svgs/bloomie/BloomieSVG';
import PrismoSVG from './svgs/prismo/PrismoSVG';

const PET_COMPONENTS = {
  ironback: IronbackSVG,
  lumino: LuminoSVG,
  zephyr: ZephyrSVG,
  gearling: GearlineSVG,
  bloomie: BloomieSVG,
  prismo: PrismoSVG,
};

export default function PetSVG({ type, stage, skin, energy, mood, size = 200, animate = true }) {
  const Component = PET_COMPONENTS[type] || PET_COMPONENTS.prismo;
  return <Component stage={stage} skin={skin} energy={energy} mood={mood} size={size} animate={animate} />;
}
