import { tripTemplate } from './template.js'

class TripCalculator extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(tripTemplate.content.cloneNode(true))
    this.miles = 0
    this.consumption = 0
    this.gasPrice = 0
    this.travelTime = 0
  }

  connectedCallback () {
    this.test()
  }

  test () {
    console.log('hallå')
  }
}

window.customElements.define('trip-calculator', TripCalculator)

export {
  TripCalculator
}
