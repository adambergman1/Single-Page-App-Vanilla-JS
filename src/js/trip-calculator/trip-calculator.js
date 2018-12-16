import { tripTemplate } from './template.js'

class TripCalculator extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(tripTemplate.content.cloneNode(true))

    this.miles = this.shadowRoot.querySelector('form input[id="miles"]')
    this.consumption = this.shadowRoot.querySelector('input[id="consumption"]')
    this.gasPrice = this.shadowRoot.querySelector('input[id="gas-price"]')
  }

  connectedCallback () {
    this.test()
    this.calculateCost()
  }

  test () {
    console.log(this.miles.value)
  }

  calculateCost () {
    this.miles.value = 15
    this.consumption.value = 0.8
    this.gasPrice.value = 14
    console.log(`Resan kostar ${this.miles.value * this.consumption.value * this.gasPrice.value} kronor.`)
  }
}

window.customElements.define('trip-calculator', TripCalculator)

export {
  TripCalculator
}
