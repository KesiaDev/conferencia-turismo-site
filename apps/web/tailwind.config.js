/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      maxWidth: {
        container: "1200px",
      },
      spacing: {
        gutter: "24px",
      },
      screens: {
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      borderRadius: {
        btn: "10px",
      },
      height: {
        btn: "48px",
      },
      colors: {
        primary: {
          DEFAULT: "#8B4513",
          dark: "#654321",
          light: "#A0522D",
        },
        secondary: {
          DEFAULT: "#D2B48C",
          dark: "#C19A6B",
          light: "#E8D5B7",
        },
        accent: {
          DEFAULT: "#e0a085",
          dark: "#c88567",
          light: "#edbaa3",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
