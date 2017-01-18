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

  it('sets the correct default data', () => {
    expect(Calculator.data).to.be.a('function')
    const defaultData = Calculator.data()
    expect(defaultData.curNumberStr).to.equal('0')
    expect(defaultData.curOperation).to.equal('')
    expect(defaultData.operationsCount).to.equal(0)
    expect(defaultData.prevResult).to.equal(0)
    expect(defaultData.prevExpressionLine).to.equal('')
  })

  it('has the pretty function', () => {
    const calc = new Vue(Calculator)
    expect(calc.pretty).to.be.a('function')
  })

  it('should correctly pretty print', () => {
    const calc = new Vue(Calculator)
    expect(calc.pretty('1+2')).to.equal('1+2')
    expect(calc.pretty('1-2')).to.equal('1−2')
    expect(calc.pretty('1*2')).to.equal('1×2')
    expect(calc.pretty('1/2')).to.equal('1÷2')
    expect(calc.pretty('1.2')).to.equal('1,2')

    expect(calc.pretty('1+2+3')).to.equal('1+2+3')
    expect(calc.pretty('1-2-2')).to.equal('1−2−2')
    expect(calc.pretty('1*2*2')).to.equal('1×2×2')
    expect(calc.pretty('1/2/2')).to.equal('1÷2÷2')
    expect(calc.pretty('1.2-2.1')).to.equal('1,2−2,1')

    expect(calc.pretty('1.2 + 2.1 - 1 / 2 * 3')).to.equal('1,2 + 2,1 − 1 ÷ 2 × 3')
  })

})
