import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

// Taurus constellation star map — positions within a 64x52px SVG viewport
// Key features: Pleiades cluster (top-left), Hyades V with Aldebaran (center), horn tips (right)
const STARS = [
  // Pleiades cluster — tight group, top left
  { id: 'p1', cx: 7,  cy: 9,  r: 1.2, label: 'pleiades' },
  { id: 'p2', cx: 13, cy: 6,  r: 1.4, label: 'pleiades' },
  { id: 'p3', cx: 19, cy: 8,  r: 1.2, label: 'pleiades' },
  { id: 'p4', cx: 11, cy: 13, r: 1.0, label: 'pleiades' },

  // Hyades V — center body of Taurus
  { id: 'ep',  cx: 34, cy: 16, r: 1.3, label: 'hyades' }, // Epsilon Tau
  { id: 'del', cx: 29, cy: 20, r: 1.3, label: 'hyades' }, // Delta Tau
  { id: 'gam', cx: 25, cy: 26, r: 1.4, label: 'hyades' }, // Gamma Tau
  { id: 'the', cx: 40, cy: 22, r: 1.3, label: 'hyades' }, // Theta Tau
  // Aldebaran — the bull's eye, brightest star, anchor of the constellation
  { id: 'ald', cx: 36, cy: 30, r: 2.4, label: 'aldebaran' },

  // Horn tips — right side
  { id: 'bet', cx: 56, cy: 8,  r: 1.3, label: 'horn' }, // Beta Tau (Elnath) — north horn
  { id: 'zet', cx: 54, cy: 38, r: 1.2, label: 'horn' }, // Zeta Tau — south horn
];

// Constellation lines connecting the stars
const LINES = [
  // Pleiades internal
  ['p1', 'p2'], ['p2', 'p3'], ['p1', 'p4'], ['p4', 'p2'],
  // Pleiades to Hyades bridge
  ['p3', 'ep'],
  // Hyades V shape
  ['ep', 'del'], ['del', 'gam'], ['gam', 'ald'],
  ['ep', 'the'], ['the', 'ald'],
  // Horns from Hyades
  ['ep', 'bet'], ['the', 'zet'],
];

const starMap = Object.fromEntries(STARS.map(s => [s.id, s]));

// Each star gets its own twinkle delay so they feel independent
const TWINKLE_DELAYS = Object.fromEntries(
  STARS.map((s, i) => [s.id, (i * 0.37) % 2.4])
);

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const x = useSpring(mouseX, { damping: 28, stiffness: 350, mass: 0.15 });
  const y = useSpring(mouseY, { damping: 28, stiffness: 350, mass: 0.15 });

  useEffect(() => {
    setMounted(true);
    let prevHovering = false;
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const t = e.target as HTMLElement;
      const hovering = !!(
        t.closest('button') || t.closest('a') || t.closest('[data-hover]') ||
        t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT'
      );
      if (hovering !== prevHovering) {
        prevHovering = hovering;
        setIsHovering(hovering);
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none hidden md:block overflow-hidden">
      <motion.div
        className="absolute top-0 left-0"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{ scale: isHovering ? 1.15 : 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          {/* Ambient glow underneath — Aldebaran's warmth */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 40,
              height: 40,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(200,134,10,0.18) 0%, transparent 70%)',
              filter: 'blur(8px)',
            }}
            animate={{ opacity: isHovering ? 1 : 0.4 }}
            transition={{ duration: 0.6 }}
          />

          <svg
            width={64}
            height={52}
            viewBox="0 0 64 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Constellation lines — appear on hover */}
            <AnimatePresence>
              {isHovering && LINES.map(([a, b]) => {
                const sa = starMap[a];
                const sb = starMap[b];
                return (
                  <motion.line
                    key={`${a}-${b}`}
                    x1={sa.cx} y1={sa.cy}
                    x2={sb.cx} y2={sb.cy}
                    stroke="#C8860A"
                    strokeWidth={0.5}
                    strokeOpacity={0.45}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                );
              })}
            </AnimatePresence>

            {/* Stars */}
            {STARS.map((star) => {
              const isAldebaran = star.label === 'aldebaran';
              const delay = TWINKLE_DELAYS[star.id];
              return (
                <motion.circle
                  key={star.id}
                  cx={star.cx}
                  cy={star.cy}
                  r={star.r}
                  fill={isAldebaran ? '#C8860A' : '#F2EDE3'}
                  animate={{
                    opacity: isHovering
                      ? isAldebaran ? 1 : 0.9
                      : [0.5, 1, 0.5],
                    r: isHovering && isAldebaran ? star.r * 1.5 : star.r,
                    filter: isHovering && isAldebaran
                      ? 'drop-shadow(0 0 3px rgba(200,134,10,0.9))'
                      : 'drop-shadow(0 0 1px rgba(242,237,227,0.6))',
                  }}
                  transition={
                    isHovering
                      ? { duration: 0.35, ease: 'easeOut' }
                      : {
                          duration: 2.2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay,
                        }
                  }
                />
              );
            })}
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CustomCursor;
