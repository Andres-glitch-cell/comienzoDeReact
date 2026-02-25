import { useEffect, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const dialogRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="absolute inset-0 bg-black/60" onClick={onClose} />
            <div ref={dialogRef} className="relative bg-white/5 border border-white/10 rounded-lg p-6 max-w-lg w-full mx-4">
                {title && <h3 id="modal-title" className="text-xl font-semibold text-white mb-2">{title}</h3>}
                <div className="text-white/90">{children}</div>
                <div className="mt-4 text-right">
                    <button className="px-4 py-2 rounded bg-cyan-500 text-black" onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}
