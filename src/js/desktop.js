import './draggable/draggable.js'
import './trip-calculator/trip-calculator.js'
import './memory/Memory.js'
import './chat/chat.js'

const template = document.createElement('template')
template.innerHTML = /* html */ `
<link rel="stylesheet" href="/css/style.css">
<div class="desktop">
        <div class="opened-windows"></div>
            <div class="dock">
                <div class="trip">
                    <a href="#" id="tripBtn"><img src="/image/trip-calculator.png"><p><span>Reseräknaren</span></p></a>
                </div>

                <div class="memory">
                    <a href="#" id="memoryBtn"><img src="/image/memory.png"><p><span>Memory</span></p></a>
                </div>

                <div class="chat">
                <a href="#" id="chatBtn"><img src="/image/chat.png"><p><span>Chatt</span></p></a>
                </div>
            </div>
        </div>
`

export class Desktop extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.arr = []
    this.Z_INDEX = 20
    this.arr = []
    this.openedWindows = this.shadowRoot.querySelector('.opened-windows')
  }

  connectedCallback () {
    this.startTripCalculator()
    this.startMemory()
    this.startChat()
    this.checkForClickOnWindow()
  }

  startTripCalculator () {
    const tripBtn = this.shadowRoot.querySelector('#tripBtn')
    tripBtn.addEventListener('click', e => {
      window.localStorage.clear()
      let tripTemplate = document.createElement('trip-calculator')
      this.openedWindows.appendChild(tripTemplate)
      this.arr.push(tripTemplate)
      this.updateZIndex()
      this.closeWindow(e)
    })
  }

  startMemory () {
    const memoryBtn = this.shadowRoot.querySelector('#memoryBtn')
    memoryBtn.addEventListener('click', e => {
      let memoryTemplate = document.createElement('memory-game')
      this.openedWindows.appendChild(memoryTemplate)
      this.arr.push(memoryTemplate)
      this.updateZIndex()
      this.closeWindow(e)
    })
  }

  startChat () {
    const chatBtn = this.shadowRoot.querySelector('#chatBtn')
    chatBtn.addEventListener('click', e => {
      const chatTemplate = document.createElement('chat-app')
      this.openedWindows.appendChild(chatTemplate)
      this.arr.push(chatTemplate)
      this.updateZIndex()
      this.closeWindow(e)
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
      this.getWindow(this.arr[i]).style.zIndex = this.Z_INDEX + i
    }
  }

  closeWindow (e) {
    let win = this.arr[this.arr.length - 1].shadowRoot.querySelector('drag-able').shadowRoot.querySelector('.window')
    let closeBtn = win.querySelector('.window-buttons .close-btn')

    closeBtn.addEventListener('click', (e) => {
      win.parentNode.removeChild(win)
      this.arr.pop()
    })
  }
}

window.customElements.define('personal-desktop', Desktop)
