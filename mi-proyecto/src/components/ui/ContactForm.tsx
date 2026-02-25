import { useState } from 'react';

export default function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle');
    const [error, setError] = useState<string | null>(null);

    const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name.trim() || !validateEmail(email) || !message.trim()) {
            setError('Por favor completa todos los campos correctamente.');
            return;
        }

        setStatus('sending');
        try {
            // Demo: simulate network request
            await new Promise(resolve => setTimeout(resolve, 700));
            console.log({ name, email, message });
            setStatus('sent');
            setName(''); setEmail(''); setMessage('');
        } catch {
            setStatus('error');
            setError('Error enviando el mensaje. Intenta más tarde.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white/3 p-6 rounded-lg">
            {error && <div className="text-sm text-red-400 mb-3">{error}</div>}

            <div className="mb-4">
                <label className="block text-white/90 mb-1">Nombre</label>
                <input className="w-full p-3 rounded bg-white/5 text-white" value={name} onChange={e => setName(e.target.value)} required aria-label="Nombre" />
            </div>

            <div className="mb-4">
                <label className="block text-white/90 mb-1">Email</label>
                <input type="email" className="w-full p-3 rounded bg-white/5 text-white" value={email} onChange={e => setEmail(e.target.value)} required aria-label="Email" />
            </div>

            <div className="mb-4">
                <label className="block text-white/90 mb-1">Mensaje</label>
                <textarea className="w-full p-3 rounded bg-white/5 text-white" rows={5} value={message} onChange={e => setMessage(e.target.value)} required aria-label="Mensaje" />
            </div>

            <div className="text-right">
                <button type="submit" className="px-6 py-3 rounded bg-cyan-500 text-black" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Enviando...' : status === 'sent' ? 'Enviado' : 'Enviar'}
                </button>
            </div>
        </form>
    );
}
