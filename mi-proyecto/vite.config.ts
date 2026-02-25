// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    host: '0.0.0.0',     // Permite acceso desde fuera (necesario en AWS, VM, red local, etc.)
    port: 5173,          // Puerto fijo
    strictPort: true,    // No cambia de puerto si 5173 está ocupado → falla explícitamente
    open: false,         // No abre el navegador automáticamente (opcional)
    // hmr: { clientPort: 5173 }, // descomenta si tienes problemas de HMR en redes remotas
  },

  // Opcional: si vas a deployar en producción algún día
  build: {
    outDir: 'dist',
    sourcemap: true, // útil para debug en producción
  },
});