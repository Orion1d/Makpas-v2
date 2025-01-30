import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-slot'],
          'query': ['@tanstack/react-query'],
        },
      },
    },
    // Configure sourcemap generation
    sourcemap: mode === 'development',
    // Optimize minification
    minify: mode === 'development' ? false : 'terser',
    terserOptions: mode === 'development' ? undefined : {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Enable chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      '@radix-ui/react-dialog', 
      '@radix-ui/react-slot',
      '@tanstack/react-query'
    ],
  },
}));