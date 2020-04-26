const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
};

function doubleMoney() {
    data = data.map(person => {
        return {
            ...person, 
            money: person.money * 2
        }
    })

    updateDOM();
};

function addData(obj) {
    data.push(obj);

    updateDOM();
};

function updateDOM(providedData = data) {
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

    providedData.forEach(person => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`;
        main.appendChild(element);
    })
};

function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
};

function showMillionaires() {
    data = data.filter(person => person.money > 1000000);

    updateDOM();
};

function calculateWealth() {
    const wealth = data.reduce((acc, person) => (acc + person.money), 0);

    if (document.getElementById('wealthEl')) {
        document.getElementById('wealthEl').remove();
    };

    const wealthEl = document.createElement('div');
    wealthEl.setAttribute('id', 'wealthEl');
    wealthEl.innerHTML = `<h3>Total Wealth <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}


function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);