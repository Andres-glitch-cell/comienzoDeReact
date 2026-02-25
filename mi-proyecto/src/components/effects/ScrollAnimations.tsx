import { useEffect, useRef, useMemo } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useCountUp } from './hooks/useCountUp';

// Hook for scroll-triggered counter animation

// Counter component with animation
interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    className?: string;
}

export function AnimatedCounter({ end, duration = 2000, suffix = '', className = '' }: AnimatedCounterProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const count = useCountUp(end, duration, isInView);
    
    return (
        <div ref={ref} className={className}>
            {count}{suffix}
        </div>
    );
}


// Text reveal component - reveals text word by word
interface TextRevealProps {
    text: string;
    className?: string;
    animationType?: 'word' | 'letter' | 'line';
    delay?: number;
}

export function TextReveal({ text, className = '', animationType = 'word', delay = 0 }: TextRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: animationType === 'letter' ? 0.02 : 0.05,
                delayChildren: delay,
            }
        }
    };

    const childVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            }
        }
    };
    
    const items = useMemo(() => {
        if (animationType === 'letter') return text.split('');
        if (animationType === 'line') return text.split('\n');
        return text.split(' ');
    }, [text, animationType]);

    const itemClassName = animationType === 'line' ? 'line' : 'word';

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
        >
            {items.map((item, index) => (
                <motion.span
                    key={index}
                    className={itemClassName}
                    variants={childVariants}
                    style={{ display: 'inline-block', paddingRight: animationType === 'word' ? '0.25em' : '0' }}
                >
                    {item}
                </motion.span>
            ))}
        </motion.div>
    );
}

// Staggered grid animation wrapper
interface StaggeredGridProps {
    children: ReactNode;
    columns?: number;
    staggerDelay?: number;
    className?: string;
}

export function StaggeredGrid({ children, columns = 3, staggerDelay = 0.1, className = '' }: StaggeredGridProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    
    const childArray = Array.isArray(children) ? children : [children];
    
    return (
        <motion.div
            ref={ref}
            className={`staggered-grid ${className}`}
            style={{ '--columns': columns } as CSSProperties}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
            {childArray.map((child, index) => (
                <motion.div 
                    key={index} 
                    className="stagger-item"
                    variants={itemVariants}
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
}

