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
    this.draggableWindows()
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

  draggableWindows (e) {
    let divs = this.shadowRoot.querySelectorAll('.draggable-area')
    let windowHeading = this.shadowRoot.querySelector('.title-heading')
    let isMouseDown = false

    let pos1 = 0
    let pos2 = 0
    let pos3 = 0
    let pos4 = 0

    for (let i = 0; i < divs.length; i++) {
      let div = divs[i]

      windowHeading.addEventListener('mousedown', (e) => {
        isMouseDown = true
        pos3 = e.clientX
        pos4 = e.clientY
      })

      document.addEventListener('mousemove', (e) => {
        e.preventDefault()
        if (isMouseDown) {
          pos1 = pos3 - e.clientX
          pos2 = pos4 - e.clientY
          pos3 = e.clientX
          pos4 = e.clientY
          div.style.top = (div.offsetTop - pos2) + 'px'
          div.style.left = (div.offsetLeft - pos1) + 'px'
          div.classList.add('active')
        }
      })

      document.addEventListener('mouseup', (e) => {
        e.preventDefault()
        isMouseDown = false
        div.classList.remove('active')
      })
    }
  }
}

window.customElements.define('trip-calculator', TripCalculator)

export {
  TripCalculator
}
