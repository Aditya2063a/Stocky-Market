/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 3s linear infinite', // Adjust the duration as needed
      },
      colors: {
        white: "white",
        none: "none",
      },

      borderWidth: {
        1 : "1px",
      },

      fontFamily: {
        lato: ["Lato","sans-serif"],
      },

      gridTemplateRows: {
        7 : "repeat(7,minmax(0,1fr))",
        8 : "repeat(8,minmax(0,1fr))",
      }

    },
  },
  plugins: [],
}
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         'spin-slow': {
//           '0%': { transform: 'rotate(0deg)' },
//           '100%': { transform: 'rotate(360deg)' },
//         },
//       },
//       animation: {
//         'spin-slow': 'spin-slow 3s linear infinite', // Adjust the duration as needed
//       },
//     },
//   },
//   variants: {},
//   plugins: [],
// };
