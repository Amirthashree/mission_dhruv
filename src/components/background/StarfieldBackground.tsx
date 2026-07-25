import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

function useStars(count: number): Star[] {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      })),
    [count],
  );
}

function ShootingStar({ delay, duration, top }: { delay: number; duration: number; top: number }) {
  return (
    <motion.div
      className="absolute h-px w-32 bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
      style={{ top: `${top}%` }}
      initial={{ x: '-10vw', opacity: 0 }}
      animate={{ x: '110vw', opacity: [0, 1, 1, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

export function StarfieldBackground() {
  const stars = useStars(140);
  const shootingStars = useMemo(
    () => [
      { delay: 4, duration: 1.5, top: 18 },
      { delay: 11, duration: 1.2, top: 42 },
      { delay: 19, duration: 1.8, top: 68 },
      { delay: 27, duration: 1.3, top: 30 },
    ],
    [],
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-space-950">
      {/* Nebula glows */}
      <div className="absolute -top-1/4 -left-1/4 h-[60vh] w-[60vh] rounded-full bg-neon-blue/10 blur-[120px]" />
      <div className="absolute top-1/3 -right-1/4 h-[50vh] w-[50vh] rounded-full bg-neon-cyan/10 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-[40vh] w-[40vh] rounded-full bg-neon-indigo/10 blur-[100px]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-40" />

      {/* Stars */}
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((s, i) => (
        <ShootingStar key={i} {...s} />
      ))}

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-space-950" 
           style={{ background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, #030712 100%)' }} />
    </div>
  );
}
