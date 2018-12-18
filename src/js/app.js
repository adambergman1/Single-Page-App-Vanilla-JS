import './draggable/draggable.js'
import './trip-calculator/trip-calculator.js'
import './memory/Memory.js'

// Open Trip Calculator On click
let startTripCalculator = document.querySelector('#startTripCalculator')
startTripCalculator.addEventListener('click', (e) => {
  window.localStorage.clear()
  let tripTemplate = document.createElement('trip-calculator')
  let body = document.querySelector('body')
  body.appendChild(tripTemplate)
  // let arr = []
  // arr.push(tripTemplate)
  // setIndex()
})

// Open Memory on click
let memory = document.querySelector('#startMemory')
memory.addEventListener('click', (e) => {
  let memoryTemplate = document.createElement('memory-game')
  let body = document.querySelector('body')
  body.appendChild(memoryTemplate)
})

// function setIndex (arr) {
//   let tripTemplate = document.querySelector('trip-calculator')
//   console.log(tripTemplate)

//   arr.map((app, i) => {
//     app.style.zIndex = i + 20
//   })

//   tripTemplate.addEventListener('click', (e) => {
//     console.log('you clicked!')
//   })
// }
