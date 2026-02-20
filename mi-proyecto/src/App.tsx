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
  { id: '01', title: 'Desarrollo Web',          desc: 'Sitios modernos, responsivos y optimizados para SEO desde cero.' },
  { id: '02', title: 'Apps Móviles',            desc: 'Nativas y multiplataforma para iOS y Android.' },
  { id: '03', title: 'Diseño UI/UX',            desc: 'Interfaces intuitivas con experiencias de usuario excepcionales.' },
  { id: '04', title: 'Cloud & DevOps',          desc: 'Infraestructura escalable y despliegue continuo en la nube.' },
  { id: '05', title: 'Inteligencia Artificial', desc: 'Soluciones de IA y ML para automatizar procesos clave.' },
  { id: '06', title: 'Consultoría Tech',        desc: 'Asesoramiento estratégico para tu transformación digital.' },
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

        <motion.div className="hero__eyebrow"
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <div className="hero__eyebrow-line" />
          <span className="hero__eyebrow-text">Soluciones Tecnológicas · 2026</span>
        </motion.div>

        <h1 className="hero__title">
          <div><SplitText text="INNOVA" /></div>
          <div>
            <motion.em initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: cubicEase, delay: 0.5 }}>SIN</motion.em>
          </div>
          <div>
            <motion.span className="outline" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: cubicEase, delay: 0.7 }}>LÍMITES</motion.span>
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

      {/* ── AURORA CTA ── */}
      <motion.section className="aurora-section" id="contact" variants={scaleIn} {...inView}>
        <Aurora />
        <motion.div className="aurora-content" variants={fadeUp} {...inView}>

          {/* Número grande decorativo */}
          <motion.span
            className="aurora-deco-number"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            01
          </motion.span>

          <div className="section-label" style={{ justifyContent: 'center' }}>
            <div className="section-label__line" />
            <span className="section-label__text">Siguiente paso</span>
            <div className="section-label__line" />
          </div>

          <h3>¿Empezamos<br />algo grande?</h3>

          <p>
            Cuéntanos tu proyecto y construiremos juntos<br />
            la solución que tu negocio necesita.
          </p>

          {/* Cards de contacto */}
          <div className="aurora-cards">
            <a href="mailto:hola@novatech.com" className="aurora-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
              </svg>
              <span>hola@novatech.com</span>
            </a>
            <a href="tel:+34600000000" className="aurora-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z"/>
              </svg>
              <span>+34 600 000 000</span>
            </a>
            <a href="#" className="aurora-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>

          <a href="mailto:hola@novatech.com" className="btn-primary" style={{ marginTop: '16px' }}>
            Enviar proyecto →
          </a>

        </motion.div>
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
