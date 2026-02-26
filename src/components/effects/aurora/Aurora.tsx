import { useEffect, useRef } from 'react';

interface AuroraProps {
  colorStops?: string[];
  speed?: number;
  amplitude?: number;
}

export default function Aurora({
  colorStops = ['#7a1f16', '#c0392b', '#1a0a0a', '#2d0a0a'],
  speed = 0.8,
  amplitude = 0.4,
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const layers = [
      { freq: 0.6, amp: amplitude,       phase: 0,    color: colorStops[0] },
      { freq: 0.4, amp: amplitude * 0.7, phase: 2.1,  color: colorStops[1] },
      { freq: 0.8, amp: amplitude * 0.5, phase: 4.2,  color: colorStops[2] },
      { freq: 0.3, amp: amplitude * 0.9, phase: 1.05, color: colorStops[3] },
    ];

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      // Dark base
      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, w, h);

      tRef.current += speed * 0.005;
      const t = tRef.current;

      layers.forEach((layer) => {
        ctx.beginPath();
        ctx.moveTo(0, h);

        const points = 80;
        for (let i = 0; i <= points; i++) {
          const x = (i / points) * w;
          const y =
            h * 0.5 +
            Math.sin(i * layer.freq * 0.15 + t + layer.phase) * h * layer.amp +
            Math.sin(i * layer.freq * 0.3 + t * 1.3 + layer.phase) * h * layer.amp * 0.4;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        // Parse hex to rgba for gradient
        const r = parseInt(layer.color.slice(1, 3), 16);
        const g = parseInt(layer.color.slice(3, 5), 16);
        const b = parseInt(layer.color.slice(5, 7), 16);

        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, `rgba(${r},${g},${b},0.7)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0.05)`);

        ctx.fillStyle = grad;
        ctx.globalCompositeOperation = 'screen';
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';

      // Subtle noise overlay
      ctx.fillStyle = 'rgba(8,8,8,0.3)';
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [colorStops, speed, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
