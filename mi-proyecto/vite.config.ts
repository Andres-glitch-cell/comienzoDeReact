import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Agrega esta sección aquí:
  server: {
    host: '0.0.0.0', // Escucha en todas las interfaces, incluyendo la IP de AWS
    port: 5173,      // El puerto que abrirás en el Security Group
    strictPort: true // Evita que Vite intente usar otro puerto si este está ocupado
  }
})