// 1. IMPORTACIONES: Traemos las herramientas y componentes necesarios
import Stack from "./Stack";
import DomeGallery from "./DomeGallery";
import ElectricBorder from './ElectricBorder';

/**
 * IMPORTANTE: Para que no marque error en la línea de abajo, 
 * asegúrate de que el archivo se llame exactamente 'FlowingMenu.tsx' 
 * y tenga el // @ts-nocheck al principio.
 */
import FlowingMenu from './components/FlowingMenu';

export default function App() {
  // 2. DATOS DE PRUEBA: Definimos las imágenes para el componente Stack
  const images = [
    "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
    "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
    "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
  ];

  // 3. CONFIGURACIÓN DEL MENÚ: Lista de objetos para el FlowingMenu
  // Cada objeto define el destino del link, el nombre y la foto de fondo
  const menuItems = [
    { link: '#services', text: 'Servicios', image: 'https://picsum.photos/600/400?random=1' },
    { link: '#about', text: 'Nosotros', image: 'https://picsum.photos/600/400?random=2' },
    { link: '#contact', text: 'Contacto', image: 'https://picsum.photos/600/400?random=3' },
    { link: '#home', text: 'Inicio', image: 'https://picsum.photos/600/400?random=4' }
  ];

  return (
    // CONTENEDOR RAÍZ: Establece el fondo negro y ocupa toda la pantalla
    <div
      style={{
        backgroundColor: "#111",
        color: "white",
        minHeight: "100vh",
        fontFamily: "sans-serif",
      }}>
      
      {/* 4. HEADER: El encabezado visual de tu página */}
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

      {/* 5. FLOWING MENU: Tu nueva navegación interactiva */}
      <section style={{ height: '400px', width: '100%', borderBottom: '1px solid #333' }}>
        <FlowingMenu 
          items={menuItems} 
          marqueeBgColor="#a51d2d" // Color rojo a juego con el borde eléctrico
        />
      </section>

      {/* 6. CONTENIDO PRINCIPAL: Donde viven tus componentes visuales */}
      <main
        style={{
          padding: "50px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "50px", // Espacio entre cada componente
        }}
      >
        {/* COMPONENTE STACK: Cartas que se mueven al hacer clic */}
        <div style={{ width: 300, height: 300 }}>
          <Stack
            randomRotation={true}
            cards={images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`card-${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "15px" }}
              />
            ))}
          />
        </div>

        {/* COMPONENTE DOME GALLERY: Galería 3D en forma de cúpula */}
        <div style={{ width: "100%", height: "500px", position: "relative" }}>
          <h2 style={{ textAlign: "center" }}>Vista Panorámica</h2>
          <DomeGallery segments={34} />
        </div>

        {/* COMPONENTE ELECTRIC BORDER: Banner con borde rojo animado */}
        <div style={{ width: '80%', maxWidth: '800px' }}>
          <ElectricBorder color="#a51d2d" speed={0.7} chaos={0.25} borderRadius={16}>
            <div style={{ padding: '60px', textAlign: 'center' }}>
              <h3 style={{ margin: 0 }}>Innovación sin límites</h3>
              <p style={{ opacity: 0.8 }}>Destaque con efectos visuales de última generación.</p>
            </div>
          </ElectricBorder>
        </div>
      </main>

      {/* 7. FOOTER: El cierre de la página */}
      <footer style={{ padding: "20px", textAlign: "center", borderTop: "1px solid #333" }}>
        <p>© 2026 NovaTech Solutions</p>
      </footer>
    </div>
  );
}