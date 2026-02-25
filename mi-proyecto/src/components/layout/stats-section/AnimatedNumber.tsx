import { useSpring, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  mass?: number;
  stiffness?: number;
  damping?: number;
}

export function AnimatedNumber({ value, mass = 0.8, stiffness = 75, damping = 15 }: AnimatedNumberProps) {
  const spring = useSpring(0, { mass, stiffness, damping });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    return spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = Math.round(v).toString();
    });
  }, [spring]);

  return <motion.span ref={ref}>0</motion.span>;
}
