const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'), // ./src/components 폴더에 @components 별칭지정
       // ./src/pages 폴더에@pages 별칭지정
      '@pages': path.resolve(__dirname, './src/pages'),
      '@commons': path.resolve(__dirname, './src/components/common'),
      '@css':path.resolve(__dirname, './src/css'),
    },
  },
};