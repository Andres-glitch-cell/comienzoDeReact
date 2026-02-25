import './App.css';
import { motion, type Variants, type Transition, useScroll, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import DomeGallery from '@/components/effects/dome-gallery/DomeGallery';
import CurvedLoop from '@/components/effects/curved-loop/CurvedLoop';
import ElectricBorder from '@/components/effects/electric-border/ElectricBorder';
import FlowingMenu from '@/components/effects/flowing-menu/FlowingMenu';
import Stack from '@/components/layout/stack/Stack';
import StatsSection from '@/components/layout/stats-section/StatsSection';
import ParticleCanvas from '@/components/effects/particle-canvas/ParticleCanvas';
import CustomCursor from '@/components/effects/custom-cursor/CustomCursor';
import AnimatedSVGLines from '@/components/effects/animated-svg-lines/AnimatedSVGLines';

// ─── DATA ────────────────────────────────────────────────────────
const images: string[] = [
  "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
];

interface FlowingMenuItem { link: string; text: string; image: string; }
const menuItems = [
  { link: '#services', text: 'Servicios', image: 'https://picsum.photos/600/400?random=1' },
  { link: '#about',   text: 'Nosotros',  image: 'https://picsum.photos/600/400?random=2' },
  { link: '#contact', text: 'Contacto',  image: 'https://picsum.photos/600/400?random=3' },
  { link: '#gallery', text: 'Proyectos', image: 'https://picsum.photos/600/400?random=4' },
] as FlowingMenuItem[];

const services = [
  { id: '01', icon: '🌐', title: 'Desarrollo Web',          desc: 'Sitios modernos, responsivos y optimizados para SEO desde cero.' },
  { id: '02', icon: '📱', title: 'Apps Móviles',            desc: 'Nativas y multiplataforma para iOS y Android.' },
  { id: '03', icon: '🎨', title: 'Diseño UI/UX',            desc: 'Interfaces intuitivas con experiencias de usuario excepcionales.' },
  { id: '04', icon: '☁️', title: 'Cloud & DevOps',          desc: 'Infraestructura escalable y despliegue continuo en la nube.' },
  { id: '05', icon: '🤖', title: 'Inteligencia Artificial', desc: 'Soluciones de IA y ML para automatizar procesos clave.' },
  { id: '06', icon: '💡', title: 'Consultoría Tech',        desc: 'Asesoramiento estratégico para tu transformación digital.' },
];

// ─── ANIMATION VARIANTS ──────────────────────────────────────────
const cubicEase = [0.16, 1, 0.3, 1] as [number, number, number, number];
const smoothTransition: Transition = { duration: 0.7, ease: cubicEase };

const fadeUp: Variants    = { hidden: { opacity: 0, y: 60 },   show: { opacity: 1, y: 0,   transition: smoothTransition } };
const fadeLeft: Variants  = { hidden: { opacity: 0, x: -50 },  show: { opacity: 1, x: 0,   transition: smoothTransition } };
const fadeRight: Variants = { hidden: { opacity: 0, x: 50 },   show: { opacity: 1, x: 0,   transition: smoothTransition } };
const scaleIn: Variants   = { hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: cubicEase } } };

const staggerContainer: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

// Variante especial: aparece letra a letra como en anime.js
const letterVariant: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -90 },
  show:   { opacity: 1, y: 0,  rotateX: 0, transition: { duration: 0.5, ease: cubicEase } },
};
const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.2 } };

// ─── SPLIT TEXT ───────────────────────────────────────────────────
function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={className}
      style={{ display: 'inline-block', perspective: 800 }}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariant}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ─── GLITCH TEXT ─────────────────────────────────────────────────
function GlitchText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
    let frame = 0;
    let raf: number;
    const original = text;

    const animate = () => {
      frame++;
      if (frame > 20) return;
      el.textContent = original.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (i < frame * 0.8) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      raf = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { frame = 0; animate(); observer.disconnect(); }
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); };
  }, [text]);

  return <span ref={ref}>{text}</span>;
}

