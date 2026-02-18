import { formatDate, parseDate, daysBetween } from './dateHelpers';

export function calculateStreak(logs) {
  if (!logs || Object.keys(logs).length === 0) return { current: 0, best: 0 };

  const sortedDates = Object.keys(logs)
    .filter((date) => {
      const completions = logs[date]?.completions;
      if (!completions) return false;
      return Object.values(completions).some((c) => c.completed);
    })
    .sort((a, b) => new Date(b) - new Date(a));

  if (sortedDates.length === 0) return { current: 0, best: 0 };

  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 1;

  const today = formatDate(new Date());
  const yesterday = formatDate(new Date(Date.now() - 86400000));

  if (sortedDates[0] === today || sortedDates[0] === yesterday) {
    currentStreak = 1;
    for (let i = 1; i < sortedDates.length; i++) {
      const diff = daysBetween(parseDate(sortedDates[i]), parseDate(sortedDates[i - 1]));
      if (diff === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  tempStreak = 1;
  for (let i = 1; i < sortedDates.length; i++) {
    const diff = daysBetween(parseDate(sortedDates[i]), parseDate(sortedDates[i - 1]));
    if (diff === 1) {
      tempStreak++;
    } else {
      bestStreak = Math.max(bestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  bestStreak = Math.max(bestStreak, tempStreak, currentStreak);

  return { current: currentStreak, best: bestStreak };
}

export function shouldStreakShieldBeAvailable(currentStreak) {
  return currentStreak >= 7 && currentStreak % 7 === 0;
}
