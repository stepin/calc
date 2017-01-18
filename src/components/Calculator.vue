<template>
  <div class="calculator">
    <div class="line display">
      <div class="expression">{{ expressionDisplay }}</div>
    </div>
    <div class="line display">
      <div class="result">{{ resultDisplay }}</div>
    </div>
    <div class="line">
      <button class="operation btnCA" @click="clearAll()">CA</button>
      <button class="operation btnBackspace" @click="backspace()">&larr;</button>
      <button class="operation btnRandon" @click="random()">&forall;</button>
      <button class="operation btnDivide" @click="operation('/')">&divide;</button>
    </div>
    <div class="line">
      <button class="number btn7" @click="number(7)">7</button>
      <button class="number btn8" @click="number(8)">8</button>
      <button class="number btn9" @click="number(9)">9</button>
      <button class="operation btnMultiply" @click="operation('*')">&times;</button>
    </div>
    <div class="line">
      <button class="number btn4" @click="number(4)">4</button>
      <button class="number btn5" @click="number(5)">5</button>
      <button class="number btn6" @click="number(6)">6</button>
      <button class="operation btnMinus" @click="operation('-')">&minus;</button>
    </div>
    <div class="line">
      <button class="number btn1" @click="number(1)">1</button>
      <button class="number btn2" @click="number(2)">2</button>
      <button class="number btn3" @click="number(3)">3</button>
      <button class="operation btnPlus" @click="operation('+')">+</button>
    </div>
    <div class="line">
      <button class="number btnPeriod" @click="period()">,</button>
      <button class="number btn0" @click="number(0)">0</button>
      <button class="number btnSign" @click="sign()">&plusmn;</button>
      <button class="operation btnEqual" @click="equal()">=</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calculator',
  data () {
    return {
      curNumberStr: '0',
      curOperation: '',
      operationsCount: 0,
      prevResult: 0,
      prevExpressionLine: ''
    }
  },
  computed: {
    curNumber: function () {
      return parseFloat(this.curNumberStr, 10)
    },
    expressionLine: function () {
      const curNumber = this.curNumber < 0 && this.curOperation !== '' ? `(${this.curNumberStr})` : this.curNumberStr
      return `${this.prevExpressionLine} ${this.curOperation} ${curNumber}`
    },
    expressionDisplay: function () {
      if (this.curNumberStr === '0') {
        return this.prevExpressionLine + ' ' + this.curOperation
      }
      return this.pretty('' + this.expressionLine)
    },
    resultDisplay: function () {
      if (this.operationsCount === 0 || (this.operationsCount < 2 && this.curNumberStr === '0')) {
        return ''
      }
      return this.pretty('' + this.result)
    },
    result: function () {
      if (this.curOperation.length === 0) {
        return this.curNumber
      }
      if (this.curOperation === '+') {
        return this.prevResult + this.curNumber
      }
      if (this.curOperation === '-') {
        return this.prevResult - this.curNumber
      }
      if (this.curOperation === '*') {
        return this.prevResult * this.curNumber
      }
      if (this.curOperation === '/' && this.curNumber !== 0) {
        return this.prevResult / this.curNumber
      }
      return this.prevResult
    }
  },
  methods: {
    pretty: function (str) {
      return str.replace(/-/g, '−').replace(/\./g, ',').replace(/\//g, '÷').replace(/\*/g, '×')
    },
    number: function (value) {
      if (this.curNumberStr === '0') {
        this.curNumberStr = ''
      }
      this.curNumberStr = this.curNumberStr + value
    },
    sign: function () {
      const n = this.curNumber
      if (n < 0) {
        this.curNumberStr = this.curNumberStr.slice(1)
      } else if (n > 0) {
        this.curNumberStr = '-' + this.curNumberStr
      }
    },
    period: function () {
      if (this.curNumberStr.indexOf('.') !== -1) {
        return
      }
      this.curNumberStr = this.curNumberStr + '.'
    },
    backspace: function () {
      this.curNumberStr = this.curNumberStr.slice(0, -1)
    },
    clearAll: function () {
      this.curNumberStr = '0'
      this.curOperation = ''
      this.operationsCount = 0
      this.prevResult = 0
      this.prevExpressionLine = ''
    },
    random: function () {
      this.curNumberStr = '' + Math.random().toFixed(2)
    },
    operation: function (value) {
      if (this.curNumberStr === '0') {
        return
      }
      if (this.curNumberStr[this.curNumberStr.length - 1] === '.') {
        this.curNumberStr = this.curNumberStr.slice(0, -1)
      }
      this.prevResult = this.result
      this.prevExpressionLine = this.expressionLine
      this.curNumberStr = '0'
      this.curOperation = value
      this.operationsCount += 1
    },
    equal: function () {
      const curNumber = '' + this.result
      this.clearAll()
      this.curNumberStr = curNumber
    }
  }
}
</script>

<style scoped>
.calculator {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
}

.line {
  flex: 1 1 0;
  display: flex;
  flex-flow: row nowrap;
}

.operation {
  background: #999;
}

.number {
  background: #eee;
}
button {
  flex: 1 1 0;
  font-size: 2em;
}

.display {
  justify-content: flex-end;
  align-items: center;
  background: #000;
  color: #fff;
}
.expression {
  flex: 0 1 auto;
  font-size: 3em;
  margin-right: 0.5em;
  vertical-align: middle;
}
.result {
  flex: 0 1 auto;
  font-size: 3em;
  margin-right: 0.5em;
}

/*iphone 5*/
@media only screen and (max-device-width: 568px){
  button {
    font-size: 1.4em;
  }
}
</style>
