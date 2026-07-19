import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // Main corporate portal entry point
        main: resolve(__dirname, 'index.html'),
        
        // Company overview and executive profiles document
        about: resolve(__dirname, 'src/pages/About/index.html'),
        
        // Client services and business capability directory
        services: resolve(__dirname, 'src/pages/Services/index.html'),
        
        // Client inquiry and lead acquisition portal
        contact: resolve(__dirname, 'src/pages/Contact/index.html'),
        
        // Secure access point for internal staff and administrators
        login: resolve(__dirname, 'src/pages/Login/index.html'),
        
        // Secure management dashboard for business operations and analytics
        admin: resolve(__dirname, 'src/pages/Admin/index.html')
      }
    }
  }
});