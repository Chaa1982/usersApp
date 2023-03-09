const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const cityInput = document.querySelector("#city");
const createButton = document.querySelector("#create");
const usersSection = document.querySelector("#users-section");
const searchInput = document.querySelector("#search");
const searchButton = document.querySelector("#search-button");
const cancelSearchButton = document.querySelector("#cancel-search-button");

let users = [
  //об'єкти добавлено у тесстовору режиміі, потім слід прибрати!!!!!!!!!!!!
  { name: "Max", age: 20, city: "Lviv" },
  { name: "Olga", age: 20, city: "Kharkiv" },
  { name: "Mila", age: 40, city: "Odesa" },
];

renderUsers(users); //визвав у тестовому режимі, потім слід прибрати!!!!!!!!!!!!

const deleteUser = (indexOfUser) => {
  users = users.filter((el, i) => i !== indexOfUser);
  renderUsers(users);
};

function renderUsers(usersToRender) {
  usersSection.innerHTML = "";
  usersContent = usersToRender.map(
    (user) => `<div class="user-card">
        <p>${user.name}</p>
        <p>${user.age}</p>
        <p>${user.city}</p>
        <button class="delete-user-button">Delete</button>        
    </div>`
  );

  usersContent.forEach((userLayout) => {
    usersSection.innerHTML += userLayout;
  });

  const deleteButtons = [...document.querySelectorAll(".delete-user-button")];
  deleteButtons.forEach((button, i) => {
    button.onclick = () => deleteUser(i);
  });
}

createButton.onclick = () => {
  const name = nameInput.value;
  const age = +ageInput.value;
  const city = cityInput.value;
  console.log(name, age, city);

  const user = { name, age, city };
  users.push(user);

  nameInput.value = "";
  ageInput.value = "";
  cityInput.value = "";

  renderUsers(users);
};

searchButton.onclick = () => {
  const usersToRender = users.filter((user) =>
    user.name.includes(searchInput.value)
  );
  renderUsers(usersToRender);
};

cancelSearchButton.onclick = () => {
    searchInput.value = "";
    renderUsers(users);
  };


//27.23
