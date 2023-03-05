const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const cityInput = document.querySelector("#city");
const createButton = document.querySelector("#create");
const usersSection = document.querySelector("#users-section");

const users = [];

const renderUsers = () => {
    usersSection.innerHTML = "";
    usersContent = users.map((user) => `<div class="user-card">
        <p>${user.name}</p>
        <p>${user.age}</p>
        <p>${user.city}</p>    
    </div>`);

    usersContent.forEach((userLayout) => {
        usersSection.innerHTML += userLayout;
    });
}

createButton.onclick = () => {
    const name = nameInput.value;
    const age = +ageInput.value;
    const city = cityInput.value;
    console.log(name, age, city);

    const user = {name, age, city};
    users.push(user);
    
    nameInput.value = "";
    ageInput.value = "";
    cityInput.value = "";

    renderUsers();
}

//first version