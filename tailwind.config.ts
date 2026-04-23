import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#05030f",
          subtle: "#0a0819",
          elevated: "#120d26"
        },
        foreground: {
          DEFAULT: "#fafafa",
          muted: "#a1a1aa"
        },
        accent: {
          DEFAULT: "#7b5bff",
          soft: "#5cd0ff",
          warm: "#ffc457",
          light: "#9b8bff",
          pale: "#b8adff"
        },
        surface: {
          0: "#05030f",
          1: "#0a0819",
          2: "#120d26",
          3: "#1a1433"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Poppins", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 70px rgba(123, 91, 255, 0.25)",
        "glow-sm": "0 0 30px rgba(123, 91, 255, 0.15)",
        "glow-lg": "0 0 120px rgba(123, 91, 255, 0.3)",
        "glow-accent": "0 0 40px rgba(123, 91, 255, 0.2), 0 0 80px rgba(123, 91, 255, 0.08)",
        "inner-glow": "inset 0 1px 0 rgba(255, 255, 255, 0.06)",
        "card": "0 4px 24px -4px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.04)"
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem"
      },
      transitionDuration: {
        "400": "400ms"
      },
      animation: {
        "spin-slow": "spin 40s linear infinite",
        "float": "floatSoft 3.4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "gradient": "gradientFlow 5s ease infinite",
        "shimmer": "shimmerLine 3s ease-in-out infinite",
      },
      backgroundImage: {
        "grid-white": "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "dot-grid": "radial-gradient(circle, rgba(123, 91, 255, 0.4) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backgroundSize: {
        "grid-40": "40px 40px",
      },
    }
  },
  plugins: []
};

export default config;
