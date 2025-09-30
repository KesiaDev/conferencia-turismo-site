/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
          DEFAULT: "#1e40af",
          dark: "#1e3a8a",
          light: "#3b82f6",
        },
        secondary: {
          DEFAULT: "#7c3aed",
          dark: "#6d28d9",
          light: "#8b5cf6",
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

