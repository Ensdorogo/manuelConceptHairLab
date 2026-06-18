import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Abilita Turbopack — dev server drasticamente più veloce (3-5x)
  turbopack: {},

  // Comprimi i bundle in produzione
  compress: true,

  // Ottimizzazioni immagini
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 giorni
  },

  // Ottimizza import per librerie pesanti
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
