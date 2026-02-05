// ! IMPORT THAT CARD https://reactbits.dev/components/lanyard
import Stack from "./Stack";
import DomeGallery from "./DomeGallery";
import ElectricBorder from './ElectricBorder'

export default function App() {
  const images = [
    "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
    "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
    "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
  ];

  return (
    <div
      style={{
        backgroundColor: "#111",
        color: "white",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}>
      {/* HEADER */}
      <header
        style={{
          padding: "40px 20px",
          textAlign: "center",
          background: "linear-gradient(to bottom, #222, #111)",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", margin: 0 }}>NovaTech Solutions</h1>
        <p style={{ color: "#888" }}>
          Soluciones tecnológicas simples para problemas complejos
        </p>
      </header>

      {/* NAVBAR */}
      <nav style={{ borderBottom: "1px solid #333", padding: "10px 0" }}>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <a
              href="#services"
              style={{ color: "#00d8ff", textDecoration: "none" }}
            >
              Servicios
            </a>
          </li>
          <li>
            <a
              href="#about"
              style={{ color: "#00d8ff", textDecoration: "none" }}
            >
              Quiénes somos
            </a>
          </li>
          <li>
            <a
              href="#contact"
              style={{ color: "#00d8ff", textDecoration: "none" }}
            >
              Contacto
            </a>
          </li>
        </ul>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main
        style={{
          padding: "50px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "50px",
        }}
      >
        {/* 1. SECCIÓN DEL STACK */}
        <div style={{ width: 300, height: 300 }}>
          <Stack
            randomRotation={true}
            sensitivity={200}
            sendToBackOnClick={true}
            cards={images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`card-${i + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
              />
            ))}
            autoplay={true}
            autoplayDelay={2000}
            pauseOnHover={true}
          />
        </div>

        {/* 2. SECCIÓN DEL DOME GALLERY */}
        <div
          style={{
            width: "100%",
            height: "500px",
            position: "relative",
            marginTop: "50px",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Vista Panorámica
          </h2>
          <DomeGallery
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
          />
        </div>
      </main>

      {/* SECCIONES DE TEXTO */}
      <section
        id="services"
        style={{
          padding: "40px 20px",
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2>Nuestros servicios</h2>
        <p style={{ color: "#ccc" }}>
          En NovaTech ofrecemos servicios de desarrollo web, consultoría
          tecnológica y mantenimiento de infraestructuras digitales.
        </p>
      </section>
      <ElectricBorder
  color="#a51d2d"
  speed={0.7}
  chaos={0.25}
  borderRadius={16} // Pásalo como prop directa, no dentro de style
>
  <div style={{ padding: '60px' }}>
    <p style={{ margin: '6px 0 0', opacity: 0.8 }}>
      A glowing, animated border wrapper.
    </p>
  </div>
</ElectricBorder>
      {/* FOOTER */}
      <footer
        style={{
          padding: "20px",
          textAlign: "center",
          borderTop: "1px solid #333",
          marginTop: "50px",
        }}
      >
        <p style={{ fontSize: "0.9rem", color: "#666" }}>
          © 2026 NovaTech Solutions
        </p>
      </footer>
    </div>
    
  );
}
