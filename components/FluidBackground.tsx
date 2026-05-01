import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const StarField = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.5 + 0.2
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            willChange: 'opacity',
          }}
          initial={{ opacity: star.opacity }}
          animate={{ opacity: [star.opacity, 1, star.opacity] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#121212]">
      <StarField />

      {/* Blob 1: Emerald/Green */}
      <motion.div
        className="absolute top-[-10%] left-[-5%] w-[55vw] h-[55vw] bg-[#065f46] rounded-full mix-blend-screen opacity-35"
        style={{ filter: 'blur(80px)', willChange: 'transform' }}
        animate={{ x: [0, 80, -40, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      />

      {/* Blob 2: Amber/Gold */}
      <motion.div
        className="absolute top-[15%] right-[-15%] w-[60vw] h-[50vw] bg-[#92400e] rounded-full mix-blend-screen opacity-25"
        style={{ filter: 'blur(80px)', willChange: 'transform' }}
        animate={{ x: [0, -80, 40, 0], y: [0, 80, -40, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blob 3: Deep Red */}
      <motion.div
        className="absolute bottom-[-20%] left-[15%] w-[50vw] h-[50vw] bg-[#7f1d1d] rounded-full mix-blend-screen opacity-25"
        style={{ filter: 'blur(80px)', willChange: 'transform' }}
        animate={{ x: [0, 100, -100, 0], y: [0, -80, 80, 0] }}
        transition={{ duration: 70, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
    </div>
  );
};

export default FluidBackground;
