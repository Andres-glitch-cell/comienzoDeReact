import { useEffect, useRef } from 'react';

interface ShapeBackgroundProps {
    shapeCount?: number;
    moveSpeed?: number;
    color?: string;
}

class Shape {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    angle: number;
    angleSpeed: number;
    canvasWidth: number;
    canvasHeight: number;

    constructor(canvasWidth: number, canvasHeight: number, moveSpeed: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * moveSpeed;
        this.vy = (Math.random() - 0.5) * moveSpeed;
        this.size = Math.random() * 40 + 20;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.01;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.angleSpeed;

        if (this.x < -this.size || this.x > this.canvasWidth + this.size) {
            this.x = this.vx > 0 ? -this.size : this.canvasWidth + this.size;
        }
        if (this.y < -this.size || this.y > this.canvasHeight + this.size) {
            this.y = this.vy > 0 ? -this.size : this.canvasHeight + this.size;
        }
    }

    draw(ctx: CanvasRenderingContext2D, color: string) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.moveTo(this.size, 0);
        ctx.lineTo(this.size * Math.cos(2 * Math.PI / 3), this.size * Math.sin(2 * Math.PI / 3));
        ctx.lineTo(this.size * Math.cos(4 * Math.PI / 3), this.size * Math.sin(4 * Math.PI / 3));
        ctx.closePath();
        
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.restore();
    }
}

export default function ShapeBackground({
    shapeCount = 20,
    moveSpeed = 0.2,
    color = '#00d4ff'
}: ShapeBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shapesRef = useRef<Shape[]>([]);
    const animationFrameId = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const initShapes = () => {
            shapesRef.current = [];
            for (let i = 0; i < shapeCount; i++) {
                shapesRef.current.push(new Shape(canvas.width, canvas.height, moveSpeed));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            shapesRef.current.forEach(shape => {
                shape.update();
                shape.draw(ctx, color);
            });
            animationFrameId.current = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initShapes();
        };

        handleResize(); // Initial setup
        animate();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, [shapeCount, moveSpeed, color]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
            style={{ background: 'transparent' }}
        />
    );
}
