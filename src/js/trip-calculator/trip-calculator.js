import { tripTemplate } from './template.js'

class TripCalculator extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(tripTemplate.content.cloneNode(true))

    this.miles = this.shadowRoot.querySelector('form input[id="miles"]')
    this.consumption = this.shadowRoot.querySelector('form input[id="consumption"]')
    this.gasPrice = this.shadowRoot.querySelector('form input[id="gas-price"]')
    this.amountOfPersons = this.shadowRoot.querySelector('#amount-of-persons input')

    this.submitBtn = this.shadowRoot.querySelector('form input[type="submit"]')
  }

  connectedCallback () {
    this.checkForValues()
    this.countInWear()
  }

  checkForValues () {
    this.submitBtn.addEventListener('click', (e) => {
      e.preventDefault()
      if (this.miles.value && this.consumption.value && this.gasPrice.value) {
        this.clearTravelCostArea()
        this.changeCommasToDots()
        this.calculateCost()
      }
    })

    let revealContent = this.shadowRoot.querySelector('#reveal-content')
    revealContent.addEventListener('change', (e) => {
      if (!e.target.checked) {
        this.amountOfPersons.value = ''
      }
    })
  }

  calculateCost () {
    let travelCost = this.shadowRoot.querySelector('.travel-cost')
    let p = document.createElement('p')
    travelCost.appendChild(p)

    let cost = this.miles.value * this.consumption.value * this.gasPrice.value

    if (!this.amountOfPersons.value || this.amountOfPersons.value <= '1') {
      p.textContent = `Resan kostar ${Math.round(cost)} kronor.`
    } else {
      cost = cost / this.amountOfPersons.value
      p.textContent = `Resan kostar ${Math.round(cost)} kronor per person.`
    }
  }

  changeCommasToDots () {
    let input = this.shadowRoot.querySelectorAll('form input[type="number"]')
    for (let i = 0; i < input.length; i++) {
      input[i].value = input[i].value.replace(',', '.')
    }
  }

  countInWear () {
    let countWear = this.shadowRoot.querySelector('form input[id="count-in-wear"]')
    countWear.addEventListener('change', (e) => {
      e.preventDefault()
      if (e.target.checked) {
        this.saveToLocalStorage()
        this.gasPrice.value = 18.5
        this.consumption.value = 1
        this.gasPrice.classList.toggle('readonly')
        this.consumption.classList.toggle('readonly')
      } else {
        this.fetchLocalStorage()
        this.gasPrice.classList.toggle('readonly')
        this.consumption.classList.toggle('readonly')
      }
    })
  }

  saveToLocalStorage () {
    let obj = {
      'consumption': this.consumption.value,
      'gasPrice': this.gasPrice.value
    }

    window.localStorage.setItem('data', JSON.stringify(obj))
  }

  fetchLocalStorage () {
    let savedObj = JSON.parse(window.localStorage.getItem('data'))

    this.gasPrice.value = savedObj.gasPrice
    this.consumption.value = savedObj.consumption
  }

  clearTravelCostArea () {
    let travelCostDiv = this.shadowRoot.querySelector('.travel-cost')
    if (travelCostDiv) {
      while (travelCostDiv.hasChildNodes()) {
        travelCostDiv.removeChild(travelCostDiv.lastChild)
      }
    }
  }
}

window.customElements.define('trip-calculator', TripCalculator)

export {
  TripCalculator
}
