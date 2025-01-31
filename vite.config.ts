import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        chatApp: 'http://localhost:5001/dist/assets/remoteEntry.js',
        emailApp: 'http://localhost:5002/dist/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  }
});