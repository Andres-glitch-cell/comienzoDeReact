import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Cada elemento se anima individualmente con transition directa (sin variants custom)
// para evitar el error de tipos con ease string en pathLength
export default function AnimatedSVGLines() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const lineProps = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    transition: {
      pathLength: { delay, duration: 1.2, ease: 'easeInOut' as const },
      opacity:    { delay, duration: 0.1 },
    },
  });

  const nodeProps = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
    transition: {
      pathLength: { delay, duration: 0.6, ease: 'easeOut' as const },
      opacity:    { delay, duration: 0.1 },
    },
  });

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 800 200"
      style={{ width: '100%', height: '200px', overflow: 'visible' }}
    >
      {/* Línea horizontal principal */}
      <motion.line x1="0" y1="100" x2="800" y2="100"
        stroke="#c0392b" strokeWidth="1" {...lineProps(0)} />
      {/* Línea superior */}
      <motion.line x1="0" y1="40" x2="800" y2="40"
        stroke="rgba(192,57,43,0.3)" strokeWidth="0.5" {...lineProps(0.15)} />
      {/* Línea inferior */}
      <motion.line x1="0" y1="160" x2="800" y2="160"
        stroke="rgba(192,57,43,0.3)" strokeWidth="0.5" {...lineProps(0.3)} />
      {/* Nodos */}
      {[80, 200, 350, 500, 650, 750].map((x, i) => (
        <motion.circle key={x} cx={x} cy={100} r={4}
          fill="none" stroke="#e74c3c" strokeWidth="1.5"
          {...nodeProps(0.4 + i * 0.12)} />
      ))}
      {/* Línea vertical central */}
      <motion.line x1="400" y1="60" x2="400" y2="140"
        stroke="#c0392b" strokeWidth="1" {...lineProps(0.6)} />
      {/* Texto */}
      <motion.text
        x="400" y="185"
        textAnchor="middle"
        fill="rgba(240,237,232,0.3)"
        fontSize="10"
        fontFamily="'Space Mono', monospace"
        letterSpacing="4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        NOVATECH · SOLUTIONS · 2026
      </motion.text>
    </motion.svg>
  );
}
