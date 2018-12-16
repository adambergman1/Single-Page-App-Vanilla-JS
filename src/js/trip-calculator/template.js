const tripTemplate = document.createElement('template')
tripTemplate.innerHTML = /* html */ `

<div class="trip-calculator">
<link rel="stylesheet" href="/css/trip-calculator.css">
<form>
    <label for="miles">Antal mil</label>
    <input type="text" id="miles" name="miles" placeholder="Ange antal mil" required>

    <label for="consumption">Förbrukning</label>
    <input type="text" id="consumption" name="consumption" placeholder="Förbrukning per mil" required>

    <label for="gas-price">Bensinpris</label>
    <input type="text" id="gas-price" name="gas-price" placeholder="Ange kostnaden för en liter bensin/diesel" required>

    <input type="submit" value="Skicka">
    </form>
<div class="travel-cost">
</div>
</div>

`

export {
  tripTemplate
}
