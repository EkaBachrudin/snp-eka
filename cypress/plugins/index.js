const webpackPreprocessor = require('@cypress/webpack-preprocessor');

module.exports = (on, config) => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: ['.ts', '.js']
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [{
              loader: 'ts-loader'
            }]
          }
        ]
      }
    },
    watchOptions: {}
  };

  on('file:preprocessor', webpackPreprocessor(options));
};
