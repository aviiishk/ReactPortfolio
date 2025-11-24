// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // optional: produces dist/bundle-analysis.html
    visualizer({ filename: "dist/bundle-analysis.html", open: false })
  ],

  // Ensure Vite pre-bundles react/react-dom and some ESM-first libs to avoid resolution issues
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@mui/material",
      "framer-motion",
      "lucide-react",
      "react-router-dom"
    ]
  },

  // Ensure those libs are bundled in SSR/production builds too (avoid externalization surprises)
  ssr: {
    noExternal: [
      "@mui/material",
      "framer-motion",
      "lucide-react",
      "react-router-dom"
    ]
  },

  build: {
    target: "es2018",

    // production: turned off for smaller builds
    sourcemap: false,

    // help Vite/Rollup handle mixed ESM/CJS packages
    commonjsOptions: {
      transformMixedEsModules: true
    },

    // Keep node_modules in a single vendor chunk to avoid cross-chunk react resolution issues
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        }
      }
    },

    chunkSizeWarningLimit: 2000
  }
});
