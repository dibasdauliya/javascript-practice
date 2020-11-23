const seatContainer = document.querySelector('.seat-container'),
  count = document.querySelector('.count'),
  select = document.querySelector('select'),
  money = document.querySelector('.money'),
  seats = document.querySelectorAll('.row .seat:not(.occupied)')

let moneyValue = +select.value

populateUI()

// save select index and value
function saveMovieIndexToLS(movieIndex, value) {
  localStorage.setItem('movieIndex', movieIndex)
  localStorage.setItem('money', value)
}

function updateCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')

  const selectedSeatsCount = selectedSeats.length
  count.innerText = selectedSeatsCount
  money.innerText = selectedSeatsCount * moneyValue

  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat))
  localStorage.setItem('seatIndex', JSON.stringify(seatIndex))
}

function populateUI() {
  const seatIndex = JSON.parse(localStorage.getItem('seatIndex'))

  if (seatIndex !== null) {
    seats.forEach((seat, index) => {
      if (seatIndex.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }

  const movieIndex = localStorage.getItem('movieIndex')
  if (movieIndex !== null) {
    document.getElementById('movie').selectedIndex = movieIndex
  }

  const moneyFromLS = localStorage.getItem('money')
  if (moneyFromLS !== null) {
    moneyValue = moneyFromLS
  }
}

seatContainer.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected')
    updateCount()
  }
})

document.getElementById('movie').addEventListener('change', (e) => {
  moneyValue = +e.target.value

  saveMovieIndexToLS(e.target.selectedIndex, e.target.value)

  updateCount()
})

updateCount()
