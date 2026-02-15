import { useEffect, useRef, useState } from 'react';

// Hook for scroll-triggered counter animation
export function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
    const [count, setCount] = useState(0);
    const countRef = useRef<number>(0);
    
    useEffect(() => {
        if (!start) return;
        
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Easing function for smooth counting
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            countRef.current = Math.floor(easeOutQuart * end);
            setCount(countRef.current);
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    }, [end, duration, start]);
    
    return count;
}

// Counter component with animation
interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    className?: string;
}

export function AnimatedCounter({ end, duration = 2000, suffix = '', className = '' }: AnimatedCounterProps) {
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef<HTMLDivElement>(null);
    const count = useCountUp(end, duration, isVisible);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );
        
        if (counterRef.current) {
            observer.observe(counterRef.current);
        }
        
        return () => observer.disconnect();
    }, []);
    
    return (
        <div ref={counterRef} className={className}>
            {count}{suffix}
        </div>
    );
}

// Hook for parallax effect
export function useParallax(speed: number = 0.5) {
    const [offset, setOffset] = useState(0);
    
    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.scrollY * speed);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);
    
    return offset;
}

// Hook for scroll visibility with custom animation type
export function useScrollAnimation(options: {
    threshold?: number;
    rootMargin?: string;
    animationType?: 'fade' | 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down' | 'scale' | 'rotate';
    delay?: number;
} = {}) {
    const {
        threshold = 0.15,
        rootMargin = '0px 0px -80px 0px',
        animationType = 'fade',
        delay = 0
    } = options;
    
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin }
        );
        
        if (ref.current) {
            observer.observe(ref.current);
        }
        
        return () => observer.disconnect();
    }, [threshold, rootMargin, delay]);
    
    const animationClass = `scroll-animate-${animationType}`;
    
    return { ref, isVisible, animationClass };
}

// Text reveal component - reveals text word by word
interface TextRevealProps {
    text: string;
    className?: string;
    animationType?: 'word' | 'letter' | 'line';
    delay?: number;
}

export function TextReveal({ text, className = '', animationType = 'word', delay = 0 }: TextRevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [delay]);
    
    if (animationType === 'word') {
        const words = text.split(' ');
        return (
            <div ref={ref} className={`text-reveal-word ${className}`}>
                {words.map((word, index) => (
                    <span
                        key={index}
                        className={`word ${isVisible ? 'visible' : ''}`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        {word}{' '}
                    </span>
                ))}
            </div>
        );
    }
    
    if (animationType === 'letter') {
        const letters = text.split('');
        return (
            <div ref={ref} className={`text-reveal-letter ${className}`}>
                {letters.map((letter, index) => (
                    <span
                        key={index}
                        className={`letter ${isVisible ? 'visible' : ''}`}
                        style={{ animationDelay: `${index * 0.02}s` }}
                    >
                        {letter}
                    </span>
                ))}
            </div>
        );
    }
    
    // Line animation
    const lines = text.split('\n');
    return (
        <div ref={ref} className={`text-reveal-line ${className}`}>
            {lines.map((line, index) => (
                <span
                    key={index}
                    className={`line ${isVisible ? 'visible' : ''}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    {line}
                </span>
            ))}
        </div>
    );
}

// Staggered grid animation wrapper
interface StaggeredGridProps {
    children: React.ReactNode;
    columns?: number;
    staggerDelay?: number;
    className?: string;
}

export function StaggeredGrid({ children, columns = 3, staggerDelay = 0.1, className = '' }: StaggeredGridProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    
    const childArray = Array.isArray(children) ? children : [children];
    
    return (
        <div ref={ref} className={`staggered-grid ${className}`} style={{ 
            '--columns': columns,
            '--stagger-delay': staggerDelay
        } as React.CSSProperties}>
            {childArray.map((child, index) => (
                <div 
                    key={index} 
                    className={`stagger-item ${isVisible ? 'visible' : ''}`}
                    style={{ animationDelay: `${index * staggerDelay}s` }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
}

// Hook for multiple parallax layers
export function useMultiParallax(speeds: number[]) {
    const [offsets, setOffsets] = useState(speeds.map(() => 0));
    
    useEffect(() => {
        const handleScroll = () => {
            const newOffsets = speeds.map(speed => window.scrollY * speed);
            setOffsets(newOffsets);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speeds]);
    
    return offsets;
}
