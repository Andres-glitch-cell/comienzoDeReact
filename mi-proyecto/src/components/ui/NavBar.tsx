import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function NavBar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 backdrop-blur-lg">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="text-2xl font-bold text-gradient">MiProyecto</div>
      <span className="hidden md:inline text-sm text-white/60">Diseño · Desarrollo · Animación</span>
    </div>

    <nav className="hidden md:flex gap-8 items-center text-white/90">
      <a href="#inicio" className="hover:text-cyan-400 transition-colors">Inicio</a>
      <a href="#servicios" className="hover:text-cyan-400 transition-colors">Servicios</a>
      <a href="#galeria" className="hover:text-cyan-400 transition-colors">Galería</a>
      <a href="#contacto" className="hover:text-cyan-400 transition-colors">Contacto</a>
    </nav>

    <div className="flex items-center gap-4">
      <div className="hidden md:block"><ThemeToggle /></div>
      <button
        className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition"
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
      >
        {/* tu svg del menú hamburguesa */}
      </button>
    </div>
  </div>

  {/* Menú móvil – también glass */}
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="md:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden"
      >
        <nav className="flex flex-col p-6 text-white/90">
          <a href="#inicio" className="py-3 hover:text-cyan-400" onClick={() => setOpen(false)}>Inicio</a>
          <a href="#servicios" className="py-3 hover:text-cyan-400" onClick={() => setOpen(false)}>Servicios</a>
          <a href="#galeria" className="py-3 hover:text-cyan-400" onClick={() => setOpen(false)}>Galería</a>
          <a href="#contacto" className="py-3 hover:text-cyan-400" onClick={() => setOpen(false)}>Contacto</a>
          <div className="mt-4"><ThemeToggle /></div>
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
</header>
    );
}
