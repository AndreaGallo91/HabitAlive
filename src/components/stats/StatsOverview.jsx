import { useHabitContext } from '../../context/HabitContext';
import { usePetContext } from '../../context/PetContext';
import { Activity, Flame, Target, Trophy, Zap, Calendar } from 'lucide-react';
import WeeklyHeatmap from './WeeklyHeatmap';
import ProgressChart from './ProgressChart';

export default function StatsOverview() {
  const { profile } = useHabitContext();
  const { pet } = usePetContext();

  const stats = [
    { label: 'Abitudini Completate', value: profile.totalHabitsCompleted, icon: Target, color: 'var(--color-primary)' },
    { label: 'Giorni Attivi', value: profile.totalDaysActive, icon: Calendar, color: 'var(--color-secondary)' },
    { label: 'Streak Corrente', value: profile.currentStreak, icon: Flame, color: 'var(--color-warning)' },
    { label: 'Miglior Streak', value: profile.bestStreak, icon: Trophy, color: 'var(--color-accent)' },
    { label: 'XP Totali', value: profile.xp, icon: Zap, color: 'var(--color-primary)' },
    { label: 'Livello', value: profile.level, icon: Activity, color: 'var(--color-secondary)' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-display font-bold text-lg px-1">Statistiche</h2>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon size={14} style={{ color: stat.color }} />
                <span className="text-[10px] text-[var(--color-text-muted)]">{stat.label}</span>
              </div>
              <div className="font-mono font-bold text-xl" style={{ color: stat.color }}>
                {stat.value.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>

      <WeeklyHeatmap />
      <ProgressChart />
    </div>
  );
}
