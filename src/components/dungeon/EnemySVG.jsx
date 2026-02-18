export default function EnemySVG({ enemy, dungeonIndex = 0, size = 120 }) {
  const colors = [
    { body: '#22C55E', accent: '#86EFAC' },
    { body: '#6B7280', accent: '#D1D5DB' },
    { body: '#92400E', accent: '#FCD34D' },
    { body: '#6366F1', accent: '#A5B4FC' },
    { body: '#DC2626', accent: '#FCA5A5' },
    { body: '#0891B2', accent: '#67E8F9' },
  ];
  const c = colors[dungeonIndex % colors.length];
  const isBoss = enemy?.type === 'boss' || (enemy?.hp && enemy.hp > 200);
  const scale = isBoss ? 1.2 : 1;

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <g transform={`translate(60,60) scale(${scale}) translate(-60,-60)`}>
        {/* Shadow */}
        <ellipse cx="60" cy="105" rx="30" ry="8" fill="black" opacity="0.2" />
        
        {/* Body */}
        <ellipse cx="60" cy="65" rx={isBoss ? 35 : 28} ry={isBoss ? 40 : 32} fill={c.body}>
          <animate attributeName="ry" values={isBoss ? '40;42;40' : '32;34;32'} dur="2s" repeatCount="indefinite" />
        </ellipse>

        {/* Accent/belly */}
        <ellipse cx="60" cy="72" rx={isBoss ? 22 : 18} ry={isBoss ? 25 : 20} fill={c.accent} opacity="0.3" />

        {/* Eyes - angry */}
        <g>
          {isBoss ? (
            <>
              <circle cx="48" cy="55" r="8" fill="white" />
              <circle cx="72" cy="55" r="8" fill="white" />
              <circle cx="48" cy="56" r="5" fill="#1F2937" />
              <circle cx="72" cy="56" r="5" fill="#1F2937" />
              <circle cx="48" cy="55" r="2" fill="#EF4444" />
              <circle cx="72" cy="55" r="2" fill="#EF4444" />
              {/* Angry eyebrows */}
              <line x1="40" y1="46" x2="52" y2="48" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
              <line x1="80" y1="46" x2="68" y2="48" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="50" cy="58" r="5" fill="white" />
              <circle cx="70" cy="58" r="5" fill="white" />
              <circle cx="50" cy="59" r="3" fill="#1F2937" />
              <circle cx="70" cy="59" r="3" fill="#1F2937" />
              <line x1="44" y1="52" x2="54" y2="54" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
              <line x1="76" y1="52" x2="66" y2="54" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
        </g>

        {/* Mouth */}
        <path d={isBoss ? 'M 48 72 Q 52 68 56 72 Q 60 68 64 72 Q 68 68 72 72' : 'M 52 70 Q 60 65 68 70'} fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />

        {/* Boss horns/spikes */}
        {isBoss && (
          <>
            <polygon points="38,30 42,15 48,32" fill={c.body} />
            <polygon points="82,30 78,15 72,32" fill={c.body} />
            <polygon points="60,25 55,8 65,8" fill={c.accent} opacity="0.7" />
          </>
        )}
      </g>
    </svg>
  );
}
