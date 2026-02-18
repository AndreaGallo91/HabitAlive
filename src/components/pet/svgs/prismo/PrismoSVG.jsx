export default function PrismoSVG({ stage, skin, energy, mood, size = 200, animate = true }) {
  const isAsleep = energy === 0;
  const isSad = mood < 30;

  const skinColors = {
    default: { body: '#A855F7', accent1: '#00D4FF', accent2: '#22C55E', accent3: '#F59E0B' },
    cristallina: { body: '#C084FC', accent1: '#E0E7FF', accent2: '#DDD6FE', accent3: '#A78BFA' },
    ombra: { body: '#3B0764', accent1: '#4C1D95', accent2: '#5B21B6', accent3: '#6D28D9' },
    rocciosa: { body: '#78716C', accent1: '#A8A29E', accent2: '#D6D3D1', accent3: '#E7E5E4' },
    elettrica: { body: '#6D28D9', accent1: '#38BDF8', accent2: '#818CF8', accent3: '#FBBF24' },
    infernale: { body: '#9F1239', accent1: '#DC2626', accent2: '#FB923C', accent3: '#FBBF24' },
    glaciale: { body: '#0E7490', accent1: '#67E8F9', accent2: '#A5F3FC', accent3: '#ECFEFF' },
  };

  const colors = skinColors[skin] || skinColors.default;
  const sizeMultiplier = stage === 'cucciolo' ? 0.6 : stage === 'giovane' ? 0.8 : stage === 'leggendario' ? 1.1 : 1;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`prismo-grad-${skin}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.accent1} />
          <stop offset="50%" stopColor={colors.body} />
          <stop offset="100%" stopColor={colors.accent2} />
        </linearGradient>
      </defs>
      <g transform={`translate(100,100) scale(${sizeMultiplier}) translate(-100,-100)`}>
        {/* Rainbow aura for leggendario */}
        {stage === 'leggendario' && animate && (
          <g>
            {['#EF4444', '#F59E0B', '#22C55E', '#00D4FF', '#A855F7'].map((color, i) => (
              <circle key={i} cx="100" cy="100" r={75 + i * 5} fill="none" stroke={color} strokeWidth="1" opacity="0.2">
                <animate attributeName="r" values={`${70 + i * 5};${80 + i * 5};${70 + i * 5}`} dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.1;0.3;0.1" dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>
        )}

        {/* Body - prismatic geometric */}
        <polygon points={`100,${stage === 'cucciolo' ? 70 : 60} ${stage === 'cucciolo' ? 130 : 145},${stage === 'cucciolo' ? 120 : 125} 100,${stage === 'cucciolo' ? 150 : 160} ${stage === 'cucciolo' ? 70 : 55},${stage === 'cucciolo' ? 120 : 125}`} fill={`url(#prismo-grad-${skin})`} opacity="0.8" />

        {/* Inner diamond */}
        <polygon points={`100,${stage === 'cucciolo' ? 82 : 75} ${stage === 'cucciolo' ? 118 : 128},${stage === 'cucciolo' ? 110 : 110} 100,${stage === 'cucciolo' ? 135 : 140} ${stage === 'cucciolo' ? 82 : 72},${stage === 'cucciolo' ? 110 : 110}`} fill={colors.accent3} opacity="0.3" />

        {/* Core glow */}
        <circle cx="100" cy={stage === 'cucciolo' ? 110 : 110} r="12" fill={colors.accent1} opacity="0.4">
          {animate && <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />}
          {animate && <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />}
        </circle>

        {/* Face area */}
        {isAsleep ? (
          <>
            <path d="M 90 105 Q 94 103 98 105" fill="none" stroke="white" strokeWidth="2" opacity="0.7" />
            <path d="M 102 105 Q 106 103 110 105" fill="none" stroke="white" strokeWidth="2" opacity="0.7" />
          </>
        ) : (
          <>
            <circle cx="92" cy="103" r="5" fill="white" opacity="0.9" />
            <circle cx="108" cy="103" r="5" fill="white" opacity="0.9" />
            <circle cx="92" cy="103" r="3" fill={colors.body} />
            <circle cx="108" cy="103" r="3" fill={colors.body} />
            <circle cx="90" cy="101" r="1.5" fill="white" opacity="0.8" />
            <circle cx="106" cy="101" r="1.5" fill="white" opacity="0.8" />
          </>
        )}

        {!isAsleep && !isSad && (
          <path d="M 96 112 Q 100 116 104 112" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
        )}

        {/* Floating crystals for giovane+ */}
        {stage !== 'cucciolo' && animate && (
          <>
            {[
              { x: 55, y: 80, color: colors.accent1 },
              { x: 145, y: 80, color: colors.accent2 },
              { x: 55, y: 140, color: colors.accent3 },
              { x: 145, y: 140, color: colors.accent1 },
            ].map((crystal, i) => (
              <polygon key={i} points={`${crystal.x},${crystal.y - 8} ${crystal.x + 5},${crystal.y} ${crystal.x},${crystal.y + 8} ${crystal.x - 5},${crystal.y}`} fill={crystal.color} opacity="0.5">
                <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              </polygon>
            ))}
          </>
        )}

        {isAsleep && animate && (
          <text x="125" y="80" fill={colors.accent1} fontSize="14" fontFamily="sans-serif">Z<animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" /></text>
        )}
      </g>
    </svg>
  );
}
