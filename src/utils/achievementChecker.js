import { ACHIEVEMENTS } from '../data/achievements';

export function tryUnlockAchievement(achievementId, { profile, unlockAchievement, queueAchievement, addXP }) {
  if (profile.achievements.includes(achievementId)) return false;
  
  const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
  if (!achievement) return false;

  unlockAchievement(achievementId);
  queueAchievement(achievement);
  addXP(100, 'achievement');
  return true;
}

export function checkProfileAchievements({ profile, unlockAchievement, queueAchievement, addXP }) {
  const checks = [
    { id: 'guerriero-settimana', condition: profile.currentStreak >= 7 },
    { id: 'signore-mese', condition: profile.currentStreak >= 30 },
    { id: 'centurione', condition: profile.currentStreak >= 100 },
    { id: 'cacciatore-xp', condition: profile.xp >= 1000 },
    { id: 'club-livello-5', condition: profile.level >= 5 },
    { id: 'club-livello-10', condition: profile.level >= 10 },
  ];

  const ctx = { profile, unlockAchievement, queueAchievement, addXP };
  checks.forEach(({ id, condition }) => {
    if (condition) tryUnlockAchievement(id, ctx);
  });
}

export const ENERGY_THRESHOLD = 30;
export const BATTLE_MAX_TURNS = 20;
