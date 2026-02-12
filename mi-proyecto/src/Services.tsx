import { motion } from 'framer-motion';
import { useState } from 'react';

// Definimos la interfaz para cada servicio
interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export default function Services() {
  // Estado para controlar qué tarjeta está siendo hover
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Datos de los servicios
  const services: Service[] = [
    {
      id: 1,
      title: 'Desarrollo Web',
      description: 'Creamos sitios web modernos, responsivos y optimizados para SEO.',
      icon: '🌐',
      color: '#3b82f6', // Azul
    },
    {
      id: 2,
      title: 'Aplicaciones Móviles',
      description: 'Apps nativas y multiplataforma para iOS y Android.',
      icon: '📱',
      color: '#10b981', // Verde
    },
    {
      id: 3,
      title: 'Diseño UI/UX',
      description: 'Interfaces intuitivas y experiencias de usuario excepcionales.',
      icon: '🎨',
      color: '#f59e0b', // Naranja
    },
    {
      id: 4,
      title: 'Cloud & DevOps',
      description: 'Infraestructura escalable y despliegue continuo en la nube.',
      icon: '☁️',
      color: '#8b5cf6', // Púrpura
    },
    {
      id: 5,
      title: 'Inteligencia Artificial',
      description: 'Soluciones de IA y Machine Learning para automatizar procesos.',
      icon: '🤖',
      color: '#ec4899', // Rosa
    },
    {
      id: 6,
      title: 'Consultoría Tech',
      description: 'Asesoramiento estratégico para transformación digital.',
      icon: '💡',
      color: '#06b6d4', // Cyan
    },
  ];

  return (
    <section
      id="services"
      style={{
        padding: '80px 20px',
        backgroundColor: '#0a0a0a',
        minHeight: '100vh',
      }}
    >
      {/* Título de la sección */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '60px' }}
      >
        <h2
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #fff, #888)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px',
          }}
        >
          Nuestros Servicios
        </h2>
        <p style={{ color: '#888', fontSize: '1.1rem' }}>
          Soluciones tecnológicas de vanguardia para impulsar tu negocio
        </p>
      </motion.div>

      {/* Grid de servicios */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
            onHoverStart={() => setHoveredId(service.id)}
            onHoverEnd={() => setHoveredId(null)}
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '16px',
              padding: '30px',
              border: `2px solid ${hoveredId === service.id ? service.color : '#333'}`,
              transition: 'border-color 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Efecto de brillo en hover */}
            {hoveredId === service.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `radial-gradient(circle at center, ${service.color}, transparent)`,
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* Contenido de la tarjeta */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  fontSize: '3rem',
                  marginBottom: '15px',
                }}
              >
                {service.icon}
              </div>
              <h3
                style={{
                  fontSize: '1.5rem',
                  marginBottom: '10px',
                  color: hoveredId === service.id ? service.color : '#fff',
                  transition: 'color 0.3s ease',
                }}
              >
                {service.title}
              </h3>
              <p style={{ color: '#aaa', lineHeight: '1.6' }}>
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

