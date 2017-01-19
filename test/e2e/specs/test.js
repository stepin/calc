// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

function pretty (str) {
  return str.replace(/-/g, '−').replace(/\./g, ',').replace(/\//g, '÷').replace(/\*/g, '×')
}

function toCssClass (char) {
  if (char === 'C') {
    return 'CA'
  }
  if (char === 'B') {
    return 'Backspace'
  }
  if (char === 'R') {
    return 'Randon'
  }
  if (char === '/') {
    return 'Divide'
  }
  if (char === '*') {
    return 'Multiply'
  }
  if (char === '-') {
    return 'Minus'
  }
  if (char === '+') {
    return 'Plus'
  }
  if (char === '.') {
    return 'Period'
  }
  if (char === 'S') {
    return 'Sign'
  }
  if (char === '=') {
    return 'Equal'
  }
  return char
}

function expression (clicks, expressionDisplay, resultDisplay, browser, devServer) {
  expressionDisplay = pretty(expressionDisplay)
  resultDisplay = pretty(resultDisplay)
  browser
    .url(devServer)
    .waitForElementVisible('#app', 5000)
    .assert.elementPresent('.calculator')
  for (var i = 0, len = clicks.length; i < len; i++) {
    const selector = '.btn' + toCssClass(clicks[i])
    browser.waitForElementVisible(selector, 100)
    browser.click(selector);
  }
  browser
    .assert.containsText('.expression', expressionDisplay)
    .assert.containsText('.result', resultDisplay)

}

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    expression('', '', '', browser, devServer)
    expression('2+3', '2 + 3', '5', browser, devServer)
    browser.end()
  }
}
