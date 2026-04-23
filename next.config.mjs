/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable React strict debug double-invocation behavior.
  reactStrictMode: false,
  compiler: {
    // Strip console.* in production builds (keep warn/error) for faster runtime.
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false
  },
  // NOTE: `config.cache = false` was DISABLING webpack's filesystem cache in dev,
  // which made every hot-reload recompile from scratch and caused visible lag.
  // Leaving the default (filesystem cache enabled) restores fluid reloads.
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"]
  }
};

export default nextConfig;
