import { useEffect, useRef, useState } from "react";
import './App.css';
import DomeGallery from "./DomeGallery";
import ElectricBorder from './ElectricBorder';
import Stack from "./Stack";
import FlowingMenu from './components/FlowingMenu';

export default function App() {
    const [scrollY, setScrollY] = useState(0);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                rafRef.current = window.requestAnimationFrame(() => {
                    setScrollY(window.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) {
                window.cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    // Intersection Observer para animaciones optimizadas
    useEffect(() => {
        // Solo ejecutar si el usuario no prefiere movimiento reducido
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Si prefiere movimiento reducido, mostrar todo inmediatamente
            const elements = document.querySelectorAll('.scroll-reveal');
            elements.forEach((el) => el.classList.add('animate-in'));
            return;
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Agregar un pequeño delay escalonado para efecto más suave
                        setTimeout(() => {
                            entry.target.classList.add('animate-in');
                            // Dejar de observar después de animar (optimización)
                            observerRef.current?.unobserve(entry.target);
                        }, index * 50); // 50ms de delay entre cada elemento
                    }
                });
            },
            {
                threshold: 0.15, // Activar cuando el 15% del elemento es visible
                rootMargin: '0px 0px -80px 0px' // Activar un poco antes de que entre en viewport
            }
        );

        // Observar todos los elementos con clase 'scroll-reveal'
        const elements = document.querySelectorAll('.scroll-reveal');
        elements.forEach((el) => observerRef.current?.observe(el));

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    // Imágenes para el Stack
    const portfolioImages = [
        "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
        "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
    ];

    // Configuración del menú
    const menuItems: Array<{ link: string; text: string; image: string }> = [
        { link: '#inicio', text: 'Inicio', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format' },
        { link: '#servicios', text: 'Servicios', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format' },
        { link: '#galeria', text: 'Galería', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format' },
        { link: '#contacto', text: 'Contacto', image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=600&auto=format' }
    ];

    return (
        <div className="app-container">
            {/* HERO SECTION */}
            <section id="inicio" className="hero-section">
                <div
                    className="hero-background"
                    style={{
                        transform: `translateY(${scrollY * 0.5}px)`,
                        opacity: 1 - scrollY / 600
                    }}
                />
                <div className="hero-content">
                    <h1 className="hero-title">NovaTech Solutions</h1>
                    <p className="hero-subtitle">
                        Transformando ideas en experiencias digitales extraordinarias
                    </p>
                    <div className="hero-cta">
                        <a href="#servicios" className="btn-primary">Explorar Servicios</a>
                        <a href="#contacto" className="btn-secondary">Contactar</a>
                    </div>
                </div>
                <div className="scroll-indicator">
                    <span>Scroll</span>
                    <div className="scroll-arrow"></div>
                </div>
            </section>

            {/* NAVIGATION MENU */}
            <nav className="flowing-menu-section">
                <FlowingMenu
                    items={menuItems}
                    marqueeBgColor="#00d4ff"
                    marqueeTextColor="#0a0a0a"
                    textColor="#ffffff"
                    bgColor="#0a0a0a"
                    borderColor="#333"
                    speed={20}
                />
            </nav>

            {/* ABOUT SECTION */}
            <section id="nosotros" className="about-section">
                <div className="container">
                    <h2 className="section-title scroll-reveal">Quiénes Somos</h2>
                    <p className="section-description scroll-reveal">
                        Somos una empresa joven enfocada en crear soluciones eficientes, escalables y fáciles de mantener
                    </p>

                    <div className="about-content scroll-reveal">
                        <div className="about-text">
                            <p>
                                En <strong>NovaTech Solutions</strong> ofrecemos servicios de desarrollo web, consultoría tecnológica
                                y mantenimiento de infraestructuras digitales. Nuestro equipo combina experiencia técnica con
                                creatividad para entregar proyectos que superan las expectativas.
                            </p>
                            <p>
                                Trabajamos con las tecnologías más modernas del mercado, desde React y Next.js hasta Three.js
                                y WebGL, para crear experiencias web únicas que destacan en el mercado digital.
                            </p>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-item scroll-reveal" style={{ transitionDelay: '0.1s' }}>
                                <div className="stat-number">50+</div>
                                <div className="stat-label">Proyectos Completados</div>
                            </div>
                            <div className="stat-item scroll-reveal" style={{ transitionDelay: '0.2s' }}>
                                <div className="stat-number">30+</div>
                                <div className="stat-label">Clientes Satisfechos</div>
                            </div>
                            <div className="stat-item scroll-reveal" style={{ transitionDelay: '0.3s' }}>
                                <div className="stat-number">5+</div>
                                <div className="stat-label">Años de Experiencia</div>
                            </div>
                            <div className="stat-item scroll-reveal" style={{ transitionDelay: '0.4s' }}>
                                <div className="stat-number">99%</div>
                                <div className="stat-label">Satisfacción del Cliente</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES SECTION */}
            <section id="servicios" className="services-section">
                <div className="container">
                    <h2 className="section-title scroll-animate-zoom-in scroll-reveal">Nuestros Servicios</h2>
                    <p className="section-description scroll-animate-slide-up scroll-reveal">
                        Soluciones tecnológicas de vanguardia para impulsar tu negocio
                    </p>

                    <div className="services-grid">
                        <div className="scroll-animate-scale scroll-reveal" style={{ transitionDelay: '0.1s' }}>
                            <ElectricBorder color="#00d4ff" speed={0.8} chaos={0.2} borderRadius={20}>
                                <div className="service-card">
                                    <div className="service-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484q-.121.12-.242.234c-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
                                        </svg>
                                    </div>
                                    <h3>Desarrollo Web</h3>
                                    <p>Aplicaciones web modernas con React, Next.js y las últimas tecnologías</p>
                                </div>
                            </ElectricBorder>
                        </div>

                        <div className="scroll-animate-bounce scroll-reveal" style={{ transitionDelay: '0.2s' }}>
                            <ElectricBorder color="#a51d2d" speed={0.7} chaos={0.25} borderRadius={20}>
                                <div className="service-card">
                                    <div className="service-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07M8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                        </svg>
                                    </div>
                                    <h3>Diseño UI/UX</h3>
                                    <p>Interfaces intuitivas y experiencias de usuario excepcionales</p>
                                </div>
                            </ElectricBorder>
                        </div>

                        <div className="scroll-animate-rotate scroll-reveal" style={{ transitionDelay: '0.3s' }}>
                            <ElectricBorder color="#7c3aed" speed={0.9} chaos={0.18} borderRadius={20}>
                                <div className="service-card">
                                    <div className="service-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A7.001 7.001 0 0 0 8 16a7 7 0 0 0 5.29-11.584l.013-.012.354-.354.353.354a.5.5 0 1 0 .707-.707l-1.414-1.415a.5.5 0 1 0-.707.707l.354.354-.354.354-.012.012A6.97 6.97 0 0 0 9 2.071V1h.5a.5.5 0 0 0 0-1zm2 5.6V9a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5.6a.5.5 0 1 1 1 0" />
                                        </svg>
                                    </div>
                                    <h3>Animaciones 3D</h3>
                                    <p>Efectos visuales impactantes con Three.js y WebGL</p>
                                </div>
                            </ElectricBorder>
                        </div>
                    </div>
                </div>
            </section>

            {/* TECHNOLOGIES SECTION */}
            <section className="technologies-section parallax-bg-section parallax-bg-1">
                <div className="container">
                    <h2 className="section-title scroll-animate-flip scroll-reveal">Tecnologías que Dominamos</h2>
                    <p className="section-description scroll-animate-shimmer scroll-reveal">
                        Trabajamos con las herramientas más modernas y eficientes del mercado
                    </p>

                    <div className="tech-grid">
                        <div className="tech-item scroll-animate-slide-left scroll-reveal" style={{ transitionDelay: '0.1s' }}>
                            <div className="tech-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#61DAFB" viewBox="0 0 16 16">
                                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                                </svg>
                            </div>
                            <h4>React</h4>
                            <p>Biblioteca líder para interfaces modernas</p>
                        </div>

                        <div className="tech-item scroll-animate-slide-right scroll-reveal" style={{ transitionDelay: '0.2s' }}>
                            <div className="tech-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#000000" viewBox="0 0 16 16">

            {/* PORTFOLIO SECTION */}
            <section className="portfolio-section">
                <div className="container">
                    <h2 className="section-title scroll-reveal">Portfolio Destacado</h2>
                    <p className="section-description scroll-reveal">
                        Explora nuestros proyectos más recientes
                    </p>

                    <div className="portfolio-showcase">
                        <div className="stack-container-wrapper scroll-reveal" style={{ transitionDelay: '0.1s' }}>
                            <Stack
                                randomRotation={true}
                                autoplay={true}
                                autoplayDelay={3000}
                                pauseOnHover={true}
                                cards={portfolioImages.map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`Proyecto ${i + 1}`}
                                        className="portfolio-image"
                                    />
                                ))}
                            />
                        </div>
                        <div className="portfolio-info scroll-reveal" style={{ transitionDelay: '0.2s' }}>
                            <h3>Proyectos Innovadores</h3>
                            <p>Cada proyecto es una obra maestra digital, diseñada con precisión y pasión.</p>
                            <ul className="features-list">
                                <li className="feature-item">✓ Diseño responsive</li>
                                <li className="feature-item">✓ Optimización de rendimiento</li>
                                <li className="feature-item">✓ Experiencia de usuario premium</li>
                                <li className="feature-item">✓ Código limpio y mantenible</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section className="testimonials-section">
                <div className="container">
                    <h2 className="section-title scroll-reveal">Lo Que Dicen Nuestros Clientes</h2>
                    <p className="section-description scroll-reveal">
                        Testimonios reales de empresas que confiaron en nosotros
                    </p>

                    <div className="testimonials-grid">
                        <div className="testimonial-card scroll-reveal" style={{ transitionDelay: '0.1s' }}>
                            <div className="testimonial-stars">★★★★★</div>
                            <p className="testimonial-text">
                                "El equipo de NovaTech transformó completamente nuestra presencia digital.
                                La atención al detalle y la calidad del código son excepcionales."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">JM</div>
                                <div className="author-info">
                                    <div className="author-name">Juan Martínez</div>
                                    <div className="author-role">CEO, TechStart Inc.</div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card scroll-reveal" style={{ transitionDelay: '0.2s' }}>
                            <div className="testimonial-stars">★★★★★</div>
                            <p className="testimonial-text">
                                "Profesionales, rápidos y con ideas innovadoras. Superaron nuestras expectativas
                                en cada fase del proyecto. Totalmente recomendados."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">MG</div>
                                <div className="author-info">
                                    <div className="author-name">María García</div>
                                    <div className="author-role">Directora de Marketing, Digital Plus</div>
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card scroll-reveal" style={{ transitionDelay: '0.3s' }}>
                            <div className="testimonial-stars">★★★★★</div>
                            <p className="testimonial-text">
                                "La experiencia de usuario que crearon para nuestra plataforma es increíble.
                                Nuestros clientes están encantados con la nueva interfaz."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">CR</div>
                                <div className="author-info">
                                    <div className="author-name">Carlos Rodríguez</div>
                                    <div className="author-role">CTO, InnovateLab</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GALLERY SECTION */}
            <section id="galeria" className="gallery-section">
                <div className="container-full">
                    <h2 className="section-title scroll-reveal">Galería Inmersiva 360°</h2>
                    <p className="section-description scroll-reveal">
                        Explora nuestra galería interactiva en 3D
                    </p>
                    <div className="gallery-wrapper scroll-reveal" style={{ transitionDelay: '0.1s' }}>
                        <DomeGallery
                            segments={34}
                            grayscale={false}
                            overlayBlurColor="#0a0a0a"
                        />
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contacto" className="contact-section">
                <div className="container">
                    <h2 className="section-title scroll-reveal">Contacto</h2>
                    <p className="section-description scroll-reveal">
                        Escríbenos a contacto@novatech.com para más información
                    </p>

                    <div className="contact-wrapper scroll-reveal">
                        <div className="contact-info-side">
                            <h3>Información de Contacto</h3>
                            <p>Estamos aquí para ayudarte a llevar tu proyecto al siguiente nivel.</p>

                            <div className="contact-details">
                                <div className="contact-detail-item">
                                    <div className="contact-icon-wrapper">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>Email</h4>
                                        <p>contacto@novatech.com</p>
                                    </div>
                                </div>

                                <div className="contact-detail-item">
                                    <div className="contact-icon-wrapper">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>Teléfono</h4>
                                        <p>+1 (555) 123-4567</p>
                                    </div>
                                </div>

                                <div className="contact-detail-item">
                                    <div className="contact-icon-wrapper">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>Ubicación</h4>
                                        <p>Silicon Valley, CA</p>
                                    </div>
                                </div>
                            </div>

                            <div className="social-links">
                                <a href="#" className="social-link" aria-label="GitHub">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                    </svg>
                                </a>
                                <a href="#" className="social-link" aria-label="LinkedIn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-link" aria-label="Twitter">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="contact-form-side">
                            <ElectricBorder color="#00d4ff" speed={0.6} chaos={0.3} borderRadius={16}>
                                <form className="contact-form">
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre</label>
                                        <input type="text" id="name" name="name" placeholder="Tu nombre" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" name="email" placeholder="tu@email.com" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="subject">Asunto</label>
                                        <input type="text" id="subject" name="subject" placeholder="¿En qué podemos ayudarte?" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">Mensaje</label>
                                        <textarea id="message" name="message" rows={5} placeholder="Cuéntanos sobre tu proyecto..." required></textarea>
                                    </div>

                                    <button type="submit" className="btn-submit">Enviar Mensaje</button>
                                </form>
                            </ElectricBorder>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <h3>NovaTech Solutions</h3>
                            <p>Innovación sin límites</p>
                        </div>
                        <div className="footer-links">
                            <a href="#inicio">Inicio</a>
                            <a href="#servicios">Servicios</a>
                            <a href="#galeria">Galería</a>
                            <a href="#contacto">Contacto</a>
                        </div>
                        <div className="footer-social">
                            <a href="#" aria-label="Twitter">𝕏</a>
                            <a href="#" aria-label="LinkedIn">in</a>
                            <a href="#" aria-label="GitHub">⚡</a>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2026 NovaTech Solutions. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}