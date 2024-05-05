import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Ruta del servidor Express
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Elimina /api de la ruta
      },
    },
  },
  
});
