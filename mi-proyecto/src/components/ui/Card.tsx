import { ReactNode } from 'react';

interface CardProps {
    title?: string;
    subtitle?: string;
    children?: ReactNode;
    className?: string;
    image?: string;
    footer?: ReactNode;
}

export default function Card({ title, subtitle, children, className = '', image, footer }: CardProps) {
    return (
        <div className={`bg-white/3 border border-white/6 rounded-lg p-6 ${className}`}>
            {image && <div className="mb-4 rounded overflow-hidden"><img src={image} alt={title || 'card image'} className="w-full h-48 object-cover" /></div>}
            {title && <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>}
            {subtitle && <p className="text-sm text-white/70 mb-4">{subtitle}</p>}
            <div className="text-white/90 mb-4">{children}</div>
            {footer && <div className="pt-3 border-t border-white/6">{footer}</div>}
        </div>
    );
}
