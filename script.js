const addUser = document.getElementById('add-user')
const double = document.getElementById('double')
const showMillionaires = document.getElementById('show-millionaires')
const sortRichest = document.getElementById('sort')
const calculate = document.getElementById('calculate-wealth')
const main = document.getElementById('main')
let data = []
addUser.addEventListener('click', () => {
  getRandomUser()
})
sortRichest.addEventListener('click', () => {
  data.sort(function (a, b) {
    return b.money - a.money
  })
  updateDom()
})
showMillionaires.addEventListener('click', () => {
  data = data.filter((user) => user.money > 1000000)
  updateDom()
})
calculate.addEventListener('click', () => {
  const wealth = data.reduce((acc, user) => {
    return acc + user.money
  }, 0)
  const showWealth = document.createElement('div')
  showWealth.innerHTML = `<h3><strong>Total Wealth ${formatCurrency(
    wealth
  )}</strong></h3>`
  main.appendChild(showWealth)
  console.log(wealth)
})
double.addEventListener('click', () => {
  data = data.map((person) => {
    return { ...person, money: person.money * 2 }
  })
  updateDom()
})
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()
  const user = data.results[0]
  console.log(user)

  const newUser = {
    name: `${user.name.first} ${user.name.lastname}`,
    money: Math.floor(Math.random() * 1000000),
  }
  addData(newUser)
}
function addData(obj) {
  console.log(data)

  data.push(obj)
  updateDom()
}
function updateDom(providedData = data) {
  main.innerHTML = '<h2><strong>People</strong>  Wealth</h2>'
  providedData.forEach((item) => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${item.name}</strong> ${formatCurrency(
      item.money
    )}`
    main.appendChild(element)
  })
}
function formatCurrency(money) {
  return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
