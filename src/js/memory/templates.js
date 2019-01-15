const gameTemplate = document.createElement('template')
gameTemplate.innerHTML = /* html */ `
<drag-able data-title="Memory">
<link rel="stylesheet" href="./css/memory.css">

<img src="./image/memory.png" class="app-icon">

<div class="memory" id="memory">
    <h1>Memory Game</h1>
<div class="choose-layout">
  <div class="select-amount">
    <select class="memory-options">
      <option value="4" selected>2 x 2</option>
      <option value="8">4 x 2</option>
      <option value="16">4 x 4</option>
    </select>
  </div>
    <button type="submit" class="start">Change layout</button>
</div>
<template>
  <div class="memory-area">
    <a href="#"><img src="./image/memory/0.png" alt="A memory brick" class="memory-img" /></a>
  </div>
</template>
</div>
</drag-able>
`

const wonTemplate = document.createElement('template')
wonTemplate.innerHTML = /* html */ `
<div class="you-won">
<link rel="stylesheet" href="./css/memory.css">

</div>
`

export {
  gameTemplate, wonTemplate
}
