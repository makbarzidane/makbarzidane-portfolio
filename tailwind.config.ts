import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#020617",
        slateGlass: "rgba(15, 23, 42, 0.68)",
        cyanGlow: "#22d3ee",
        mintGlow: "#34d399"
      },
      boxShadow: {
        glow: "0 18px 60px rgba(34, 211, 238, 0.14)",
        card: "0 18px 40px rgba(2, 6, 23, 0.36)"
      }
    }
  },
  plugins: []
};

export default config;
