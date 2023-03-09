const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const cityInput = document.querySelector("#city");
const createButton = document.querySelector("#create");
const usersSection = document.querySelector("#users-section");
const searchInput = document.querySelector("#search");


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

searchInput.oninput =  (event) => {
    //більш сучасна реалізація пошук: у фільтер передаємо деструкторизаваного юзера і змінні закидуємо у масив,
    //та відразу через метод some передаємо елемет і у ньому перевіряємо строку
    const usersToRender = users.filter(
        ({name, age, city}) => [name, age.toString(), city].some((element) =>
        element.includes(event.target.value))
    );
    renderUsers(usersToRender);
};




