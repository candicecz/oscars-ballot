import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // to do: add color variables
        // primary: "rgb(var(--color-primary) / <alpha-value>)",
        // secondary: "rgb(var(--color-secondary) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
export default config;
