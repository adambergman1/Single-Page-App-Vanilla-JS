const tripTemplate = document.createElement('template')
tripTemplate.innerHTML = /* html */ `

<div class="trip-calculator">
<link rel="stylesheet" href="/css/trip-calculator.css">
<form method="post" action="">
    <label for="miles">Antal mil</label>
    <input type="number" id="miles" name="miles" placeholder="Ange antal mil" required>

    <label for="consumption">Förbrukning</label>
    <input type="number" id="consumption" name="consumption" placeholder="Förbrukning per mil" required>

    <label for="gas-price">Bensinpris</label>
    <input type="number" id="gas-price" name="gas-price" placeholder="Ange kostnaden för en liter bensin/diesel" required>

    <div class="split-cost">
        <label for="reveal-content">Är ni flera som ska dela på notan?</label>
        <input type="checkbox" id="reveal-content" role="button">
       
        <div id="amount-of-persons">
        <input class="persons" type="number" name="persons" id="persons" placeholder="Ange antal personer som ska dela notan" />
        </div>
    </div>

    <input type="submit" value="Skicka" class="btn">
    </form>


<div class="travel-cost">
</div>

</div>

`

export {
  tripTemplate
}
