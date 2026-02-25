import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

    useEffect(() => {
        if (dark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [dark]);

    return (
        <button
            aria-pressed={dark}
            onClick={() => setDark(d => !d)}
            className="p-2 rounded bg-white/5 text-white hover:bg-white/10"
            title="Alternar tema"
        >
            {dark ? <Moon size={18} /> : <Sun size={18} />}
        </button>
    );
}
