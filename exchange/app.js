const currencyOne = document.getElementById('currency-one'),
  rateOne = document.getElementById('rate-one'),
  currencyTwo = document.getElementById('currency-two'),
  rateTwo = document.getElementById('rate-two'),
  swapBtn = document.getElementById('swap'),
  rateText = document.getElementById('rate-text')

populateValue()
function populateValue() {
  const currencyOneValue = currencyOne.value
  const currencyTwoValue = currencyTwo.value

  let rateOneValue = rateOne.value

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOneValue}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates
      rateTwo.value = (rateOneValue * rate[currencyTwoValue]).toFixed(2)

      rateText.innerHTML = `1 ${currencyOneValue} = ${rate[currencyTwoValue]} ${currencyTwoValue}`
    })
}

//Event listeners
currencyOne.addEventListener('change', populateValue)
currencyTwo.addEventListener('change', populateValue)

rateOne.addEventListener('input', populateValue)
rateTwo.addEventListener('input', populateValue)
swapBtn.addEventListener('click', swap)

function swap() {
  const temp = currencyOne.value
  currencyOne.value = currencyTwo.value
  currencyTwo.value = temp
  populateValue()
}
