import { motion, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    href?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    motionProps?: MotionProps;
}

export default function AnimatedButton({
    children,
    variant = 'primary',
    href,
    onClick,
    type = 'button',
    className = '',
    icon,
    iconPosition = 'left',
    motionProps: customMotionProps
}: AnimatedButtonProps) {
    const baseClasses = 'relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-full transition-all duration-200 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 group';
    
   const variantClasses = {
  primary: 'glass-hover neon-glow bg-gradient-to-r from-cyan-600/70 to-blue-700/50 text-white hover:from-cyan-500 hover:to-blue-600',
  secondary: 'glass-hover bg-transparent border border-cyan-500/50 text-white hover:bg-cyan-500/20',
  outline: 'glass-hover bg-transparent border border-white/30 text-white hover:border-cyan-400 hover:bg-white/5'
};

<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 rounded-full" />

    const buttonContent = (
        <>
            {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
            <span className="relative z-10">{children}</span>
            {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" aria-hidden="true" />
        </>
    );

    const defaultMotionProps = {
        whileHover: { scale: 1.05, y: -3 },
        whileTap: { scale: 0.98 },
        transition: { duration: 0.2 }
    };

    const motionProps = { ...defaultMotionProps, ...customMotionProps };

    const style = {
        '--shadow-color': 'rgba(0, 212, 255, 0.5)'
    } as React.CSSProperties;

    if (href) {
        return (
            <motion.a
                href={href}
                className={`${baseClasses} ${variantClasses[variant]} ${className}`}
                {...motionProps}
                style={style}
                role="link"
            >
                {buttonContent}
            </motion.a>
        );
    }

    return (
        <motion.button
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            {...motionProps}
            style={style}
        >
            {buttonContent}
        </motion.button>
    );
}
