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
                    <a href="#" id="tripBtn"><img src="/image/tripcalc.jpg"><p><span>Reseräknaren</span></p></a>
                </div>

                <div class="memory">
                    <a href="#" id="memoryBtn"><img src="/image/memory.jpg"><p><span>Memory</span></p></a>
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

      let win = tripTemplate.shadowRoot.querySelector('drag-able')
        .shadowRoot.querySelector('.window')
      let close = win.querySelector('.close-btn')

      close.addEventListener('click', (e) => {
        console.log('Closing:')
        console.log(win)

        console.log('Array before removal:')
        console.log(this.arr)

        this.arr.splice(parent, 1)
        win.parentNode.removeChild(win)

        console.log('Array after removal:')
        console.log(this.arr)
      })
    })
  }

  startMemory () {
    const memoryBtn = this.shadowRoot.querySelector('#memoryBtn')
    memoryBtn.addEventListener('click', e => {
      let memoryTemplate = document.createElement('memory-game')
      this.openedWindows.appendChild(memoryTemplate)
      this.arr.push(memoryTemplate)
      this.updateZIndex()
      this.closeWindow()
    })
  }

  startChat () {
    const chatBtn = this.shadowRoot.querySelector('#chatBtn')
    chatBtn.addEventListener('click', e => {
      const chatTemplate = document.createElement('chat-app')
      this.openedWindows.appendChild(chatTemplate)
      this.arr.push(chatTemplate)
      this.updateZIndex()
      this.closeWindow()
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

  // closeWindow (e) {
  // let target = this.arr.indexOf(e.target)
  // console.log(target)
  // let win = this.arr.shadowRoot.querySelector('drag-able').shadowRoot.querySelector('.window')
  // let closeBtn = win.querySelector('.window-buttons .close-btn')

  // closeBtn.addEventListener('click', (e) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   console.log('Closing:')
  //   console.log(this.arr.indexOf(e.target))

  //   console.log('Array before removal:')
  //   console.log(this.arr)

  //   this.arr.splice(e.target, 1)
  //   win.parentNode.removeChild(win)

  //   console.log('Array after removal:')
  //   console.log(this.arr)

  //   closeBtn.removeEventListener('click', (e))
  // })

  // for (let i = 0; i < this.arr.length; i++) {
  //   let win = this.arr[i].shadowRoot.querySelector('drag-able').shadowRoot.querySelector('.window')
  //   let closeBtn = win.querySelector('.window-buttons .close-btn')

  //   closeBtn.addEventListener('click', (e) => {
  //     e.preventDefault()
  //     console.log('Closing:')
  //     console.log(this.arr[i])

  //     console.log('Array before removal:')
  //     console.log(this.arr)

  //     this.arr.splice(i, 1)
  //     win.parentNode.removeChild(win)

  //     console.log('Array after removal:')
  //     console.log(this.arr)

  //     closeBtn.removeEventListener('click', (e))
  //   })
  // }
  // }
}

window.customElements.define('personal-desktop', Desktop)
