const monsterURL = 'http://localhost:3000/monsters'
let limit = 4;
let page = 2;

document.addEventListener('DOMContentLoaded', () => {
    renderMonsters()
    createForm()

    const form = document.querySelector('form')
    form.addEventListener('submit', event => {
        event.preventDefault()
        const monsterName = document.getElementById('name-input').value
        const monsterAge = document.getElementById('age-input').value
        const monsterDescription = document.getElementById('description-input').value
        document.getElementById('name-input').value = ''
        document.getElementById('age-input').value = ''
        document.getElementById('description-input').value = ''
        submitNewMonster(monsterName, monsterAge, monsterDescription)
    })

    const backButton = document.getElementById('back')
    backButton.textContent = 'Back'
    const forwardButton = document.getElementById('forward')
    forwardButton.textContent = "Forward"

    backButton.addEventListener('click', () => {
        if (page === 1) {
            alert("You're already on the first page!")
        } else {
            page--
            const card = document.getElementById('monster-container')
            card.innerHTML = ''
            renderMonsters()
        }
    })

    forwardButton.addEventListener('click', () => {
        page++
        const card = document.getElementById('monster-container')
        card.innerHTML = ''
        renderMonsters()
    })


})


function renderMonster(monster) {
    const monsterContainer = document.getElementById('monster-container')


    const card = document.createElement('div')
    card.className = 'card'
    const h2 = document.createElement('h2')
    h2.textContent = `Name: ${monster.name}`
    const h4 = document.createElement('h4')
    h4.textContent = `Age: ${monster.age}`
    const p = document.createElement('p')
    p.textContent = monster.description
    card.appendChild(h2)
    card.appendChild(h4)
    card.appendChild(p)
    monsterContainer.appendChild(card)
}

function renderMonsters() {

    fetch(`${monsterURL}/?_limit=${limit}&_page=${page}`)
        .then(resp => resp.json())
        .then(data => data.forEach(element => renderMonster(element)))
}

function createForm() {
    const form = document.createElement('form')
    const nameText = document.createElement('h4')
    const nameInput = document.createElement('input')
    const ageText = document.createElement('h4')
    const ageInput = document.createElement('input')
    const descriptionText = document.createElement('h4')
    const descriptionInput = document.createElement('input')
    const br = document.createElement('br')
    const submitButton = document.createElement('input')

    nameText.textContent = 'Name:'
    nameInput.type = 'text'
    nameInput.id = 'name-input'
    ageText.textContent = 'Age:'
    ageInput.type = 'text'
    ageInput.id = 'age-input'
    descriptionText.textContent = 'Description:'
    descriptionInput.type = 'text'
    descriptionInput.id = 'description-input'
    submitButton.type = 'submit'

    form.appendChild(nameText)
    form.appendChild(nameInput)
    form.appendChild(ageText)
    form.appendChild(ageInput)
    form.appendChild(descriptionText)
    form.appendChild(descriptionInput)
    form.appendChild(br)
    form.appendChild(submitButton)

    document.getElementById('create-monster').appendChild(form)


}

function submitNewMonster(name, age, description) {
    const monsterObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: name,
            age: age,
            description: description
        })
    }

    fetch(monsterURL, monsterObj)
        .then(resp => resp.json())
        .then(data => renderMonster(data))

}