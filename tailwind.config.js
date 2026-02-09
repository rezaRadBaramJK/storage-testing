/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors: {
        "root-backgroung": "#f4fff2",
        "gray-Primary": "#EEEEEE",
        "primary-light": "#FEF2E5",
        black: "#1B202B",
        "yellow-color": "#00763B",
        primary: "#00763B",
        secondry: "#87C38F",
        "gray-text": "#a7a7a7",
        "root-text": "#212121",
        "productCard-bg": "#ffffff",
        "loading-base": "#ffffff",
        "loading-base-50": "#d8d8d8",
        error: "red",
      },
      boxShadow: {
        custom: "0px 0px 6pt 2pt rgba(0, 0, 0, 0.16)",
      },
      textShadow: {
        sm: "1px 1px 2px rgba(0,0,0,0.25)",
        default: "2px 2px 4px rgba(0,0,0,0.3)",
        lg: "3px 3px 6px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    },
  ],
};
