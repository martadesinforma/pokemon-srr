/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: { //Esta modificación en el archivo tailwind.config.js permite agregar una animación personalizada llamada fadeIn a tu proyecto. Luego vamos a conseguir agregar esta animacion escribiendo la clase animate-fadeIn en el selector que quiera, en este caso, en el div del pokemon-card.component.html
      keyframes: {
        fadeIn: {
          '0%': {opacity: 0},
          '100%': {opacity: 1},
        }
      },
      animation: {
        fadeIn: 'fadeIn .2s ease-in-out'
      }
    },
  },
  plugins: [],
}

