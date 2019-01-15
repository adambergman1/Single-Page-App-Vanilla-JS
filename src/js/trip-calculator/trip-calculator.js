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

  /**
   * Listens to values submitted by the user and then runs several functions to return a result value
   *
   * @memberof TripCalculator
   */
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

  /**
   * Calculates cost of the trip
   *
   * @memberof TripCalculator
   */
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

  /**
   * Checks if there are any values entered with commas and changes it to dots
   *
   * @memberof TripCalculator
   */
  changeCommasToDots () {
    let input = this.shadowRoot.querySelectorAll('form input[type="number"]')
    for (let i = 0; i < input.length; i++) {
      input[i].value = input[i].value.replace(',', '.')
    }
  }
  /**
 * Checks if the "count in wear" option is checked and changes the values of gas price and consumption level automatically to fixed values
 *
 * @memberof TripCalculator
 */
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

  /**
   * Saves the values consumption and gas price entered by user
   *
   * @memberof TripCalculator
   */
  saveToLocalStorage () {
    let obj = {
      'consumption': this.consumption.value,
      'gasPrice': this.gasPrice.value
    }

    window.localStorage.setItem('data', JSON.stringify(obj))
  }

  /**
   * Fetches the saved values in localStorage and enters it in the input fields
   *
   * @memberof TripCalculator
   */
  fetchLocalStorage () {
    let savedObj = JSON.parse(window.localStorage.getItem('data'))

    this.gasPrice.value = savedObj.gasPrice
    this.consumption.value = savedObj.consumption
  }

  /**
   * Removes the div that tells the total trip cost if it has already been called once
   *
   * @memberof TripCalculator
   */
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
