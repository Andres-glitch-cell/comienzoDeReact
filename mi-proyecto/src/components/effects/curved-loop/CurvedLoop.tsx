import React, { useRef, useEffect, useState, useMemo, useId, FC } from 'react';
import './CurvedLoop.css';

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
  className?: string;
}

const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = '',
  speed = 1,
  className = '',
  curveAmount = 100,
  direction = 'left',
  interactive = true
}) => {
  const [spacing, setSpacing] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const uid = useId();
  
  const measureRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<'left' | 'right'>(direction);
  // El offset vive en una ref para el movimiento fluido
  const offsetRef = useRef(0);

  const text = useMemo(() => marqueeText.trim() + '\u00A0\u00A0', [marqueeText]);

  const totalText = useMemo(() => {
    if (!spacing) return text;
    const repeats = Math.ceil(4000 / spacing) + 4;
    return Array(repeats).fill(text).join('');
  }, [text, spacing]);

  const pathId = `curve-${uid}`;
  const pathD = `M-1000,80 Q720,${80 + curveAmount} 2440,80`;

  useEffect(() => {
    if (measureRef.current) {
      const length = measureRef.current.getComputedTextLength();
      if (length > 0) {
        setSpacing(length);
        const initialOffset = -length * 2;
        offsetRef.current = initialOffset;
        // Aplicamos el valor inicial manualmente una sola vez al cargar
        if (textPathRef.current) {
          textPathRef.current.setAttribute('startOffset', `${initialOffset}px`);
        }
      }
    }
  }, [text]);

  useEffect(() => {
    if (!spacing) return;

    let frame: number;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        offsetRef.current += delta;

        if (offsetRef.current <= -spacing * 3) offsetRef.current += spacing;
        else if (offsetRef.current >= -spacing) offsetRef.current -= spacing;

        textPathRef.current.setAttribute('startOffset', `${offsetRef.current}px`);
      }
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    dragRef.current = true;
    setIsDragging(true);
    lastXRef.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !dragRef.current || !textPathRef.current || !spacing) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;

    offsetRef.current += dx;

    if (offsetRef.current <= -spacing * 3) offsetRef.current += spacing;
    if (offsetRef.current >= -spacing) offsetRef.current -= spacing;

    textPathRef.current.setAttribute('startOffset', `${offsetRef.current}px`);
    dirRef.current = dx > 0 ? 'right' : 'left';
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = false;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      className="curved-loop-jacket"
      style={{ 
        opacity: spacing > 0 ? 1 : 0, 
        cursor: interactive ? (isDragging ? 'grabbing' : 'grab') : 'default',
        touchAction: 'none',
        userSelect: 'none'
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <svg className="curved-loop-svg" viewBox="0 0 1440 200">
        <defs>
          <path id={pathId} d={pathD} />
        </defs>
        
        <text ref={measureRef} style={{ fontSize: 'inherit', visibility: 'hidden', position: 'absolute' }}>
          {text}
        </text>

        {spacing > 0 && (
          <text className={className} style={{ fontSize: 'inherit', fill: 'currentColor', fontWeight: 'bold' }}>
            <textPath 
              ref={textPathRef} 
              xlinkHref={`#${pathId}`}
              /* ELIMINADO startOffset={offsetRef.current} para evitar el error */
            >
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export default CurvedLoop;