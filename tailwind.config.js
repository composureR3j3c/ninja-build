/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
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
      brand: {
        DEFAULT: "#E8A926",
        dark: "#C27803",
        soft: "#FFF4D1",
      },
      primary: {
        DEFAULT: "#4F46E5",
        dark: "#3730A3",
        soft: "#C7D2FE",
      },
      accent: "#10B981",
      text: {
        primary: "#111827",
        secondary: "#6B7280",
      },
      background: "#F9FAFB",
    },
  },
},

  plugins: [],
}