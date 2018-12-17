// class Draggable {
//   constructor () {
//     this.dragElements = this.shadowRoot.querySelectorAll('.draggable-area')
//   }

//   draggableWindows (e) {
//     let isMouseDown = false
//     let mouseOffset = { x: 0, y: 0 }
//     // let dragElements = this.shadowRoot.querySelectorAll('.draggable-area')

//     for (let i = 0; i < this.dragElements.length; i++) {
//       let element = this.dragElements[i]
//       element.addEventListener('mousedown', (e) => {
//         isMouseDown = true
//         mouseOffset = { x: element.offsetLeft - e.clientX, y: element.offsetTop - e.clientY }
//       })
//       element.addEventListener('mousemove', (e) => {
//         e.preventDefault()
//         if (isMouseDown) {
//           element.style.left = e.clientX + mouseOffset.x + 'px'
//           element.style.top = e.clientY + mouseOffset.y + 'px'
//           element.classList.add('active')
//         }
//       })
//       element.addEventListener('mouseup', (e) => {
//         e.preventDefault()
//         isMouseDown = false
//         element.classList.remove('active')
//       })
//     }
//   }
// }

// export {
//   Draggable
// }
