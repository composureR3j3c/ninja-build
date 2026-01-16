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
          DEFAULT: "#FFD97D",      // Soft golden
          dark: "#F4B841",         // Slightly deeper gold
          soft: "#FFF4E1",         // Gentle background highlight
        },
        primary: {
          DEFAULT: "#6C63FF",      // Calm purple
          dark: "#524CCC",         // Darker for contrast
          soft: "#EDE9FF",         // Very light purple for cards/backgrounds
        },
        accent: "#4ADE80",         // Soft green for positive actions
        warning: "#F87171",        // Gentle red for errors/alerts
        info: "#60A5FA",           // Calm blue for info hints
        text: {
          primary: "#1F2937",      // Dark gray, easier on eyes
          secondary: "#4B5563",    // Medium gray
        },
        background: "#F9FAFB",     // Soft neutral background
        surface: "#FFFFFF",        // Card or surface background
        tint: "#F3F4F6",           // Extra soft gray for subtle borders
      },
      
  },
},

  plugins: [],
}