const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@common': path.resolve(__dirname, 'src/modules/common'),
      '@redux': path.resolve(__dirname, 'src/modules/redux'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
  style: {
    postcss: {
      loaderOptions: (postcssLoaderOptions) => {
        postcssLoaderOptions.postcssOptions.plugins = [
          require('postcss-import'),
          require('tailwindcss/nesting'),
          require('tailwindcss')('./tailwind.config.js'),
          'postcss-flexbugs-fixes',
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            },
          ],
        ];

        return postcssLoaderOptions;
      },
    },
  },
};
