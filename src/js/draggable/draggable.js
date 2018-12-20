const template = document.createElement('template')
template.innerHTML = /* html */ `
<link rel="stylesheet" href="/css/style.css">
<div class="window">
  <div class="window-heading"></div>
  <slot class="main-area"></slot>
</div>
`

class Draggable extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.draggableWindows()
  }

  draggableWindows (e) {
    let windows = this.shadowRoot.querySelectorAll('.window')
    let windowHeading = this.shadowRoot.querySelector('.window-heading')
    windowHeading.textContent = this.dataset.title
    let isMouseDown = false

    let pos1 = 0
    let pos2 = 0
    let pos3 = 0
    let pos4 = 0

    for (let i = 0; i < windows.length; i++) {
      let div = windows[i]

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

  find () {
    let windows = this.shadowRoot.querySelectorAll('.window')

    for (let i = 0; i < windows.length; i++) {
      let div = windows[i]

      window.addEventListener('mousedown', (e) => {
        // console.log(e.target.shadowRoot.firstElementChild.nodeName)
        let dragable = e.target.shadowRoot.querySelector('drag-able')
        let dragableWindow = dragable.shadowRoot.lastElementChild
        console.log(dragableWindow)
        // console.log(e.target.shadowRoot.querySelector('drag-able').shadowRoot.querySelector('window'))
        // if (e.target.shadowRoot.firstElementChild.nodeName === 'DRAG-ABLE') {
        //   console.log('Detta är en DRAG ABLE')
        //   div.parentNode.lastElementChild.style.zIndex = 20
        // }
      })
    }
  }
}

window.customElements.define('drag-able', Draggable)
