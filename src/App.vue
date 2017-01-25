<template>
  <div id="app">
    <calculator></calculator>
  </div>
</template>

<script>
import Calculator from './components/Calculator'
import {addToHomescreen} from 'add-to-homescreen/src/addtohomescreen.js'
require('add-to-homescreen/style/addtohomescreen.css')
import {attach as attachFastClick} from 'fastclick'

const _ua = window.navigator.userAgent
const _isIDevice = (/iphone|ipod|ipad/i).test(_ua)
const isMobileSafari = _isIDevice && _ua.indexOf('Safari') > -1 && _ua.indexOf('CriOS') < 0
if (isMobileSafari) {
  const isStandalone = 'standalone' in window.navigator && window.navigator.standalone
  if (isStandalone) {
    // enable fastclick
    attachFastClick(document.body)
  } else {
    // enable add to homescreen tip
    addToHomescreen({
      startDelay: 5,
      skipFirstVisit: true,
      icon: false
    })
  }
}

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
a[href], button { touch-action: manipulation; }
button { user-select: none; }
</style>
