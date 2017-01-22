// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage
//
// http://nightwatchjs.org/api#commands
// https://nodejs.org/api/assert.html

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

function equalText (selector, expected, browser) {
  browser.getText(selector, function(result) {
    this.assert.equal(typeof result, 'object')
    this.assert.equal(result.status, 0)
    let value = result.value
    this.assert.equal(typeof value, 'string')
    value = value.trim()
    this.assert.equal(expected, value)
  })
}

function expression (clicks, expressionDisplay, resultDisplay, browser, devServer) {
  expressionDisplay = expressionDisplay === null ? null : pretty(expressionDisplay)
  resultDisplay = pretty(resultDisplay)
  browser
    .url(devServer)
    .waitForElementVisible('#app', 5000)
    .assert.elementPresent('.calculator')
  for (var i = 0, len = clicks.length; i < len; i++) {
    const selector = '.btn' + toCssClass(clicks[i])
    browser.waitForElementVisible(selector, 200)
    browser.click(selector);
  }
  if (expressionDisplay !== null) {
    equalText('.expression', expressionDisplay, browser)
  }
  equalText('.result', resultDisplay, browser)
  return browser
}

module.exports = {
  'empty state': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    expression('', '', '', browser, devServer)

    browser.end()
  },
  'edge cases': function (browser) {
    const devServer = browser.globals.devServerURL

    expression('./', '0.', '', browser, devServer)
    expression('2+B', '2 +', '', browser, devServer)

    expression('1.+', '1 +', '', browser, devServer)
    expression('1.+2.3', '1 + 2.3', '3.3', browser, devServer)
    expression('1.1+2.3', '1.1 + 2.3', '3.4', browser, devServer)

    expression('3+2*', '3 + 2 *', '', browser, devServer)
    expression('4+2B', '4 +', '', browser, devServer)
    expression('2+3=99', '599', '', browser, devServer)
    expression('/=', '', '', browser, devServer)

    browser.end()
  },
  'random': function (browser) {
    const devServer = browser.globals.devServerURL

    var r1, r2, r3

    expression('R', null, '', browser, devServer)
    browser.getText('.expression', function(result) {
      this.assert.equal(typeof result, 'object')
      this.assert.equal(result.status, 0)
      const value = result.value
      this.assert.equal(typeof value, 'string')
      this.assert.ok(value.search(/0,\d\d/) !== -1 , 'Check random number format, ' + value)
      r1 = value
    })

    expression('R', null, '', browser, devServer)
    browser.getText('.expression', function(result) {
      this.assert.equal(typeof result, 'object')
      this.assert.equal(result.status, 0)
      const value = result.value
      this.assert.equal(typeof value, 'string')
      this.assert.ok(value.search(/0,\d\d/) !== -1 , 'Check random number format, ' + value)
      r2 = value
    })

    expression('R', null, '', browser, devServer)
    browser.getText('.expression', function(result) {
      this.assert.equal(typeof result, 'object')
      this.assert.equal(result.status, 0)
      const value = result.value
      this.assert.equal(typeof value, 'string')
      this.assert.ok(value.search(/0,\d\d/) !== -1 , 'Check random number format, ' + value)
      r3 = value
    })

    browser.perform(function () {
      this.client.api.assert.ok(r1 !== r2 || r2 !== r3 || r1 !== r3, 'different random numbers')
    })

    browser.end()
  },
  'one button': function (browser) {
    const devServer = browser.globals.devServerURL

    expression('1', '1', '', browser, devServer)
    expression('2', '2', '', browser, devServer)
    expression('3', '3', '', browser, devServer)
    expression('4', '4', '', browser, devServer)
    expression('5', '5', '', browser, devServer)
    expression('6', '6', '', browser, devServer)
    expression('7', '7', '', browser, devServer)
    expression('8', '8', '', browser, devServer)
    expression('9', '9', '', browser, devServer)
    expression('0', '', '', browser, devServer)
    expression('01', '1', '', browser, devServer)

    expression('R', null, '', browser, devServer)
    browser.getText('.expression', function(result) {
      this.assert.equal(typeof result, 'object')
      this.assert.equal(result.status, 0)
      const value = result.value
      this.assert.equal(typeof value, 'string')
      this.assert.ok(value.search(/0,\d\d/) !== -1 , 'Check random number format, ' + value)
    })

    expression('C', '', '', browser, devServer)
    expression('B', '', '', browser, devServer)
    expression('/', '', '', browser, devServer)
    expression('*', '', '', browser, devServer)
    expression('-', '', '', browser, devServer)
    expression('+', '', '', browser, devServer)
    expression('.', '0.', '', browser, devServer)
    expression('S', '', '', browser, devServer)
    expression('=', '', '', browser, devServer)

    browser.end()
  },
  'button + operation': function (browser) {
    const devServer = browser.globals.devServerURL

    expression('1R', null, '', browser, devServer)
    browser.getText('.expression', function(result) {
      this.assert.equal(typeof result, 'object')
      this.assert.equal(result.status, 0)
      const value = result.value
      this.assert.equal(typeof value, 'string')
      this.assert.ok(value.search(/0,\d\d/) !== -1 , 'Check random number format, ' + value)
    })
    expression('1+', '1 +', '', browser, devServer)
    expression('1-', '1 -', '', browser, devServer)
    expression('1*', '1 *', '', browser, devServer)
    expression('1/', '1 /', '', browser, devServer)
    expression('1S', '-1', '', browser, devServer)
    expression('1.', '1.', '', browser, devServer)
    expression('1C', '', '', browser, devServer)
    expression('1B', '', '', browser, devServer)
    expression('12C', '', '', browser, devServer)
    expression('12B', '1', '', browser, devServer)
    expression('1=', '1', '', browser, devServer)

    browser.end()
  },
  'button + operation + operation': function (browser) {
    const devServer = browser.globals.devServerURL

    expression('1RR', null, '', browser, devServer)
    browser.getText('.expression', function(result) {
      this.assert.equal(typeof result, 'object')
      this.assert.equal(result.status, 0)
      const value = result.value
      this.assert.equal(typeof value, 'string')
      this.assert.ok(value.search(/0,\d\d/) !== -1 , 'Check random number format, ' + value)
    })
    expression('1+*', '1 +', '', browser, devServer)
    expression('1-/', '1 -', '', browser, devServer)
    expression('1*-', '1 *', '', browser, devServer)
    expression('1/+', '1 /', '', browser, devServer)
    expression('1SS', '1', '', browser, devServer)
    expression('0SS', '', '', browser, devServer)
    expression('1..', '1.', '', browser, devServer)
    expression('1CC', '', '', browser, devServer)
    expression('1BB', '', '', browser, devServer)
    expression('12CC', '', '', browser, devServer)
    expression('12BB', '', '', browser, devServer)
    expression('123BB', '1', '', browser, devServer)
    expression('1==', '1', '', browser, devServer)

    browser.end()
  },
  'one full operation': function (browser) {
    const devServer = browser.globals.devServerURL

    expression('1+2', '1 + 2', '3', browser, devServer)
    expression('1-2', '1 - 2', '-1', browser, devServer)
    expression('1*2', '1 * 2', '2', browser, devServer)
    expression('1/2', '1 / 2', '0.5', browser, devServer)
    expression('1+2S', '1 + (-2)', '-1', browser, devServer)
    expression('1.2', '1.2', '', browser, devServer)
    expression('1+2C', '', '', browser, devServer)
    expression('1+2=', '3', '', browser, devServer)

    browser.end()
  },
  'two full operations': function (browser) {
    const devServer = browser.globals.devServerURL

    expression('1+2-3', '1 + 2 - 3', '0', browser, devServer)
    expression('1-2*3', '1 - 2 * 3', '-3', browser, devServer)
    expression('1*2+1', '1 * 2 + 1', '3', browser, devServer)
    expression('1/2*3', '1 / 2 * 3', '1.5', browser, devServer)
    expression('1+2S+5', '1 + (-2) + 5', '4', browser, devServer)
    expression('1.2+2', '1.2 + 2', '3.2', browser, devServer)
    expression('1+2/3C', '', '', browser, devServer)
    expression('1+2-3=', '', '', browser, devServer)
    expression('1+2-4=', '-1', '', browser, devServer)

    browser.end()
  },
  'first zero': function (browser) {
    const devServer = browser.globals.devServerURL

    expression('01', '1', '', browser, devServer)
    expression('0+', '', '', browser, devServer)
    expression('0-', '', '', browser, devServer)
    expression('0*', '', '', browser, devServer)
    expression('0/', '', '', browser, devServer)
    expression('0=', '', '', browser, devServer)
    expression('0C', '', '', browser, devServer)
    expression('0B', '', '', browser, devServer)
    expression('0S', '', '', browser, devServer)
    expression('0.', '0.', '', browser, devServer)

    browser.end()
  }
}
