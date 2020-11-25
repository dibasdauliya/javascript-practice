const addUser = document.getElementById('add-user'),
  double = document.getElementById('double-money'),
  showMillionaires = document.getElementById('show-millionaires'),
  sortByRich = document.getElementById('sort-by-rich'),
  totalWealth = document.getElementById('total-wealth'),
  main = document.getElementById('main')

let data = []

fetchData().catch((err) => console.log(err))
fetchData().catch((err) => console.log(err))
fetchData().catch((err) => console.log(err))

async function fetchData() {
  const res = await fetch('https://randomuser.me/api')
  const resData = await res.json()

  const user = resData.results[0]

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  addData(newUser)
}

function addData(obj) {
  data.push(obj)

  updateDom()
}

function doubleMoney() {
  data = data.map((value) => {
    return { ...value, money: value.money * 2 }
  })

  updateDom()
}

function onlyMillionaires() {
  data = data.filter((user) => user.money > 1000000)
  updateDom()
  console.log('millionaires')
}

function sortPeople() {
  data = data.sort((a, b) => b.money - a.money)
  updateDom()
}

function updateDom(providedData = data) {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`

  providedData.forEach((data) => {
    let div = document.createElement('div')
    div.className = 'person'
    div.innerHTML = `<strong>${data.name}</strong>$${data.money.toLocaleString(
      'en-US'
    )}`
    main.appendChild(div)
  })
}

// Event listener
addUser.addEventListener('click', fetchData)
double.addEventListener('click', doubleMoney)
showMillionaires.addEventListener('click', onlyMillionaires)
sortByRich.addEventListener('click', sortPeople)
