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
      'sinon-chai'
    ],

    files: [ 'test/spec/*.js' ],

    autoWatch: false,

    singleRun: true,

    browsers: browsers
  });
};
