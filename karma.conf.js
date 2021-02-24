// use puppeteer provided Chrome for testing
process.env.CHROME_BIN = require('puppeteer').executablePath();

// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox', 'IE' ]
const browsers = (process.env.TEST_BROWSERS || 'ChromeHeadless').split(/\s*,\s*/g);

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: [
      'mocha',
      'sinon-chai',
      'webpack'
    ],

    files: [ 'test/spec/*.js' ],

    autoWatch: false,

    singleRun: true,

    browsers: browsers,

    preprocessors: {
      'test/spec/*.js': ['webpack']
    },

    client: {
      mocha: {
        timeout : 80000
      }
    },

    reportSlowerThan: 0.00001,

    webpack: {
      "mode": "development",
      module: {
        rules: [
          {
            test: /\.css|\.dmn$/,
            use: 'raw-loader'
          },
        ],
      }
    },

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-sinon-chai',
      'karma-chrome-launcher'
    ]
  });
};
