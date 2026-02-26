import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useSpring(cursorX, { stiffness: 80, damping: 20 });
  const trailY = useSpring(cursorY, { stiffness: 80, damping: 20 });
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const down = () => setClicked(true);
    const up   = () => setClicked(false);
    const checkHover = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setHovered(!!(el?.closest('a, button, .service-card, .btn-primary, .btn-ghost')));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousemove', checkHover);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousemove', checkHover);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Punto — sigue exacto al cursor */}
      <motion.div
        style={{
          position: 'fixed',
          left: cursorX,
          top: cursorY,
          width: clicked ? 6 : 8,
          height: clicked ? 6 : 8,
          borderRadius: '50%',
          background: '#e74c3c',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
        }}
      />
      {/* Anillo — sigue con retraso (spring) */}
      <motion.div
        style={{
          position: 'fixed',
          left: trailX,
          top: trailY,
          width: hovered ? 44 : clicked ? 20 : 32,
          height: hovered ? 44 : clicked ? 20 : 32,
          borderRadius: '50%',
          border: `1.5px solid ${hovered ? '#e74c3c' : 'rgba(192,57,43,0.5)'}`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
          backdropFilter: hovered ? 'blur(2px)' : 'none',
        }}
      />
    </>
  );
}
