import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  cacheDir: ".vite-cache",

  resolve: {
    alias: {
      "redux-persist": "redux-persist/es",
    },
    dedupe: ["react", "react-dom"],
  },

  server: {
    allowedHosts: ["localhost", "127.0.0.1", "xcustompackaging.com", "www.xcustompackaging.com"],
    strictPort: false,
    hmr: {
      host: "localhost",
      protocol: "ws",
    },
  },

  ssr: {
    noExternal: [
      "react-helmet-async",
      "react-redux",
      "redux-persist",
      "@reduxjs/toolkit",
      "lottie-react",
      "lucide-react"
    ],
    resolve: {
      conditions: ['node', 'import'],
    },
    // Keep React external for SSR - Node.js will resolve it natively
    external: ['react', 'react-dom', 'react-dom/server'],
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-helmet-async",
      "react-redux",
      "@reduxjs/toolkit",
      'lottie-react'
    ],
    exclude: [
      "react-dom/server",
    ],
    esbuildOptions: {
      resolveExtensions: [".jsx", ".js", ".ts", ".tsx"],
    },
  },

  build: {
    target: "esnext",
    sourcemap: false,
    minify: 'esbuild', // Use esbuild instead of terser (faster and built-in)
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            if (id.includes('react-redux') || id.includes('@reduxjs') || id.includes('redux-persist')) {
              return 'redux';
            }
            if (id.includes('react-helmet-async') || id.includes('lottie-react')) {
              return 'vendor';
            }
            if (id.includes('react-icons')) {
              return 'icons';
            }
            return 'vendor';
          }
        },
      },
    },
  },
});
