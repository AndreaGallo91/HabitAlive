import { useEffect, useState } from 'react';

const COLORS = ['#00D4FF', '#A855F7', '#22C55E', '#F59E0B', '#EF4444', '#EC4899'];

function ConfettiPiece({ index }) {
  const color = COLORS[index % COLORS.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 0.5;
  const duration = 1.5 + Math.random() * 1;
  const size = 6 + Math.random() * 6;
  const rotation = Math.random() * 360;

  return (
    <div
      className="absolute top-0"
      style={{
        left: `${left}%`,
        width: `${size}px`,
        height: `${size * 0.4}px`,
        backgroundColor: color,
        borderRadius: '2px',
        transform: `rotate(${rotation}deg)`,
        animation: `confetti-fall ${duration}s ease-out ${delay}s forwards`,
        opacity: 0.9,
      }}
    />
  );
}

export default function Confetti({ active, onComplete }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (active) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </div>
  );
}
