import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Sky Zone - Warm soft blues, creamy whites, golden sun
        sky: {
          light: "hsl(200, 60%, 85%)",
          DEFAULT: "hsl(200, 55%, 65%)",
          dark: "hsl(200, 50%, 45%)",
          cream: "hsl(45, 60%, 90%)",
          gold: "hsl(45, 80%, 60%)",
        },
        // Ground Zone - Tans, terracottas, sage greens, weathered grays
        ground: {
          tan: "hsl(35, 40%, 70%)",
          terracotta: "hsl(15, 50%, 55%)",
          sage: "hsl(90, 20%, 50%)",
          gray: "hsl(0, 0%, 55%)",
          sand: "hsl(40, 50%, 75%)",
        },
        // Underground Roots - Rich browns, deep amber, dark soil
        underground: {
          brown: "hsl(25, 40%, 30%)",
          amber: "hsl(35, 60%, 40%)",
          soil: "hsl(20, 30%, 20%)",
          "dark-earth": "hsl(25, 35%, 15%)",
        },
        // Data Center - Cool blues, terminal greens, warm lamp lighting
        datacenter: {
          blue: "hsl(210, 50%, 40%)",
          terminal: "hsl(140, 60%, 50%)",
          lamp: "hsl(45, 70%, 65%)",
          metal: "hsl(200, 10%, 30%)",
        },
        // Base dark mode colors
        background: "hsl(222, 47%, 11%)",
        foreground: "hsl(210, 40%, 98%)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-source-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        soft: "1rem",
        softer: "1.5rem",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.1)",
        layered:
          "0 1px 2px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
