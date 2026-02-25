<<<<<<< HEAD
import { useRef, useEffect, useState, useMemo, useId, FC, PointerEvent } from 'react';
=======
import { useEffect, useRef, useState } from 'react';
>>>>>>> 2097040bc4325595185f7e53ccb238f2c5e73e45
import './CurvedLoop.css';

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
<<<<<<< HEAD
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
}

const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 400,
  direction = 'left',
  interactive = true
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const [isDragging, setIsDragging] = useState(false); // Estado para el cursor
  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<'left' | 'right'>(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  const totalText = textLength
    ? Array(Math.ceil(1800 / textLength) + 2)
        .fill(text)
        .join('')
    : text;
  const ready = spacing > 0;
  const initialOffset = spacing > 0 ? -spacing : 0; // Calcular offset inicial de forma derivada

  useEffect(() => {
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      textPathRef.current.setAttribute('startOffset', initialOffset + 'px');
    }
  }, [spacing, initialOffset]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;
        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    setIsDragging(true); // Actualizar estado
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;
    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;
    textPathRef.current.setAttribute('startOffset', newOffset + 'px');
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    setIsDragging(false); // Actualizar estado
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  const cursorStyle = interactive ? (isDragging ? 'grabbing' : 'grab') : 'auto';

  return (
    <div
      className="curved-loop-jacket"
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg className="curved-loop-svg" viewBox="0 0 1440 120">
        <text ref={measureRef} xmlSpace="preserve" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text fontWeight="bold" xmlSpace="preserve" className={className}>
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={initialOffset + 'px'} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;
=======
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
>>>>>>> 2097040bc4325595185f7e53ccb238f2c5e73e45
