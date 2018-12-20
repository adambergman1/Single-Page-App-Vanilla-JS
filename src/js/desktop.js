import './draggable/draggable.js'
import './trip-calculator/trip-calculator.js'
import './memory/Memory.js'

export class Desktop {
  constructor () {
    this.arr = []
    this.Z_INDEX_OFFSET = 20
    this.arr = []
    this.zIndex_offset = 20
    this.openedWindows = document.querySelector('.opened-windows')

    this.startTripCalculator()
    this.startMemory()
    this.checkForClickOnWindow()
  }

  startTripCalculator () {
    const tripBtn = document.querySelector('#tripBtn')
    tripBtn.addEventListener('click', e => {
      window.localStorage.clear()
      let tripTemplate = document.createElement('trip-calculator')
      this.openedWindows.appendChild(tripTemplate)
      this.arr.push(tripTemplate)
      this.updateZIndex()
    })
  }

  startMemory () {
    const memoryBtn = document.querySelector('#memoryBtn')
    memoryBtn.addEventListener('click', e => {
      let memoryTemplate = document.createElement('memory-game')
      this.openedWindows.appendChild(memoryTemplate)
      this.arr.push(memoryTemplate)
      this.updateZIndex()
    })
  }

  checkForClickOnWindow () {
    this.openedWindows.addEventListener('mousedown', e => {
      let index = this.arr.indexOf(e.target)
      let tempApp = this.arr[index]
      this.arr.splice(index, 1)
      this.arr.push(tempApp)
      this.updateZIndex()
    })
  }

  getWindow (dragable) {
    return dragable.shadowRoot.querySelector('drag-able')
      .shadowRoot.querySelector('.window')
  }

  updateZIndex () {
    for (let i = 0; i < this.arr.length; i++) {
      this.getWindow(this.arr[i]).style.zIndex = this.Z_INDEX_OFFSET + i
    }
  }
}
