import { gameTemplate, wonTemplate } from './templates.js'

class MemoryGame extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(gameTemplate.content.cloneNode(true))
    this.tiles = []
    this.rows = 2
    this.cols = 2
    this.firstTurn = ''
    this.secondTurn = ''
    this.lastTile = ''
    this.tries = 0
    this.pairs = 0
    this.memoryDiv = this.shadowRoot.querySelector('.memory')
    this.btn = this.shadowRoot.querySelector('.start')
  }

  connectedCallback () {
    this.getPicturesInArray()
    this.generateMemory()
    this.checkForLayoutChange()
  }

  changeLayout () {
    let memoryOptions = this.shadowRoot.querySelector('.memory-options')
    let selected = memoryOptions.options[memoryOptions.selectedIndex].value

    if (selected === '4') {
      this.rows = 2
      this.cols = 2
    } else if (selected === '8') {
      this.rows = 2
      this.cols = 4
    } else {
      this.rows = 4
      this.cols = 4
    }
  }

  checkForLayoutChange () {
    let btn = this.shadowRoot.querySelector('.start')

    btn.addEventListener('click', (e) => {
      this.clearArea()
      this.changeLayout()
      this.getPicturesInArray()
      this.generateMemory()
      this.btn.textContent = 'Change layout'
    })
  }

  generateMemory () {
    let template = this.shadowRoot.querySelectorAll('.memory template')[0].content.firstElementChild
    let div = document.importNode(template, false)

    this.tiles.forEach((tile, index) => {
      let a = document.importNode(template.firstElementChild, true)
      a.firstElementChild.setAttribute('data-bricknumber', index)
      div.appendChild(a)

      if ((index + 1) % this.cols === 0) {
        div.appendChild(document.createElement('br'))
      }
    })

    div.addEventListener('click', (event) => {
      event.preventDefault()
      let img = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
      let index = parseInt(img.getAttribute('data-bricknumber'))
      this.turnBrick(this.tiles[index], index, img)
    })
    this.memoryDiv.appendChild(div)
  }

  getPicturesInArray () {
    for (let i = 1; i <= (this.rows * this.cols) / 2; i++) {
      this.tiles.push(i)
      this.tiles.push(i)
    }

    for (let i = 0; i < this.tiles.length; i++) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = this.tiles[i]
      this.tiles[i] = this.tiles[j]
      this.tiles[j] = temp
    }
  }

  turnBrick (tile, index, img) {
    if (this.secondTurn) { return }
    img.src = 'image/memory/' + tile + '.png'

    if (!this.firstTurn) {
      this.firstTurn = img
      this.lastTile = tile
    } else {
      // Second brick is clicked
      if (img === this.firstTurn) { return }
      this.tries += 1
      this.secondTurn = img

      if (tile === this.lastTile) {
        // Found a pair
        this.pairs += 1

        if (this.pairs === (this.cols * this.rows) / 2) {
          this.win()
        }

        setTimeout(() => {
          this.firstTurn.parentNode.classList.add('solved')
          this.secondTurn.parentNode.classList.add('solved')

          this.firstTurn = null
          this.secondTurn = null
        }, 100)
      } else {
        setTimeout(() => {
          this.firstTurn.src = 'image/memory/0.png'
          this.secondTurn.src = 'image/memory/0.png'

          this.firstTurn = null
          this.secondTurn = null
        }, 300)
      }
    }
  }

  win () {
    this.memoryDiv.appendChild(wonTemplate.content.cloneNode(true))
    let wonTemp = this.shadowRoot.querySelector('.you-won')
    let p = document.createElement('p')
    p.textContent = `You won on ${this.tries} number of tries!`
    wonTemp.appendChild(p)

    let btn = this.shadowRoot.querySelector('.start')
    btn.textContent = 'Start a new game'
  }

  clearArea () {
    let memoryArea = this.shadowRoot.querySelector('.memory-area')
    let wonTemp = this.shadowRoot.querySelector('.you-won')

    if (memoryArea) {
      while (memoryArea.hasChildNodes()) {
        memoryArea.removeChild(memoryArea.lastChild)
      }
      memoryArea.parentNode.removeChild(memoryArea)
    }

    if (wonTemp) {
      while (wonTemp.hasChildNodes()) {
        wonTemp.removeChild(wonTemp.lastChild)
      }
      wonTemp.parentNode.removeChild(wonTemp)
    }

    this.tiles = []
    this.firstTurn = ''
    this.secondTurn = ''
    this.lastTile = ''
    this.tries = 0
    this.pairs = 0
  }
}

window.customElements.define('memory-game', MemoryGame)

export {
  MemoryGame
}
