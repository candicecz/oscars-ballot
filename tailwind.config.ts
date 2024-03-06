import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  theme: {
    extend: {
      colors: {
        brandy: {
          "50": "#faf7f2",
          "100": "#f4ece0",
          "200": "#e9d8bf",
          "300": "#dec4a1",
          "400": "#cb9d6c",
          "500": "#c0844f",
          "600": "#b27144",
          "700": "#945a3a",
          "800": "#784934",
          "900": "#613d2d",
          "950": "#341f16",
        },

        mahogany: {
          "50": "#fff1f2",
          "100": "#ffdfe1",
          "200": "#ffc5c9",
          "300": "#ff9da3",
          "400": "#ff656f",
          "500": "#ff3441",
          "600": "#ed1523",
          "700": "#c80d19",
          "800": "#a50f19",
          "900": "#88141c",
          "950": "#52050a",
        },
        oscars: {
          "50": "#fbf9eb",
          "100": "#fefef6",
          "200": "#eee39a",
          "300": "#e4ce60",
          "400": "#dab835",
          "500": "#c79f27",
          "600": "#ae7f20",
          "700": "#8b5d1d",
          "800": "#744b1f",
          "900": "#64401f",
          "950": "#3a210e",
        },
      },
      maxWidth: {
        "screen-3xl": "1600px",
      },
      width: {
        "screen-3xl": "1600px",
      },
    },
  },
  plugins: [],
};
export default config;
