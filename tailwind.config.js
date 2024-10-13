/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        figtree: ["Figtree", "sans-serif"],
      },
      colors: {
        green: {
          main: "#29AB00",
          light: "#6BC933",
          dark: "#207C00",
          accent: "#00AB6B",
        },
        red: {
          accent: "#B50626"
        },
        yellow: {
          accent: "#D3B300"
        },
        gray: {
          neutrals: "#7D7D7D",
          light: "#B0B0B0",
        },
      },
    },
  },
  plugins: [],
}