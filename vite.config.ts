
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: '/dlinrt-products/',
  server: {
    host: "::",
    port: 8080,
    allowedHosts: [
      "7e82abf4-4ab2-47b7-8256-c0abaf5b5420.lovableproject.com"
    ],
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
}));
