import AnimatedButton from "./AnimatedButton";
import { motion } from "framer-motion";

interface HeroProps {
    title?: string;
    subtitle?: string;
    ctaText?: string;
}

export default function Hero({
  title = 'Bienvenido a MiProyecto',
  subtitle = 'Creando experiencias digitales con animación y diseño moderno.',
  ctaText = 'Explorar Proyectos'
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      <div className="relative z-10 max-w-5xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-gradient mb-6 leading-tight"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <AnimatedButton variant="primary" className="text-lg px-10 py-6 neon-glow">
            {ctaText}
          </AnimatedButton>
          <AnimatedButton variant="outline" className="text-lg px-10 py-6 border-cyan-500/40 hover:border-cyan-400">
            Contáctame
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}