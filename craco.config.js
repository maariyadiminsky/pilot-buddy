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
};
