import './trip-calculator/trip-calculator.js'

// Open Trip Calculator On click
let startTripCalculator = document.querySelector('#startTripCalculator')
startTripCalculator.addEventListener('click', (e) => {
  window.localStorage.clear()
  let template = document.createElement('trip-calculator')
  let body = document.querySelector('body')
  body.appendChild(template)
})
