/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: "#E8A926", // your primary color
        "brand-dark": "#C27803", // a darker version of your primary color
        "brand-soft": "#FFF4D1", // a softer version of your primary color
        primary: "#4F46E5", // your secondary color
        "primary-soft": "#C7D2FE", // a softer version of your primary color
        "primary-dark": "#3730A3", // a darker version of your primary color
        "accent": "#10B981", // accent color
        "text-primary": "#111827", // primary text color
        "text-secondary": "#6B7280", // secondary text color
        "background": "#F9FAFB", // background color
      },
    },
  },
  plugins: [],
};
