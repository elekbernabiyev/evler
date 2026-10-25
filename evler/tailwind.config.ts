import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 50: "#eef3f9", 100: "#d9e4f0", 600: "#17426f", 700: "#0f3157", 800: "#0b2545", 900: "#071a33" },
        brand: { 50: "#ecfdf5", 500: "#10b981", 600: "#059669", 700: "#047857" },
      },
    },
  },
  plugins: [],
};
export default config;
