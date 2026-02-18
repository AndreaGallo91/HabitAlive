export function getStageForLevel(level) {
  if (level >= 10) return 'leggendario';
  if (level >= 7) return 'adulto';
  if (level >= 4) return 'giovane';
  return 'cucciolo';
}

export function getDominantCategory(logs, habits) {
  if (!logs || !habits || habits.length === 0) return 'balanced';

  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const categoryCounts = {};

  Object.entries(logs).forEach(([date, dayLog]) => {
    const logDate = new Date(date);
    if (logDate < weekAgo) return;

    if (dayLog.completions) {
      Object.entries(dayLog.completions).forEach(([habitId, completion]) => {
        if (completion.completed) {
          const habit = habits.find((h) => h.id === habitId);
          if (habit) {
            categoryCounts[habit.category] = (categoryCounts[habit.category] || 0) + 1;
          }
        }
      });
    }
  });

  const entries = Object.entries(categoryCounts);
  if (entries.length === 0) return 'balanced';

  entries.sort((a, b) => b[1] - a[1]);
  
  if (entries.length > 1 && entries[0][1] === entries[1][1]) {
    return 'balanced';
  }

  return entries[0][0];
}

export function getCategoryToPetType(category) {
  const mapping = {
    fitness: 'ironback',
    learning: 'lumino',
    mindfulness: 'zephyr',
    productivity: 'gearling',
    health: 'bloomie',
    custom: 'prismo',
    balanced: 'prismo',
  };
  return mapping[category] || 'prismo';
}

export function calculatePetEnergy(todayCompletions, totalHabits) {
  const baseEnergy = 0;
  const completed = Object.values(todayCompletions || {}).filter((c) => c.completed).length;
  const energyPerHabit = totalHabits > 0 ? Math.min(15, 100 / totalHabits) : 15;
  return Math.min(100, baseEnergy + completed * energyPerHabit);
}

export function calculatePetMood(currentStreak, streakBroken) {
  if (streakBroken) return Math.max(0, 50 - 10);
  return Math.min(100, 50 + currentStreak * 2);
}

export function calculatePetPower(level, achievementCount, bossesDefeated) {
  return level * 10 + achievementCount * 5 + bossesDefeated * 10;
}
