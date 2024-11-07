module.exports = {
    purge: ['./pages/**/*.{vue,js}', './components/**/*.{vue,js}'], // Purge unused CSS
    darkMode: false, // Disable dark mode
    theme: {
      extend: {
        colors: {
          primary: '#3490dc', // Blue color
          secondary: '#ffed4a', // Yellow color
        },
      },
    },
    variants: {},
    plugins: [],
  };
  