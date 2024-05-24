import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.165:3000', // Ruta del servidor Express
        rewrite: (path) => path.replace(/^\/api/, ''), // Elimina /api de la ruta
      },
    },
  },
  
});
