import { useMemo } from 'react';
import { useHabitContext } from '../../context/HabitContext';
import { getToday, addDays } from '../../utils/dateHelpers';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProgressChart() {
  const { logs, getActiveHabits, getCompletionsForDate } = useHabitContext();
  const activeHabits = getActiveHabits();
  const today = getToday();

  const data = useMemo(() => {
    const points = [];
    for (let i = 13; i >= 0; i--) {
      const date = addDays(today, -i);
      const completions = getCompletionsForDate(date);
      const completed = activeHabits.filter((h) => completions[h.id]?.completed).length;
      const dayNum = date.split('-')[2];
      points.push({
        name: `${dayNum}`,
        completate: completed,
        totale: activeHabits.length,
      });
    }
    return points;
  }, [logs, activeHabits, today, getCompletionsForDate]);

  return (
    <div className="p-4 rounded-xl border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      <h3 className="font-display font-bold text-sm mb-3">Progressi (14 giorni)</h3>
      {activeHabits.length === 0 ? (
        <div className="text-center py-6 text-xs text-[var(--color-text-muted)]">
          Crea abitudini per vedere i progressi
        </div>
      ) : (
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                tick={{ fill: '#64748B', fontSize: 10 }}
                axisLine={{ stroke: '#2D3548' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#64748B', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={20}
              />
              <Tooltip
                contentStyle={{
                  background: '#1A1F2E',
                  border: '1px solid #2D3548',
                  borderRadius: '8px',
                  color: '#F8FAFC',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="completate"
                stroke="#00D4FF"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorComp)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
