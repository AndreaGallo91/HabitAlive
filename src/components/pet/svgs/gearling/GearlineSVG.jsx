export default function GearlineSVG({ stage, skin, energy, mood, size = 200, animate = true }) {
  const isAsleep = energy === 0;

  const skinColors = {
    default: { body: '#6B7280', gear: '#F59E0B', accent: '#B45309' },
    cristallina: { body: '#818CF8', gear: '#E0E7FF', accent: '#C4B5FD' },
    ombra: { body: '#374151', gear: '#6B7280', accent: '#4B5563' },
    rocciosa: { body: '#78716C', gear: '#A8A29E', accent: '#D6D3D1' },
    elettrica: { body: '#475569', gear: '#38BDF8', accent: '#0EA5E9' },
    infernale: { body: '#7C2D12', gear: '#FB923C', accent: '#EA580C' },
    glaciale: { body: '#94A3B8', gear: '#67E8F9', accent: '#22D3EE' },
  };

  const colors = skinColors[skin] || skinColors.default;
  const sizeMultiplier = stage === 'cucciolo' ? 0.6 : stage === 'giovane' ? 0.8 : stage === 'leggendario' ? 1.1 : 1;

  const gearPath = (cx, cy, r, teeth) => {
    let path = '';
    for (let i = 0; i < teeth; i++) {
      const angle1 = (i / teeth) * 2 * Math.PI;
      const angle2 = ((i + 0.3) / teeth) * 2 * Math.PI;
      const angle3 = ((i + 0.5) / teeth) * 2 * Math.PI;
      const angle4 = ((i + 0.7) / teeth) * 2 * Math.PI;
      
      const outerR = r * 1.3;
      path += `${i === 0 ? 'M' : 'L'} ${cx + r * Math.cos(angle1)} ${cy + r * Math.sin(angle1)} `;
      path += `L ${cx + outerR * Math.cos(angle2)} ${cy + outerR * Math.sin(angle2)} `;
      path += `L ${cx + outerR * Math.cos(angle3)} ${cy + outerR * Math.sin(angle3)} `;
      path += `L ${cx + r * Math.cos(angle4)} ${cy + r * Math.sin(angle4)} `;
    }
    return path + 'Z';
  };

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g transform={`translate(100,100) scale(${sizeMultiplier}) translate(-100,-100)`}>
        {/* Background gear */}
        {stage !== 'cucciolo' && (
          <g>
            {animate && <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite" />}
            <path d={gearPath(100, 100, 70, 12)} fill={colors.gear} opacity="0.1" />
          </g>
        )}

        {/* Body */}
        <rect x={stage === 'cucciolo' ? 75 : 65} y={stage === 'cucciolo' ? 85 : 80} width={stage === 'cucciolo' ? 50 : 70} height={stage === 'cucciolo' ? 55 : 70} rx="10" fill={colors.body} />

        {/* Chest plate */}
        <rect x={stage === 'cucciolo' ? 82 : 72} y={stage === 'cucciolo' ? 95 : 90} width={stage === 'cucciolo' ? 36 : 56} height={stage === 'cucciolo' ? 30 : 40} rx="5" fill={colors.accent} opacity="0.3" />

        {/* Chest light */}
        <circle cx="100" cy={stage === 'cucciolo' ? 110 : 110} r="6" fill={colors.gear}>
          {animate && <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />}
        </circle>

        {/* Head */}
        <rect x={stage === 'cucciolo' ? 80 : 75} y={stage === 'cucciolo' ? 60 : 50} width={stage === 'cucciolo' ? 40 : 50} height={stage === 'cucciolo' ? 30 : 35} rx="8" fill={colors.body} />

        {/* Antenna */}
        <line x1="100" y1={stage === 'cucciolo' ? 60 : 50} x2="100" y2={stage === 'cucciolo' ? 48 : 35} stroke={colors.gear} strokeWidth="2" />
        <circle cx="100" cy={stage === 'cucciolo' ? 46 : 33} r="4" fill={colors.gear}>
          {animate && !isAsleep && <animate attributeName="fill" values={`${colors.gear};${colors.accent};${colors.gear}`} dur="1.5s" repeatCount="indefinite" />}
        </circle>

        {/* Eyes - screens */}
        {isAsleep ? (
          <>
            <rect x="85" y={stage === 'cucciolo' ? 70 : 60} width="10" height="2" rx="1" fill={colors.gear} opacity="0.5" />
            <rect x="105" y={stage === 'cucciolo' ? 70 : 60} width="10" height="2" rx="1" fill={colors.gear} opacity="0.5" />
          </>
        ) : (
          <>
            <rect x="84" y={stage === 'cucciolo' ? 66 : 56} width="12" height="10" rx="2" fill={colors.gear} />
            <rect x="104" y={stage === 'cucciolo' ? 66 : 56} width="12" height="10" rx="2" fill={colors.gear} />
            <rect x="86" y={stage === 'cucciolo' ? 68 : 58} width="4" height="6" rx="1" fill={colors.body} />
            <rect x="106" y={stage === 'cucciolo' ? 68 : 58} width="4" height="6" rx="1" fill={colors.body} />
          </>
        )}

        {/* Arms */}
        {stage !== 'cucciolo' && (
          <>
            <rect x="50" y="90" width="15" height="8" rx="4" fill={colors.body} />
            <rect x="135" y="90" width="15" height="8" rx="4" fill={colors.body} />
            <circle cx="50" cy="94" r="5" fill={colors.gear} />
            <circle cx="150" cy="94" r="5" fill={colors.gear} />
          </>
        )}

        {/* Legs */}
        <rect x={stage === 'cucciolo' ? 82 : 78} y={stage === 'cucciolo' ? 138 : 148} width="12" height={stage === 'cucciolo' ? 12 : 15} rx="4" fill={colors.body} />
        <rect x={stage === 'cucciolo' ? 106 : 110} y={stage === 'cucciolo' ? 138 : 148} width="12" height={stage === 'cucciolo' ? 12 : 15} rx="4" fill={colors.body} />

        {/* Side gears for adulto+ */}
        {(stage === 'adulto' || stage === 'leggendario') && (
          <>
            <g>
              {animate && <animateTransform attributeName="transform" type="rotate" from="0 55 120" to="360 55 120" dur="8s" repeatCount="indefinite" />}
              <path d={gearPath(55, 120, 10, 6)} fill={colors.gear} opacity="0.6" />
            </g>
            <g>
              {animate && <animateTransform attributeName="transform" type="rotate" from="360 145 120" to="0 145 120" dur="8s" repeatCount="indefinite" />}
              <path d={gearPath(145, 120, 10, 6)} fill={colors.gear} opacity="0.6" />
            </g>
          </>
        )}

        {/* Crown gear for leggendario */}
        {stage === 'leggendario' && (
          <g>
            {animate && <animateTransform attributeName="transform" type="rotate" from="0 100 33" to="360 100 33" dur="10s" repeatCount="indefinite" />}
            <path d={gearPath(100, 33, 12, 8)} fill="#EAB308" />
          </g>
        )}
      </g>
    </svg>
  );
}
