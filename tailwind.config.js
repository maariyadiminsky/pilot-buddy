import forms from '@tailwindcss/forms';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

const config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [forms],
};

export default config;
