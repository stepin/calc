<template>
  <div id="app">
    <calculator></calculator>
  </div>
</template>

<script>
import Calculator from './components/Calculator'

export default {
  name: 'app',
  components: {
    Calculator
  }
}
</script>

<style>
html, body, #app { height: 100%; }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
