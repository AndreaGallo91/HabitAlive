export default function IronbackSVG({ stage, skin, energy, mood, size = 200, animate = true }) {
  const scale = size / 200;
  const isAsleep = energy === 0;
  const isSad = mood < 30;

  const skinColors = {
    default: { body: '#DC2626', armor: '#9CA3AF', accent: '#F97316' },
    cristallina: { body: '#818CF8', armor: '#C4B5FD', accent: '#E0E7FF' },
    ombra: { body: '#1F2937', armor: '#4B5563', accent: '#6B21A8' },
    rocciosa: { body: '#92400E', armor: '#78716C', accent: '#D6D3D1' },
    elettrica: { body: '#FBBF24', armor: '#60A5FA', accent: '#38BDF8' },
    infernale: { body: '#B91C1C', armor: '#7C2D12', accent: '#FB923C' },
    glaciale: { body: '#67E8F9', armor: '#E0F2FE', accent: '#0EA5E9' },
  };

  const colors = skinColors[skin] || skinColors.default;
  const sizeMultiplier = stage === 'cucciolo' ? 0.6 : stage === 'giovane' ? 0.8 : stage === 'leggendario' ? 1.1 : 1;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g transform={`translate(100,100) scale(${sizeMultiplier}) translate(-100,-100)`}>
        {stage === 'leggendario' && (
          <circle cx="100" cy="100" r="85" fill="none" stroke={colors.accent} strokeWidth="2" opacity="0.3">
            {animate && <animate attributeName="r" values="80;90;80" dur="3s" repeatCount="indefinite" />}
            {animate && <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />}
          </circle>
        )}

        {/* Body */}
        <ellipse cx="100" cy="120" rx={stage === 'cucciolo' ? 35 : 45} ry={stage === 'cucciolo' ? 30 : 40} fill={colors.body}>
          {animate && !isAsleep && <animate attributeName="ry" values={stage === 'cucciolo' ? '30;32;30' : '40;42;40'} dur="3s" repeatCount="indefinite" />}
        </ellipse>

        {/* Shell/Armor */}
        <ellipse cx="100" cy="110" rx={stage === 'cucciolo' ? 30 : 40} ry={stage === 'cucciolo' ? 22 : 30} fill={colors.armor} opacity="0.8" />
        
        {stage !== 'cucciolo' && (
          <>
            <line x1="100" y1="80" x2="100" y2="140" stroke={colors.body} strokeWidth="2" opacity="0.5" />
            <line x1="75" y1="95" x2="125" y2="125" stroke={colors.body} strokeWidth="2" opacity="0.5" />
            <line x1="125" y1="95" x2="75" y2="125" stroke={colors.body} strokeWidth="2" opacity="0.5" />
          </>
        )}

        {/* Head */}
        <circle cx="100" cy={stage === 'cucciolo' ? 85 : 75} r={stage === 'cucciolo' ? 20 : 25} fill={colors.body} />

        {/* Eyes */}
        {isAsleep ? (
          <>
            <line x1="88" y1={stage === 'cucciolo' ? 83 : 73} x2="96" y2={stage === 'cucciolo' ? 83 : 73} stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            <line x1="104" y1={stage === 'cucciolo' ? 83 : 73} x2="112" y2={stage === 'cucciolo' ? 83 : 73} stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            <text x="130" y={stage === 'cucciolo' ? 70 : 60} fill={colors.accent} fontSize="12" fontFamily="sans-serif" opacity="0.7">
              Z
              {animate && <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />}
            </text>
            <text x="140" y={stage === 'cucciolo' ? 58 : 48} fill={colors.accent} fontSize="10" fontFamily="sans-serif" opacity="0.5">
              z
              {animate && <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite" />}
            </text>
          </>
        ) : (
          <>
            <circle cx="92" cy={stage === 'cucciolo' ? 82 : 72} r={stage === 'cucciolo' ? 4 : 5} fill="white" />
            <circle cx="92" cy={stage === 'cucciolo' ? 82 : 72} r={stage === 'cucciolo' ? 2 : 3} fill="#1F2937" />
            <circle cx="108" cy={stage === 'cucciolo' ? 82 : 72} r={stage === 'cucciolo' ? 4 : 5} fill="white" />
            <circle cx="108" cy={stage === 'cucciolo' ? 82 : 72} r={stage === 'cucciolo' ? 2 : 3} fill="#1F2937" />
            {animate && (
              <>
                <circle cx="92" cy={stage === 'cucciolo' ? 82 : 72} r={stage === 'cucciolo' ? 2 : 3} fill="#1F2937">
                  <animate attributeName="r" values={stage === 'cucciolo' ? '2;0;2' : '3;0;3'} dur="4s" repeatCount="indefinite" begin="2s" />
                </circle>
                <circle cx="108" cy={stage === 'cucciolo' ? 82 : 72} r={stage === 'cucciolo' ? 2 : 3} fill="#1F2937">
                  <animate attributeName="r" values={stage === 'cucciolo' ? '2;0;2' : '3;0;3'} dur="4s" repeatCount="indefinite" begin="2s" />
                </circle>
              </>
            )}
          </>
        )}

        {/* Mouth */}
        {!isAsleep && (
          isSad ? (
            <path d={`M 93 ${stage === 'cucciolo' ? 92 : 82} Q 100 ${stage === 'cucciolo' ? 88 : 78} 107 ${stage === 'cucciolo' ? 92 : 82}`} fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d={`M 93 ${stage === 'cucciolo' ? 90 : 80} Q 100 ${stage === 'cucciolo' ? 96 : 86} 107 ${stage === 'cucciolo' ? 90 : 80}`} fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
          )
        )}

        {/* Arms/Legs */}
        {stage !== 'cucciolo' && (
          <>
            <ellipse cx="60" cy="130" rx="12" ry="8" fill={colors.body} />
            <ellipse cx="140" cy="130" rx="12" ry="8" fill={colors.body} />
            <ellipse cx="80" cy="155" rx="10" ry="7" fill={colors.body} />
            <ellipse cx="120" cy="155" rx="10" ry="7" fill={colors.body} />
          </>
        )}

        {/* Horns for adulto+ */}
        {(stage === 'adulto' || stage === 'leggendario') && (
          <>
            <polygon points="80,55 75,35 90,55" fill={colors.accent} />
            <polygon points="120,55 125,35 110,55" fill={colors.accent} />
          </>
        )}

        {/* Crown for leggendario */}
        {stage === 'leggendario' && (
          <>
            <polygon points="85,50 87,30 93,45 100,25 107,45 113,30 115,50" fill="#EAB308" stroke="#CA8A04" strokeWidth="1" />
          </>
        )}
      </g>
    </svg>
  );
}
