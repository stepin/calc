import Vue from 'vue'
import Calculator from 'src/components/Calculator'

describe('Calculator.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Calculator)
    })
    expect(vm.$el.querySelector('.calculator .btnCA').textContent)
      .to.equal('CA')
  })
})
