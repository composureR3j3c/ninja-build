/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-Regular", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
      },
      colors: {
        background: "#F6F4EF", // warm paper
        surface: "#FFFFFF", // cards
        border: "#DEDAD3", // soft divider
        tint: "#D97706", // vibrant orange
        brand: {
          DEFAULT: "#rgba(10, 21, 46, 0.85)", // deep navy
          light: "#6d6c88", // light lavender
          dark: "#rgba(10, 21, 46,1)", // deeper navy
        },
        primary: {
          DEFAULT: "#D97706",
          soft: "#FDE68A",
          dark: "#B45309",
        },
        text: {
          primary: "#1F1D1A", // ink black
          secondary: "#5C5853", // warm gray
          muted: "#9A968F", // subtle hints
        },

        accent: {
          DEFAULT: "#4A4238", // deep clay / charcoal
          soft: "#D8D3CA", // background accent
        },

        danger: "#8C2F2F", // muted red
      },
    },
  },

  plugins: [],
};
