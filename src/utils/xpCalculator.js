export const XP_REWARDS = {
  COMPLETE_HABIT: 10,
  PERFECT_DAY: 25,
  STREAK_7: 50,
  STREAK_30: 200,
  ACHIEVEMENT: 100,
  DUNGEON_FLOOR: 30,
  DUNGEON_BOSS: 150,
};

export function calculateLevel(totalXP) {
  return Math.floor(Math.sqrt(totalXP / 100));
}

export function xpForLevel(level) {
  return level * level * 100;
}

export function xpProgress(totalXP) {
  const currentLevel = calculateLevel(totalXP);
  const currentLevelXP = xpForLevel(currentLevel);
  const nextLevelXP = xpForLevel(currentLevel + 1);
  const progress = totalXP - currentLevelXP;
  const needed = nextLevelXP - currentLevelXP;
  return {
    currentLevel,
    currentXP: totalXP,
    progressInLevel: progress,
    xpNeeded: needed,
    percentage: needed > 0 ? Math.min((progress / needed) * 100, 100) : 100,
  };
}

export function getTitleForLevel(level) {
  if (level >= 11) return { emoji: '🏆', title: 'Gran Maestro' };
  if (level >= 9) return { emoji: '👑', title: 'Leggenda' };
  if (level >= 7) return { emoji: '💎', title: 'Maestro' };
  if (level >= 5) return { emoji: '🔥', title: 'Guerriero' };
  if (level >= 3) return { emoji: '⚡', title: 'Apprendista' };
  return { emoji: '🌱', title: 'Novizio' };
}
