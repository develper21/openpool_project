import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F0E8",
        olive: "#6B7C3A",
        terracotta: "#C4622D",
        mustard: "#E8B84B",
        charcoal: "#2C2C2C",
        paper: "#EDE8DC",
        sage: "#8FAF72",
        ink: "#1A1A2E",
      },
      fontFamily: {
        caveat: ["var(--font-caveat)", "cursive"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
