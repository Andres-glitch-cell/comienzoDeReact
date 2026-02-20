import { useEffect, useRef, useState } from 'react';
import './CurvedLoop.css';

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
  className?: string;
}

export default function CurvedLoop({
  marqueeText = '✦ NovaTech Solutions · ',
  speed = 2,
  curveAmount = -80,
  direction = 'left',
  interactive = false,
  className = '',
}: CurvedLoopProps) {
  const textRef = useRef<SVGTextPathElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const [pathId] = useState(() => `curve-${Math.random().toString(36).slice(2)}`);

  const repeated = (marqueeText + ' ').repeat(8);

  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    const animate = () => {
      const dir = direction === 'right' ? 1 : -1;
      offsetRef.current += dir * speed * 0.02;
      if (offsetRef.current > 100) offsetRef.current -= 100;
      if (offsetRef.current < 0) offsetRef.current += 100;
      textEl.setAttribute('startOffset', `${offsetRef.current}%`);
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, direction, interactive]);

  const w = 1200;
  const h = 160;
  const mid = h / 2;
  const d = `M 0 ${mid} Q ${w / 2} ${mid + curveAmount} ${w} ${mid}`;

  return (
    <div className={`curved-loop ${className}`}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '120px', display: 'block' }}
      >
        <defs>
          <path id={pathId} d={d} />
        </defs>
        <text>
          <textPath ref={textRef} href={`#${pathId}`} startOffset="0%">
            {repeated}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
