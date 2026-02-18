import { useState, useEffect, useRef } from 'react';
import { usePetContext } from '../../context/PetContext';
import { useHabitContext } from '../../context/HabitContext';
import { useDungeonContext } from '../../context/DungeonContext';
import { calculateBattleResult } from '../../utils/battleEngine';
import { XP_REWARDS } from '../../utils/xpCalculator';
import { ACHIEVEMENTS } from '../../data/achievements';
import PetSVG from '../pet/PetSVG';
import EnemySVG from './EnemySVG';

export default function BattleScreen({ dungeon, dungeonIndex, enemy, floor, isBoss, onComplete }) {
  const { pet, unlockSkin } = usePetContext();
  const { profile, addXP, unlockAchievement, queueAchievement } = useHabitContext();
  const { completeFloor, recordLoss, dungeonState } = useDungeonContext();

  const [battleState, setBattleState] = useState('starting');
  const [currentTurn, setCurrentTurn] = useState(0);
  const [petHP, setPetHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [petMaxHP, setPetMaxHP] = useState(100);
  const [enemyMaxHP, setEnemyMaxHP] = useState(100);
  const [attackingEntity, setAttackingEntity] = useState(null);
  const [result, setResult] = useState(null);
  const battleResultRef = useRef(null);

  useEffect(() => {
    const petStats = {
      power: pet.power,
      energy: pet.energy,
      mood: pet.mood,
      level: profile.level,
    };
    const battleResult = calculateBattleResult(petStats, enemy);
    battleResultRef.current = battleResult;
    setPetMaxHP(battleResult.petMaxHP);
    setEnemyMaxHP(battleResult.enemyMaxHP);
    setPetHP(battleResult.petMaxHP);
    setEnemyHP(battleResult.enemyMaxHP);

    const timer = setTimeout(() => setBattleState('fighting'), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (battleState !== 'fighting' || !battleResultRef.current) return;

    const turns = battleResultRef.current.turns;
    if (currentTurn >= turns.length) {
      const br = battleResultRef.current;
      setBattleState('result');
      setResult(br.victory ? 'victory' : 'defeat');

      if (br.victory) {
        const xpReward = isBoss ? XP_REWARDS.DUNGEON_BOSS : XP_REWARDS.DUNGEON_FLOOR;
        addXP(xpReward, isBoss ? 'dungeon_boss' : 'dungeon_floor');
        completeFloor(dungeon.id, floor, 3);

        if (isBoss && dungeon.reward?.skin) {
          unlockSkin(dungeon.reward.skin);
        }

        if (isBoss) {
          const totalBosses = (dungeonState.totalBossesDefeated || 0) + 1;
          if (totalBosses === 1 && !profile.achievements.includes('esploratore')) {
            const ach = ACHIEVEMENTS.find(a => a.id === 'esploratore');
            if (ach) { unlockAchievement('esploratore'); queueAchievement(ach); addXP(100, 'achievement'); }
          }
          if (totalBosses >= 10 && !profile.achievements.includes('sterminatore')) {
            const ach = ACHIEVEMENTS.find(a => a.id === 'sterminatore');
            if (ach) { unlockAchievement('sterminatore'); queueAchievement(ach); addXP(100, 'achievement'); }
          }
        }
      } else {
        recordLoss();
      }
      return;
    }

    const turn = turns[currentTurn];
    const delay = 600;

    const timer = setTimeout(() => {
      setAttackingEntity(turn.attacker);
      setPetHP(turn.petHP);
      setEnemyHP(turn.enemyHP);

      setTimeout(() => setAttackingEntity(null), 300);
      setCurrentTurn((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [battleState, currentTurn]);

  const petHPPct = petMaxHP > 0 ? Math.max(0, (petHP / petMaxHP) * 100) : 0;
  const enemyHPPct = enemyMaxHP > 0 ? Math.max(0, (enemyHP / enemyMaxHP) * 100) : 0;

  return (
    <div className="fixed inset-0 z-[80] flex flex-col items-center justify-center" style={{ background: 'var(--color-bg)' }}>
      <div className="w-full max-w-lg px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-display font-bold text-lg">
            {isBoss ? '⚔️ BOSS BATTLE' : `Piano ${floor}`}
          </h2>
          <p className="text-xs text-[var(--color-text-muted)]">
            {dungeon.name} — vs {enemy.name}
          </p>
        </div>

        {/* Battle area */}
        <div className="flex items-center justify-between mb-8">
          {/* Pet side */}
          <div className={`text-center transition-transform duration-200 ${attackingEntity === 'pet' ? 'translate-x-4 scale-110' : ''}`}>
            <PetSVG type={pet.type} stage={pet.stage} skin={pet.activeSkin} energy={pet.energy} mood={pet.mood} size={100} animate={false} />
            <div className="mt-2 w-24 mx-auto">
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-surface)' }}>
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${petHPPct}%`, background: petHPPct > 50 ? '#22C55E' : petHPPct > 25 ? '#F59E0B' : '#EF4444' }} />
              </div>
              <div className="text-[10px] font-mono text-[var(--color-text-muted)] mt-0.5">{Math.round(petHP)}/{petMaxHP} HP</div>
            </div>
          </div>

          {/* VS */}
          <div className="font-display font-bold text-2xl text-[var(--color-text-muted)]">
            {battleState === 'starting' ? '...' : battleState === 'result' ? '' : '⚡'}
          </div>

          {/* Enemy side */}
          <div className={`text-center transition-transform duration-200 ${attackingEntity === 'enemy' ? '-translate-x-4 scale-110' : ''}`}>
            <EnemySVG enemy={enemy} dungeonIndex={dungeonIndex} size={100} />
            <div className="mt-2 w-24 mx-auto">
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-surface)' }}>
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${enemyHPPct}%`, background: '#EF4444' }} />
              </div>
              <div className="text-[10px] font-mono text-[var(--color-text-muted)] mt-0.5">{Math.round(enemyHP)}/{enemyMaxHP} HP</div>
            </div>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="text-center animate-bounce-in">
            {result === 'victory' ? (
              <div>
                <div className="text-4xl mb-2">🎉</div>
                <h3 className="font-display font-bold text-2xl text-[var(--color-accent)]">Vittoria!</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                  +{isBoss ? XP_REWARDS.DUNGEON_BOSS : XP_REWARDS.DUNGEON_FLOOR} XP
                </p>
                {isBoss && dungeon.reward?.skinName && (
                  <p className="text-sm text-[var(--color-warning)] mt-1 font-bold">
                    🎨 Skin sbloccata: {dungeon.reward.skinName}!
                  </p>
                )}
                {isBoss && dungeon.reward?.title && (
                  <p className="text-sm text-[var(--color-secondary)] mt-1">
                    🏆 Titolo: {dungeon.reward.title}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <div className="text-4xl mb-2">💀</div>
                <h3 className="font-display font-bold text-2xl text-[var(--color-danger)]">Sconfitta</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                  Completa più abitudini per rafforzare il tuo pet!
                </p>
              </div>
            )}
            <button
              onClick={onComplete}
              className="mt-6 px-8 py-3 rounded-xl font-bold text-sm transition-all"
              style={{ background: 'var(--color-primary)', color: 'var(--color-bg)' }}
            >
              Continua
            </button>
          </div>
        )}

        {/* Loading */}
        {battleState === 'starting' && (
          <div className="text-center text-[var(--color-text-muted)] animate-pulse">
            Preparazione alla battaglia...
          </div>
        )}
      </div>
    </div>
  );
}
