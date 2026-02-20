import { motion } from 'framer-motion';
import { AnimatedNumber } from '@/components/ui/animated-number';

interface Stat {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export default function StatsSection() {
  const stats: Stat[] = [
    { value: 500, label: 'Proyectos Completados', suffix: '+' },
    { value: 98,  label: 'Satisfacción del Cliente', suffix: '%' },
    { value: 15,  label: 'Años de Experiencia', suffix: '+' },
    { value: 50,  label: 'Profesionales Expertos', suffix: '+' },
  ];

  return (
    <section style={{ padding: '80px 20px', backgroundColor: 'transparent' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
        }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ textAlign: 'center', padding: '20px' }}
          >
            <div className="stat-number">
              {stat.prefix}
              <AnimatedNumber value={stat.value} mass={0.8} stiffness={75} damping={15} />
              {stat.suffix}
            </div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
