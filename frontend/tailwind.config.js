/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0808", // Black
        primary: "#967D6A",    // Gold Beige
        secondary: "#D1D6D8",  // Silver
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "serif"],
        cinzel: ['Cinzel', "serif"],
        inter: ['Inter', "sans-serif"],
        poppins: ['Poppins', "sans-serif"],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      }
    },
  },
  plugins: [],
}
