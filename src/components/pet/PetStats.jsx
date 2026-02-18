import { Zap, Smile, Sword } from 'lucide-react';

const STATS = [
  { key: 'energy', label: 'Energia', icon: Zap, emoji: '⚡', color: '#F59E0B' },
  { key: 'mood', label: 'Umore', icon: Smile, emoji: '😊', color: '#22C55E' },
  { key: 'power', label: 'Potere', icon: Sword, emoji: '⚔️', color: '#EF4444' },
];

export default function PetStats({ pet, compact = false }) {
  return (
    <div className={`space-y-${compact ? '1.5' : '2'}`}>
      {STATS.map((stat) => {
        const value = pet[stat.key] || 0;
        const max = stat.key === 'power' ? Math.max(100, value) : 100;
        const pct = Math.min((value / max) * 100, 100);

        return (
          <div key={stat.key} className="flex items-center gap-2">
            <span className={compact ? 'text-xs' : 'text-sm'}>{stat.emoji}</span>
            <div className="flex-1">
              <div
                className={`${compact ? 'h-1.5' : 'h-2.5'} rounded-full overflow-hidden`}
                style={{ background: 'var(--color-bg)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${stat.color}, ${stat.color}99)`,
                    boxShadow: `0 0 8px ${stat.color}50`,
                  }}
                />
              </div>
            </div>
            <span
              className={`font-mono font-bold ${compact ? 'text-[10px] w-6' : 'text-xs w-8'} text-right`}
              style={{ color: stat.color }}
            >
              {Math.round(value)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
