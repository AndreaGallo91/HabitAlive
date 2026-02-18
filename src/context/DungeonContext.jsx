import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { DUNGEONS } from '../data/dungeons';

const DungeonContext = createContext();

function createDefaultDungeonState() {
  const state = {};
  DUNGEONS.forEach((dungeon, index) => {
    state[dungeon.id] = {
      unlocked: index === 0,
      completed: false,
      currentFloor: 1,
      floors: {},
    };
    for (let i = 1; i <= 5; i++) {
      state[dungeon.id].floors[i] = { completed: false, stars: 0 };
    }
  });
  return state;
}

const DEFAULT_DUNGEON_STATE = {
  dungeons: createDefaultDungeonState(),
  totalBossesDefeated: 0,
  unlockedTitles: [],
  unlockedThemes: [],
  neverLost: true,
};

export function DungeonProvider({ children }) {
  const [dungeonState, setDungeonState] = useState(
    () => loadFromStorage('DUNGEON') || DEFAULT_DUNGEON_STATE
  );

  useEffect(() => { saveToStorage('DUNGEON', dungeonState); }, [dungeonState]);

  const completeFloor = useCallback((dungeonId, floor, stars) => {
    setDungeonState((prev) => {
      const dungeon = prev.dungeons[dungeonId];
      if (!dungeon) return prev;

      const newFloors = {
        ...dungeon.floors,
        [floor]: { completed: true, stars },
      };

      const allFloorsCompleted = Object.values(newFloors).every((f) => f.completed);
      const nextFloor = floor < 5 ? floor + 1 : floor;
      
      const dungeonData = DUNGEONS.find((d) => d.id === dungeonId);
      const dungeonIndex = DUNGEONS.findIndex((d) => d.id === dungeonId);
      const isBoss = floor === 5;

      let newTitles = [...prev.unlockedTitles];
      let newThemes = [...prev.unlockedThemes];
      let totalBosses = prev.totalBossesDefeated;

      if (isBoss) {
        totalBosses += 1;
        if (dungeonData?.reward?.title && !newTitles.includes(dungeonData.reward.title)) {
          newTitles.push(dungeonData.reward.title);
        }
        if (dungeonData?.reward?.theme && !newThemes.includes(dungeonData.reward.theme)) {
          newThemes.push(dungeonData.reward.theme);
        }
      }

      const newDungeons = { ...prev.dungeons };
      newDungeons[dungeonId] = {
        ...dungeon,
        floors: newFloors,
        currentFloor: nextFloor,
        completed: allFloorsCompleted,
      };

      if (allFloorsCompleted && dungeonIndex < DUNGEONS.length - 1) {
        const nextDungeonId = DUNGEONS[dungeonIndex + 1].id;
        newDungeons[nextDungeonId] = {
          ...newDungeons[nextDungeonId],
          unlocked: true,
        };
      }

      return {
        ...prev,
        dungeons: newDungeons,
        totalBossesDefeated: totalBosses,
        unlockedTitles: newTitles,
        unlockedThemes: newThemes,
      };
    });
  }, []);

  const recordLoss = useCallback(() => {
    setDungeonState((prev) => ({ ...prev, neverLost: false }));
  }, []);

  const getDungeonStatus = useCallback((dungeonId) => {
    return dungeonState.dungeons[dungeonId] || null;
  }, [dungeonState]);

  const value = {
    dungeonState,
    completeFloor,
    recordLoss,
    getDungeonStatus,
  };

  return <DungeonContext.Provider value={value}>{children}</DungeonContext.Provider>;
}

export function useDungeonContext() {
  const context = useContext(DungeonContext);
  if (!context) {
    throw new Error('useDungeonContext must be used within a DungeonProvider');
  }
  return context;
}
