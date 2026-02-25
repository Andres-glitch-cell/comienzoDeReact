import { useState, useEffect } from 'react';
import { TextReveal, AnimatedCounter } from '../ScrollAnimations';

export default function AltLanding() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="alt-landing">
      <header className="alt-hero" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <TextReveal text="NovaTech" className="alt-title" animationType="letter" delay={0} />
        <TextReveal text="Soluciones digitales ágiles" className="alt-subtitle" animationType="word" delay={400} />
        <div className="alt-cta">
          <a href="#features" className="btn-primary">Ver características</a>
        </div>
      </header>

      <section id="features" className="alt-features">
        <div className="feature-card">
          <h3>Rápido</h3>
          <p>Cargas optimizadas y animaciones suaves.</p>
        </div>
        <div className="feature-card">
          <h3>Modular</h3>
          <p>Componentes reutilizables y claros.</p>
        </div>
        <div className="feature-card">
          <h3>Accesible</h3>
          <p>Buenas prácticas de accesibilidad.</p>
        </div>
      </section>

      <section className="alt-stats">
        <div className="stat">
          <AnimatedCounter end={50} suffix="+" className="stat-number" duration={1500} />
          <div className="stat-label">Clientes</div>
        </div>
        <div className="stat">
          <AnimatedCounter end={120} suffix="+" className="stat-number" duration={1500} />
          <div className="stat-label">Proyectos</div>
        </div>
        <div className="stat">
          <AnimatedCounter end={7} suffix=" años" className="stat-number" duration={1500} />
          <div className="stat-label">Experiencia</div>
        </div>
      </section>

      <footer className="alt-footer">
        <p>© 2026 NovaTech</p>
      </footer>
    </div>
  );
}