// ─── COMPONENT ───────────────────────────────────────────────────
export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="app">
      <CustomCursor />
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* ── NAVBAR ── */}
      <motion.nav
        className="navbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="navbar__logo">NOVA<span>TECH</span></div>
        <ul className="navbar__links">
          <li><a href="#services">Servicios</a></li>
          <li><a href="#gallery">Proyectos</a></li>
          <li><a href="#about">Nosotros</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
        <a href="#contact" className="navbar__cta">Hablemos →</a>
      </motion.nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero__bg" />
        <div className="hero__grid" />
        <ParticleCanvas />

        <motion.div
          className="hero__eyebrow"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="hero__eyebrow-line" />
          <span className="hero__eyebrow-text">Soluciones Tecnológicas · 2026</span>
        </motion.div>

        <h1 className="hero__title">
          <div><SplitText text="INNOVA" /></div>
          <div>
            <motion.em
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: cubicEase, delay: 0.5 }}
            >
              SIN
            </motion.em>
          </div>
          <div>
            <motion.span
              className="outline"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: cubicEase, delay: 0.7 }}
            >
              LÍMITES
            </motion.span>
          </div>
        </h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Transformamos ideas complejas en productos digitales de alta precisión.
          Tecnología de vanguardia al servicio de tu negocio.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <a href="#services" className="btn-primary">Ver servicios</a>
          <a href="#gallery"  className="btn-ghost">Nuestros proyectos →</a>
        </motion.div>

        <div className="hero__scroll">
          <div className="hero__scroll-line" />
          <span className="hero__scroll-text">Scroll</span>
        </div>
      </section>

      {/* ── SVG LINES DIVIDER ── */}
      <div style={{ padding: '0 48px', background: 'var(--bg-deep)' }}>
        <AnimatedSVGLines />
      </div>

      {/* ── FLOWING MENU ── */}
      <motion.section className="menu-section" variants={fadeUp} {...inView}>
        <FlowingMenu items={menuItems as never[]} marqueeBgColor="#c0392b" />
      </motion.section>

      {/* ── STATS ── */}
      <motion.div className="stats-wrapper" variants={fadeUp} {...inView}>
        <StatsSection />
      </motion.div>

      {/* ── MARQUEE ── */}
      <motion.section className="marquee-section" variants={scaleIn} {...inView}>
        <CurvedLoop
          marqueeText="✦ NOVATECH · INNOVACIÓN · PRECISIÓN · TECNOLOGÍA · DISEÑO · "
          speed={1.2} curveAmount={-120} direction="right" interactive
          className="curved-loop-display"
        />
      </motion.section>

      {/* ── SERVICES ── */}
      <section className="services-section" id="services">
        <div className="services-header">
          <motion.div variants={fadeLeft} {...inView}>
            <div className="section-label">
              <div className="section-label__line" />
              <span className="section-label__text">Qué hacemos</span>
            </div>
            <h2 className="section-title">
              <GlitchText text="NUESTROS" /><br />
              <GlitchText text="SERVICIOS" />
            </h2>
          </motion.div>
          <motion.p className="services-header__desc" variants={fadeRight} {...inView}>
            Soluciones end-to-end diseñadas para escalar tu negocio.
            Desde el concepto hasta el despliegue en producción.
          </motion.p>
        </div>

        <motion.div className="services-grid" variants={staggerContainer} {...inView}>
          {services.map((s) => (
            <motion.div key={s.id} className="service-card" variants={fadeUp}>
              <div className="service-card__number">{s.id}</div>
              <span className="service-card__icon">{s.icon}</span>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
              <div className="service-card__accent" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── SVG LINES DIVIDER 2 ── */}
      <div style={{ padding: '0 48px', background: 'var(--bg-card)' }}>
        <AnimatedSVGLines />
      </div>

      {/* ── GALLERY ── */}
      <section className="gallery-section" id="gallery">
        <motion.div className="gallery-header" variants={fadeUp} {...inView}>
          <div className="section-label">
            <div className="section-label__line" />
            <span className="section-label__text">Proyectos</span>
          </div>
          <h2 className="section-title">
            <SplitText text="VISTA" /><br />
            <SplitText text="PANORÁMICA" />
          </h2>
        </motion.div>
        <motion.div className="gallery-dome" variants={scaleIn} {...inView}>
          <DomeGallery segments={34} grayscale={false} />
        </motion.div>
      </section>

      {/* ── STACK + COPY ── */}
      <section className="stack-section" id="about">
        <motion.div className="stack-section__copy" variants={fadeLeft} {...inView}>
          <div className="section-label">
            <div className="section-label__line" />
            <span className="section-label__text">Quiénes somos</span>
          </div>
          <h2 className="section-title">
            <GlitchText text="EQUIPO" /><br />
            <GlitchText text="EXPERTO" />
          </h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            Más de 15 años construyendo productos digitales que marcan la diferencia.
            Un equipo multidisciplinar comprometido con la excelencia técnica.
          </motion.p>
          <a href="#contact" className="btn-primary">Trabaja con nosotros</a>
        </motion.div>

        <motion.div style={{ width: 340, height: 340 }} variants={fadeRight} {...inView}>
          <Stack
            randomRotation={true}
            cards={images.map((src, i) => (
              <img key={i} src={src} alt={`project-${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
            ))}
          />
        </motion.div>
      </section>

      {/* ── ELECTRIC CTA ── */}
      <motion.section className="electric-section" id="contact" variants={scaleIn} {...inView}>
        <div className="electric-inner">
          <ElectricBorder color="#c0392b" speed={0.6} chaos={0.2} borderRadius={0}>
            <motion.div className="electric-content" variants={fadeUp} {...inView}>
              <h3>¿Empezamos algo grande?</h3>
              <p>Cuéntanos tu proyecto y encontraremos la solución tecnológica<br />que tu negocio necesita.</p>
              <a href="mailto:hola@novatech.com" className="btn-primary">Contactar ahora</a>
            </motion.div>
          </ElectricBorder>
        </div>
      </motion.section>

      {/* ── FOOTER ── */}
      <motion.footer className="footer" variants={fadeUp} {...inView}>
        <div>
          <div className="footer__brand">NOVA<span>TECH</span></div>
          <p className="footer__copy">© 2026 NovaTech Solutions — Hecho con React + Vite</p>
        </div>
        <ul className="footer__links">
          <li><a href="#services">Servicios</a></li>
          <li><a href="#gallery">Proyectos</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
      </motion.footer>
    </div>
  );
}
