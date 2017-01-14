<template>
  <div class="calculator">
    <div class="line">
      <button>{{ msg }}</button>
    </div>
    <div class="line">
      <button>{{ msg }}</button>
    </div>
    <div class="line">
      <button>C/CA</button>
      <button>&larr;</button>
      <button>rand</button>
      <button>&divide;</button>
    </div>
    <div class="line">
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>&#10005;</button>
    </div>
    <div class="line">
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>-</button>
    </div>
    <div class="line">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>+</button>
    </div>
    <div class="line">
      <button>,</button>
      <button>0</button>
      <button>&plusmn;</button>
      <button>=</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'calculator',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
.calculator {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: blue;
}

.line {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: green;
}

button {
  background: gray;
}
</style>
