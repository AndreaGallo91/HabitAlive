export default function ZephyrSVG({ stage, skin, energy, mood, size = 200, animate = true }) {
  const isAsleep = energy === 0;
  const isSad = mood < 30;

  const skinColors = {
    default: { body: '#A855F7', glow: '#06B6D4', accent: '#E2E8F0' },
    cristallina: { body: '#C084FC', glow: '#E0E7FF', accent: '#DDD6FE' },
    ombra: { body: '#581C87', glow: '#7C3AED', accent: '#6D28D9' },
    rocciosa: { body: '#A8A29E', glow: '#D6D3D1', accent: '#E7E5E4' },
    elettrica: { body: '#7C3AED', glow: '#38BDF8', accent: '#BFDBFE' },
    infernale: { body: '#BE123C', glow: '#FB923C', accent: '#FCA5A5' },
    glaciale: { body: '#67E8F9', glow: '#CFFAFE', accent: '#ECFEFF' },
  };

  const colors = skinColors[skin] || skinColors.default;
  const sizeMultiplier = stage === 'cucciolo' ? 0.6 : stage === 'giovane' ? 0.8 : stage === 'leggendario' ? 1.1 : 1;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`zephyr-glow-${skin}`}>
          <stop offset="0%" stopColor={colors.body} stopOpacity="0.6" />
          <stop offset="100%" stopColor={colors.body} stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform={`translate(100,100) scale(${sizeMultiplier}) translate(-100,-100)`}>
        {/* Floating effect */}
        <g>
          {animate && !isAsleep && (
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-8; 0,0" dur="4s" repeatCount="indefinite" />
          )}
          
          {/* Ethereal glow */}
          <circle cx="100" cy="105" r="60" fill={`url(#zephyr-glow-${skin})`} opacity="0.3">
            {animate && <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />}
          </circle>

          {/* Tentacles */}
          {stage !== 'cucciolo' && (
            <>
              {[70, 85, 100, 115, 130].map((x, i) => (
                <path key={i} d={`M ${x} 130 Q ${x + (i % 2 === 0 ? 5 : -5)} 155 ${x + (i % 2 === 0 ? -3 : 3)} 175`} fill="none" stroke={colors.body} strokeWidth="3" opacity="0.6" strokeLinecap="round">
                  {animate && <animate attributeName="d" values={`M ${x} 130 Q ${x + 5} 155 ${x - 3} 175; M ${x} 130 Q ${x - 5} 155 ${x + 3} 175; M ${x} 130 Q ${x + 5} 155 ${x - 3} 175`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />}
                </path>
              ))}
            </>
          )}

          {/* Body - jellyfish dome */}
          <ellipse cx="100" cy="100" rx={stage === 'cucciolo' ? 30 : 40} ry={stage === 'cucciolo' ? 28 : 35} fill={colors.body} opacity="0.7" />
          <ellipse cx="100" cy="95" rx={stage === 'cucciolo' ? 25 : 35} ry={stage === 'cucciolo' ? 20 : 28} fill={colors.accent} opacity="0.2" />

          {/* Inner glow */}
          <circle cx="100" cy="100" r={stage === 'cucciolo' ? 12 : 18} fill={colors.glow} opacity="0.3">
            {animate && <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />}
          </circle>

          {/* Eyes */}
          {isAsleep ? (
            <>
              <path d="M 88 96 Q 92 93 96 96" fill="none" stroke={colors.accent} strokeWidth="2" />
              <path d="M 104 96 Q 108 93 112 96" fill="none" stroke={colors.accent} strokeWidth="2" />
            </>
          ) : (
            <>
              <circle cx="90" cy="95" r="5" fill="white" opacity="0.9" />
              <circle cx="110" cy="95" r="5" fill="white" opacity="0.9" />
              <circle cx="90" cy="95" r="3" fill="#312E81" />
              <circle cx="110" cy="95" r="3" fill="#312E81" />
            </>
          )}

          {/* Serene smile */}
          {!isAsleep && !isSad && (
            <path d="M 95 105 Q 100 110 105 105" fill="none" stroke={colors.accent} strokeWidth="1.5" opacity="0.7" />
          )}

          {/* Particles for leggendario */}
          {stage === 'leggendario' && animate && (
            <>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <circle key={i} cx={100 + 55 * Math.cos(angle * Math.PI / 180)} cy={100 + 55 * Math.sin(angle * Math.PI / 180)} r="2" fill={colors.glow} opacity="0.5">
                  <animate attributeName="opacity" values="0;0.8;0" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                  <animate attributeName="r" values="1;3;1" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </>
          )}
        </g>

        {isAsleep && animate && (
          <>
            <text x="130" y="75" fill={colors.glow} fontSize="14" fontFamily="sans-serif">Z<animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" /></text>
          </>
        )}
      </g>
    </svg>
  );
}
