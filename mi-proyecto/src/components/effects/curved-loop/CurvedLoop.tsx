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
  curveAmount = -120,
  direction = 'left',
  interactive = false,
  className = '',
}: CurvedLoopProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [pathId] = useState(() => `curve-${Math.random().toString(36).slice(2)}`);

  // Repeat text enough to fill the loop
  const repeated = marqueeText.repeat(6);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const textEl = svg.querySelector('textPath') as SVGTextPathElement | null;
    if (!textEl) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = svg.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    svg.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      const dir = direction === 'right' ? 1 : -1;
      let currentSpeed = speed;

      if (interactive) {
        currentSpeed = speed + mouseRef.current.x * 2;
      }

      offsetRef.current += dir * currentSpeed * 0.03;
      if (offsetRef.current > 100) offsetRef.current = 0;
      if (offsetRef.current < 0) offsetRef.current = 100;

      textEl.setAttribute('startOffset', `${offsetRef.current}%`);
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      svg.removeEventListener('mousemove', onMouseMove);
    };
  }, [speed, direction, interactive]);

  const w = 800;
  const h = 200;
  const mid = h / 2;
  const curve = curveAmount;

  const d = `M 0 ${mid} Q ${w / 2} ${mid + curve} ${w} ${mid}`;

  return (
    <div className={`curved-loop ${className}`}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        style={{ width: '100%', height: '160px' }}
      >
        <defs>
          <path id={pathId} d={d} />
        </defs>
        <text>
          <textPath href={`#${pathId}`} startOffset="0%">
            {repeated}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
