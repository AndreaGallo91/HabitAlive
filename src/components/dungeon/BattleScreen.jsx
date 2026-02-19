import { useState, useEffect, useRef } from 'react';
import { usePetContext } from '../../context/PetContext';
import { useHabitContext } from '../../context/HabitContext';
import { useDungeonContext } from '../../context/DungeonContext';
import { calculateBattleResult } from '../../utils/battleEngine';
import { XP_REWARDS } from '../../utils/xpCalculator';
import { tryUnlockAchievement } from '../../utils/achievementChecker';
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

  const achCtx = { profile, unlockAchievement, queueAchievement, addXP };

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
          if (totalBosses === 1) tryUnlockAchievement('esploratore', achCtx);
          if (totalBosses >= 10) tryUnlockAchievement('sterminatore', achCtx);
        }
      } else {
        recordLoss();
      }
      return;
    }

    const turn = turns[currentTurn];
    const timer = setTimeout(() => {
      setAttackingEntity(turn.attacker);
      setPetHP(turn.petHP);
      setEnemyHP(turn.enemyHP);
      setTimeout(() => setAttackingEntity(null), 300);
      setCurrentTurn((prev) => prev + 1);
    }, 600);

    return () => clearTimeout(timer);
  }, [battleState, currentTurn]);

  const petHPPct = petMaxHP > 0 ? Math.max(0, (petHP / petMaxHP) * 100) : 0;
  const enemyHPPct = enemyMaxHP > 0 ? Math.max(0, (enemyHP / enemyMaxHP) * 100) : 0;

  return (
    <div className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[var(--color-bg)]">
      <div className="w-full max-w-lg px-4">
        <div className="text-center mb-6">
          <h2 className="font-display font-bold text-lg">
            {isBoss ? '⚔️ BOSS BATTLE' : `Piano ${floor}`}
          </h2>
          <p className="text-xs text-[var(--color-text-muted)]">
            {dungeon.name} — vs {enemy.name}
          </p>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className={`text-center transition-transform duration-200 ${attackingEntity === 'pet' ? 'translate-x-4 scale-110' : ''}`}>
            <PetSVG type={pet.type} stage={pet.stage} skin={pet.activeSkin} energy={pet.energy} mood={pet.mood} size={100} animate={false} />
            <div className="mt-2 w-24 mx-auto">
              <div className="stat-bar h-2">
                <div
                  className="stat-bar-fill"
                  style={{
                    width: `${petHPPct}%`,
                    background: petHPPct > 50 ? '#22C55E' : petHPPct > 25 ? '#F59E0B' : '#EF4444',
                  }}
                />
              </div>
              <div className="text-[10px] font-mono text-[var(--color-text-muted)] mt-0.5">
                {Math.round(petHP)}/{petMaxHP} HP
              </div>
            </div>
          </div>

          <div className="font-display font-bold text-2xl text-[var(--color-text-muted)]">
            {battleState === 'starting' ? '...' : battleState === 'result' ? '' : '⚡'}
          </div>

          <div className={`text-center transition-transform duration-200 ${attackingEntity === 'enemy' ? '-translate-x-4 scale-110' : ''}`}>
            <EnemySVG enemy={enemy} dungeonIndex={dungeonIndex} size={100} />
            <div className="mt-2 w-24 mx-auto">
              <div className="stat-bar h-2">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${enemyHPPct}%`, background: '#EF4444' }}
                />
              </div>
              <div className="text-[10px] font-mono text-[var(--color-text-muted)] mt-0.5">
                {Math.round(enemyHP)}/{enemyMaxHP} HP
              </div>
            </div>
          </div>
        </div>

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
            <button onClick={onComplete} className="btn-primary mt-6 px-8">
              Continua
            </button>
          </div>
        )}

        {battleState === 'starting' && (
          <div className="text-center text-[var(--color-text-muted)] animate-pulse">
            Preparazione alla battaglia...
          </div>
        )}
      </div>
    </div>
  );
}
