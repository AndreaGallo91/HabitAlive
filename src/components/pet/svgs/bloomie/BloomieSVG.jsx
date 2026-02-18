export default function BloomieSVG({ stage, skin, energy, mood, size = 200, animate = true }) {
  const isAsleep = energy === 0;
  const isSad = mood < 30;

  const skinColors = {
    default: { body: '#22C55E', flower: '#EC4899', accent: '#86EFAC' },
    cristallina: { body: '#67E8F9', flower: '#C084FC', accent: '#A5F3FC' },
    ombra: { body: '#14532D', flower: '#581C87', accent: '#166534' },
    rocciosa: { body: '#78716C', flower: '#D6D3D1', accent: '#A8A29E' },
    elettrica: { body: '#16A34A', flower: '#FBBF24', accent: '#4ADE80' },
    infernale: { body: '#B91C1C', flower: '#FB923C', accent: '#EF4444' },
    glaciale: { body: '#0EA5E9', flower: '#E0F2FE', accent: '#7DD3FC' },
  };

  const colors = skinColors[skin] || skinColors.default;
  const sizeMultiplier = stage === 'cucciolo' ? 0.6 : stage === 'giovane' ? 0.8 : stage === 'leggendario' ? 1.1 : 1;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g transform={`translate(100,100) scale(${sizeMultiplier}) translate(-100,-100)`}>
        {/* Leaf/vine decorations for adulto+ */}
        {(stage === 'adulto' || stage === 'leggendario') && (
          <>
            <path d="M 60 130 Q 40 110 50 90" fill="none" stroke={colors.body} strokeWidth="3" opacity="0.5">
              {animate && <animate attributeName="d" values="M 60 130 Q 40 110 50 90; M 60 130 Q 35 115 48 88; M 60 130 Q 40 110 50 90" dur="4s" repeatCount="indefinite" />}
            </path>
            <ellipse cx="48" cy="88" rx="8" ry="5" fill={colors.body} opacity="0.4" transform="rotate(-30 48 88)" />
            <path d="M 140 130 Q 160 110 150 90" fill="none" stroke={colors.body} strokeWidth="3" opacity="0.5">
              {animate && <animate attributeName="d" values="M 140 130 Q 160 110 150 90; M 140 130 Q 165 115 152 88; M 140 130 Q 160 110 150 90" dur="4s" begin="2s" repeatCount="indefinite" />}
            </path>
            <ellipse cx="152" cy="88" rx="8" ry="5" fill={colors.body} opacity="0.4" transform="rotate(30 152 88)" />
          </>
        )}

        {/* Body - round plant creature */}
        <ellipse cx="100" cy="115" rx={stage === 'cucciolo' ? 30 : 40} ry={stage === 'cucciolo' ? 35 : 45} fill={colors.body} />
        
        {/* Belly pattern */}
        <ellipse cx="100" cy="125" rx={stage === 'cucciolo' ? 20 : 28} ry={stage === 'cucciolo' ? 22 : 30} fill={colors.accent} opacity="0.4" />

        {/* Flower on head */}
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const petalR = stage === 'cucciolo' ? 8 : 12;
          const cx = 100 + (stage === 'cucciolo' ? 12 : 16) * Math.cos(((angle - 90) * Math.PI) / 180);
          const cy = (stage === 'cucciolo' ? 78 : 68) + (stage === 'cucciolo' ? 12 : 16) * Math.sin(((angle - 90) * Math.PI) / 180);
          return (
            <ellipse key={i} cx={cx} cy={cy} rx={petalR} ry={petalR * 0.7} fill={colors.flower} opacity="0.8" transform={`rotate(${angle} ${cx} ${cy})`}>
              {animate && <animate attributeName="opacity" values="0.6;0.9;0.6" dur="3s" begin={`${i * 0.2}s`} repeatCount="indefinite" />}
            </ellipse>
          );
        })}
        <circle cx="100" cy={stage === 'cucciolo' ? 78 : 68} r={stage === 'cucciolo' ? 6 : 8} fill="#FBBF24" />

        {/* Eyes */}
        {isAsleep ? (
          <>
            <path d="M 87 108 Q 92 105 97 108" fill="none" stroke="#14532D" strokeWidth="2" />
            <path d="M 103 108 Q 108 105 113 108" fill="none" stroke="#14532D" strokeWidth="2" />
          </>
        ) : (
          <>
            <circle cx="90" cy="105" r={stage === 'cucciolo' ? 5 : 6} fill="white" />
            <circle cx="110" cy="105" r={stage === 'cucciolo' ? 5 : 6} fill="white" />
            <circle cx="90" cy="106" r={stage === 'cucciolo' ? 3 : 4} fill="#14532D" />
            <circle cx="110" cy="106" r={stage === 'cucciolo' ? 3 : 4} fill="#14532D" />
            <circle cx="88" cy="104" r="1.5" fill="white" />
            <circle cx="108" cy="104" r="1.5" fill="white" />
          </>
        )}

        {/* Rosy cheeks */}
        {!isAsleep && !isSad && (
          <>
            <circle cx="80" cy="115" r="5" fill={colors.flower} opacity="0.3" />
            <circle cx="120" cy="115" r="5" fill={colors.flower} opacity="0.3" />
          </>
        )}

        {/* Mouth */}
        {!isAsleep && (
          isSad ? (
            <path d="M 95 120 Q 100 117 105 120" fill="none" stroke="#14532D" strokeWidth="1.5" />
          ) : (
            <path d="M 95 118 Q 100 124 105 118" fill="none" stroke="#14532D" strokeWidth="1.5" />
          )
        )}

        {/* Little feet */}
        <ellipse cx="85" cy="158" rx="10" ry="5" fill={colors.body} opacity="0.8" />
        <ellipse cx="115" cy="158" rx="10" ry="5" fill={colors.body} opacity="0.8" />

        {/* Sparkles for leggendario */}
        {stage === 'leggendario' && animate && (
          <>
            {[45, 135, 225, 315].map((angle, i) => (
              <g key={i} transform={`translate(${100 + 65 * Math.cos(angle * Math.PI / 180)}, ${100 + 65 * Math.sin(angle * Math.PI / 180)})`}>
                <line x1="-4" y1="0" x2="4" y2="0" stroke={colors.flower} strokeWidth="2" opacity="0.6">
                  <animate attributeName="opacity" values="0;1;0" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                </line>
                <line x1="0" y1="-4" x2="0" y2="4" stroke={colors.flower} strokeWidth="2" opacity="0.6">
                  <animate attributeName="opacity" values="0;1;0" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                </line>
              </g>
            ))}
          </>
        )}

        {isAsleep && animate && (
          <text x="130" y="85" fill={colors.accent} fontSize="14" fontFamily="sans-serif">Z<animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" /></text>
        )}
      </g>
    </svg>
  );
}
