// Services.tsx — sin hoveredId (eliminado el estado no usado)
import { motion } from 'framer-motion';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export default function Services() {
  const services: Service[] = [
    { id: '01', icon: '🌐', title: 'Desarrollo Web',          description: 'Sitios modernos, responsivos y optimizados para SEO desde cero.' },
    { id: '02', icon: '📱', title: 'Apps Móviles',            description: 'Nativas y multiplataforma para iOS y Android.' },
    { id: '03', icon: '🎨', title: 'Diseño UI/UX',            description: 'Interfaces intuitivas con experiencias de usuario excepcionales.' },
    { id: '04', icon: '☁️', title: 'Cloud & DevOps',          description: 'Infraestructura escalable y despliegue continuo en la nube.' },
    { id: '05', icon: '🤖', title: 'Inteligencia Artificial', description: 'Soluciones de IA y ML para automatizar procesos clave.' },
    { id: '06', icon: '💡', title: 'Consultoría Tech',        description: 'Asesoramiento estratégico para tu transformación digital.' },
  ];

  return (
    <section id="services" className="services-section">
      <div className="services-header">
        <div>
          <div className="section-label">
            <div className="section-label__line" />
            <span className="section-label__text">Qué hacemos</span>
          </div>
          <h2 className="section-title">NUESTROS<br />SERVICIOS</h2>
        </div>
        <p className="services-header__desc">
          Soluciones end-to-end diseñadas para escalar tu negocio.
          Desde el concepto hasta el despliegue en producción.
        </p>
      </div>

      <div className="services-grid">
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            className="service-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
          >
            <div className="service-card__number">{s.id}</div>
            <span className="service-card__icon">{s.icon}</span>
            <h3 className="service-card__title">{s.title}</h3>
            <p className="service-card__desc">{s.description}</p>
            <div className="service-card__accent" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}