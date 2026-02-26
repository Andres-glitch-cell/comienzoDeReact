import React from 'react';
import './App.css';
import { motion, type Variants, type Transition, useScroll, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import DomeGallery from '@/components/effects/dome-gallery/DomeGallery';
import CurvedLoop from '@/components/effects/curved-loop/CurvedLoop';
import Aurora from '@/components/effects/aurora/Aurora';
import FlowingMenu from '@/components/effects/flowing-menu/FlowingMenu';
import Stack from '@/components/layout/stack/Stack';
import StatsSection from '@/components/layout/stats-section/StatsSection';
import ParticleCanvas from '@/components/effects/particle-canvas/ParticleCanvas';
import CustomCursor from '@/components/effects/custom-cursor/CustomCursor';
import AnimatedSVGLines from '@/components/effects/animated-svg-lines/AnimatedSVGLines';

// ─── BOOTSTRAP SVG ICONS ─────────────────────────────────────────
const IconGlobe = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
  </svg>
);

const IconPhone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
  </svg>
);

const IconBrush = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
    <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.1 6.1 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.1 8.1 0 0 1-3.078.132 4 4 0 0 1-.562-.135 1.4 1.4 0 0 1-.466-.247.7.7 0 0 1-.204-.288.62.62 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896q.19.012.348.048c.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04"/>
  </svg>
);

const IconCloud = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
  </svg>
);

const IconRobot = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
    <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.134"/>
    <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
  </svg>
);

const IconLightbulb = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
    <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1"/>
  </svg>
);

const serviceIcons: Record<string, React.ReactElement> = {
  '01': <IconGlobe />,
  '02': <IconPhone />,
  '03': <IconBrush />,
  '04': <IconCloud />,
  '05': <IconRobot />,
  '06': <IconLightbulb />,
};

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
  { 
    id: '01', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ), 
    title: 'Desarrollo Web', 
    desc: 'Sitios modernos, responsivos y optimizados para SEO desde cero.' 
  },
  { 
    id: '02', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ), 
    title: 'Apps Móviles', 
    desc: 'Nativas y multiplataforma para iOS y Android.' 
  },
  { 
    id: '03', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.5 1.5"/><path d="M7 11l5-5"/>
      </svg>
    ), 
    title: 'Diseño UI/UX', 
    desc: 'Interfaces intuitivas con experiencias de usuario excepcionales.' 
  },
  { 
    id: '04', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19l4.5-4.5L17.5 10"/><path d="M6.5 5L2 9.5 6.5 14"/><path d="M13 2l-2 20"/>
      </svg>
    ), 
    title: 'Cloud & DevOps', 
    desc: 'Infraestructura escalable y despliegue continuo en la nube.' 
  },
  { 
    id: '05', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8"/><rect x="8" y="8" width="8" height="8" rx="1" /><path d="M16 8V4h4"/><path d="M8 16v4H4"/><path d="M16 16v4h4"/>
      </svg>
    ), 
    title: 'Inteligencia Artificial', 
    desc: 'Soluciones de IA y ML para automatizar procesos clave.' 
  },
  { 
    id: '06', 
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/>
      </svg>
    ), 
    title: 'Consultoría Tech', 
    desc: 'Asesoramiento estratégico para tu transformación digital.' 
  },
];

// ─── ANIMATION VARIANTS ──────────────────────────────────────────
const cubicEase = [0.16, 1, 0.3, 1] as [number, number, number, number];
const smoothTransition: Transition = { duration: 0.7, ease: cubicEase };

const fadeUp: Variants    = { hidden: { opacity: 0, y: 60 },       show: { opacity: 1, y: 0,    transition: smoothTransition } };
const fadeLeft: Variants  = { hidden: { opacity: 0, x: -50 },      show: { opacity: 1, x: 0,    transition: smoothTransition } };
const fadeRight: Variants = { hidden: { opacity: 0, x: 50 },       show: { opacity: 1, x: 0,    transition: smoothTransition } };
const scaleIn: Variants   = { hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: cubicEase } } };
const staggerContainer: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
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
        <motion.span key={i} variants={letterVariant}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
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
    const animate = () => {
      frame++;
      if (frame > 20) return;
      el.textContent = text.split('').map((char, i) => {
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
      <motion.nav className="navbar"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
          transition={{ duration: 2.6, delay: 1.3 }}
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
              transition={{ duration: 4.7, ease: cubicEase, delay: 3.5 }}
            >
              SIN
            </motion.em>
          </div>
          <div>
            <motion.span
              className="outline"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 2.7, ease: cubicEase, delay: 2.7 }}
            >
                LÍMITES
                
            </motion.span>
          </div>
        </h1>

        <motion.p className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}>
          Transformamos ideas complejas en productos digitales de alta precisión.
          Tecnología de vanguardia al servicio de tu negocio.
        </motion.p>

        <motion.div className="hero__actions"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1 }}>
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
<motion.section 
  className="marquee-section" 
  variants={scaleIn} 
  {...inView}
  style={{ margin: '4rem 0' }} // Añade margen extra aquí si quieres más separación
>
  <div className="curved-loop-jacket">
    <CurvedLoop
      marqueeText="✦ NOVATECH · INNOVACIÓN · PRECISIÓN · TECNOLOGÍA · DISEÑO · "
      speed={0.5} 
      curveAmount={-80} // Un valor menor hace que la curva sea menos pronunciada y parezca más centrada
      direction="right" 
      interactive
      className="curved-loop-display"
    />
  </div>
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
              <div className="service-card__icon">{serviceIcons[s.id]}</div>
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
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
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
              <a href="mailto:afernandezs.iesjc@gmail.com" className="btn-primary">Contactar ahora</a>
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

