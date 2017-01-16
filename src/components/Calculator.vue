<template>
  <div class="calculator">
    <div class="line display">
      <div class="expression">{{ line }}</div>
    </div>
    <div class="line display">
      <div class="result">{{ result }}</div>
    </div>
    <div class="line">
      <button class="operation">CA</button>
      <button class="operation">&larr;</button>
      <button class="operation">&forall;</button>
      <button class="operation">&divide;</button>
    </div>
    <div class="line">
      <button class="number">7</button>
      <button class="number">8</button>
      <button class="number">9</button>
      <button class="operation">&times;</button>
    </div>
    <div class="line">
      <button class="number">4</button>
      <button class="number">5</button>
      <button class="number">6</button>
      <button class="operation">&minus;</button>
    </div>
    <div class="line">
      <button class="number">1</button>
      <button class="number">2</button>
      <button class="number">3</button>
      <button class="operation">+</button>
    </div>
    <div class="line">
      <button class="number">,</button>
      <button class="number">0</button>
      <button class="number">&plusmn;</button>
      <button class="operation">=</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calculator',
  data () {
    return {
      result: '5',
      line: '23 - 3 / 4'
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
