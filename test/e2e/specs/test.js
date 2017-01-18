// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

function expression(clicks, expressionDisplay, resultDisplay, browser, devServer){
  expressionDisplay = pretty(expressionDisplay)
  resultDisplay = pretty(resultDisplay)
  browser
    .url(devServer)
    .waitForElementVisible('#app', 5000)
    .assert.elementPresent('.calculator')
  for (var i = 0, len = clicks.length; i < len; i++) {
    browser.click('.btn' + clicks[i]);
  }
  browser
    .assert.containsText('.expression', expressionDisplay)
    .assert.containsText('.result', resultDisplay)
    .end()

}

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    expression('', '', '', browser, devServer)
    expression('2+3', '2 + 3', '5', browser, devServer)
  }
}
