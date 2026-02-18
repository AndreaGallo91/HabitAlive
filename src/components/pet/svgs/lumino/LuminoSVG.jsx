export default function LuminoSVG({ stage, skin, energy, mood, size = 200, animate = true }) {
  const isAsleep = energy === 0;
  const isSad = mood < 30;

  const skinColors = {
    default: { body: '#3B82F6', glow: '#EAB308', accent: '#DBEAFE' },
    cristallina: { body: '#818CF8', glow: '#E0E7FF', accent: '#C4B5FD' },
    ombra: { body: '#312E81', glow: '#6366F1', accent: '#4338CA' },
    rocciosa: { body: '#78716C', glow: '#D6D3D1', accent: '#A8A29E' },
    elettrica: { body: '#2563EB', glow: '#38BDF8', accent: '#BFDBFE' },
    infernale: { body: '#DC2626', glow: '#FB923C', accent: '#FCA5A5' },
    glaciale: { body: '#0891B2', glow: '#67E8F9', accent: '#CFFAFE' },
  };

  const colors = skinColors[skin] || skinColors.default;
  const sizeMultiplier = stage === 'cucciolo' ? 0.6 : stage === 'giovane' ? 0.8 : stage === 'leggendario' ? 1.1 : 1;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`lumino-glow-${skin}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={colors.glow} stopOpacity="0.3" />
          <stop offset="100%" stopColor={colors.glow} stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform={`translate(100,100) scale(${sizeMultiplier}) translate(-100,-100)`}>
        {/* Glow aura */}
        <circle cx="100" cy="100" r="80" fill={`url(#lumino-glow-${skin})`}>
          {animate && <animate attributeName="r" values="75;85;75" dur="4s" repeatCount="indefinite" />}
        </circle>

        {stage === 'leggendario' && (
          <>
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <circle key={i} cx={100 + 70 * Math.cos(angle * Math.PI / 180)} cy={100 + 70 * Math.sin(angle * Math.PI / 180)} r="3" fill={colors.glow} opacity="0.6">
                {animate && <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />}
              </circle>
            ))}
          </>
        )}

        {/* Body - owl-like */}
        <ellipse cx="100" cy="115" rx={stage === 'cucciolo' ? 28 : 35} ry={stage === 'cucciolo' ? 32 : 40} fill={colors.body} />

        {/* Belly */}
        <ellipse cx="100" cy="125" rx={stage === 'cucciolo' ? 18 : 22} ry={stage === 'cucciolo' ? 20 : 25} fill={colors.accent} opacity="0.5" />

        {/* Ear tufts */}
        {stage !== 'cucciolo' && (
          <>
            <polygon points="75,78 65,55 85,75" fill={colors.body} />
            <polygon points="125,78 135,55 115,75" fill={colors.body} />
          </>
        )}

        {/* Eyes - large owl eyes */}
        {isAsleep ? (
          <>
            <path d="M 82 95 Q 90 90 98 95" fill="none" stroke={colors.accent} strokeWidth="2" />
            <path d="M 102 95 Q 110 90 118 95" fill="none" stroke={colors.accent} strokeWidth="2" />
          </>
        ) : (
          <>
            <circle cx="88" cy="92" r={stage === 'cucciolo' ? 10 : 13} fill="white" />
            <circle cx="112" cy="92" r={stage === 'cucciolo' ? 10 : 13} fill="white" />
            <circle cx="88" cy="92" r={stage === 'cucciolo' ? 6 : 8} fill="#1E293B" />
            <circle cx="112" cy="92" r={stage === 'cucciolo' ? 6 : 8} fill="#1E293B" />
            <circle cx="85" cy="89" r="3" fill="white" opacity="0.8" />
            <circle cx="109" cy="89" r="3" fill="white" opacity="0.8" />
            {animate && (
              <>
                <circle cx="88" cy="92" r={stage === 'cucciolo' ? 6 : 8} fill="#1E293B">
                  <animate attributeName="ry" values={stage === 'cucciolo' ? '6;1;6' : '8;1;8'} dur="5s" repeatCount="indefinite" begin="3s" />
                </circle>
              </>
            )}
          </>
        )}

        {/* Beak */}
        <polygon points="96,102 100,108 104,102" fill={colors.glow} />

        {/* Wings */}
        {stage !== 'cucciolo' && (
          <>
            <ellipse cx="62" cy="110" rx="12" ry="25" fill={colors.body} opacity="0.8" transform="rotate(-10 62 110)">
              {animate && !isAsleep && <animate attributeName="ry" values="25;22;25" dur="2s" repeatCount="indefinite" />}
            </ellipse>
            <ellipse cx="138" cy="110" rx="12" ry="25" fill={colors.body} opacity="0.8" transform="rotate(10 138 110)">
              {animate && !isAsleep && <animate attributeName="ry" values="25;22;25" dur="2s" repeatCount="indefinite" begin="1s" />}
            </ellipse>
          </>
        )}

        {/* Feet */}
        <ellipse cx="88" cy="155" rx="8" ry="4" fill={colors.glow} />
        <ellipse cx="112" cy="155" rx="8" ry="4" fill={colors.glow} />

        {/* Book for adulto+ */}
        {(stage === 'adulto' || stage === 'leggendario') && (
          <g transform="translate(100, 165)">
            <rect x="-15" y="-5" width="30" height="10" rx="2" fill="#92400E" />
            <line x1="-15" y1="0" x2="15" y2="0" stroke="#78350F" strokeWidth="1" />
            <rect x="-14" y="-4" width="28" height="3" rx="1" fill="#FEF3C7" opacity="0.5" />
          </g>
        )}

        {/* Sleeping Zs */}
        {isAsleep && animate && (
          <>
            <text x="130" y="70" fill={colors.glow} fontSize="14" fontFamily="sans-serif">Z<animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" /></text>
            <text x="142" y="55" fill={colors.glow} fontSize="10" fontFamily="sans-serif">z<animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.7s" repeatCount="indefinite" /></text>
          </>
        )}
      </g>
    </svg>
  );
}
