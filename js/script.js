const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const cityInput = document.querySelector("#city");
const createButton = document.querySelector("#create");
const usersSection = document.querySelector("#users-section");
const searchInput = document.querySelector("#search");
const sortByName = document.querySelector("#sort-by-name");
const sortByAge = document.querySelector("#sort-by-age");
const paginationSection = document.querySelector("#pagination");

let users = [
  //об'єкти добавлено у тесстовору режиміі, потім слід прибрати!!!!!!!!!!!!
  { name: "Max", age: 50, city: "Lviv" },
  { name: "Olga", age: 20, city: "Kharkiv" },
  { name: "Alla", age: 10, city: "Odesa" },
  { name: "Artur", age: 45, city: "Riga" },
  { name: "Olga", age: 20, city: "Kharkiv" },
  { name: "Max", age: 50, city: "Lviv" },
  { name: "Olga", age: 20, city: "Kharkiv" },
  { name: "Max", age: 50, city: "Lviv" },
  { name: "Olga", age: 20, city: "Kharkiv" },
  { name: "Alla", age: 10, city: "Odesa" },
  { name: "Bohdan", age: 17, city: "Luck" },
  { name: "Oleksandr", age: 15, city: "Kriviy rig" },
  { name: "Denis", age: 31, city: "Krapivnitskiy" },
];

let changingUser = undefined; //змінна для коримтувача, який змінюємо
let paginationpageNumber = 0;

renderUsers(); //визвав у тестовому режимі, потім слід прибрати!!!!!!!!!!!!
renderPagination(users.length);

const deleteUser = (indexOfUser) => {
  users = users.filter((el, i) => i !== indexOfUser);
  renderUsers();
};

function editUser(indexOfUser) {
  changingUser = { data: users[indexOfUser], index: indexOfUser };

  createButton.textContent = "Save changes";

  nameInput.value = changingUser.data.name;
  ageInput.value = changingUser.data.age;
  cityInput.value = changingUser.data.city;
}

function renderPagination(usersQuontity) {
  paginationSection.innerHTML = "";
  for (let i = 0; i < usersQuontity / 3; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = "pagination-btn";
    button.onclick = () => {
      paginationpageNumber = i;
      renderUsers();
    };
    paginationSection.appendChild(button);
  }
};

const sorting = {
  names: () => {
    const usersCopy = [...users];
    usersCopy.sort((user1, user2) => user1.name.localeCompare(user2.name));
    renderUsers(usersCopy);
  },
  ages: () => {
    const usersCopy = [...users];
    usersCopy.sort((user1, user2) => user1.age - user2.age);
    renderUsers(usersCopy);
  },
};

function renderUsers(usersToRender = addInnerArr(users, 3)[paginationpageNumber]) {
  renderPagination(users.length)
  usersSection.innerHTML = "";

  usersContent = usersToRender.map(
    (user) => `<div class="user-card">
        <p>${user.name}</p>
        <p>${user.age}</p>
        <p>${user.city}</p>
        <button class="delete-user-button">Delete</button>              
        <button class="edit-user-button">Edit</button>        
    </div>`
  );

  usersContent.forEach((userLayout) => {
    usersSection.innerHTML += userLayout;
  });

  const deleteButtons = [...document.querySelectorAll(".delete-user-button")];
  deleteButtons.forEach((button, i) => {
    button.onclick = () => deleteUser(i);
  });

  const editButton = [...document.querySelectorAll(".edit-user-button")];
  editButton.forEach((button, i) => {
    button.onclick = () => editUser(i);
  });
}

createButton.onclick = () => {
  const name = nameInput.value;
  const age = +ageInput.value;
  const city = cityInput.value;
  if (!name || !age || !city) {
    return alert("User empty");
  } else {
    if (changingUser) {
      users[changingUser.index] = {
        name: name,
        age: age,
        city: city,
      };

      changingUser = undefined;
      createButton.textContent = "Create User";
    } else {
      const user = { name, age, city };
      users.push(user);
    }

    nameInput.value = "";
    ageInput.value = "";
    cityInput.value = "";

    renderUsers();
  }
};

searchInput.oninput = (event) => {
  if(!event.target.value) return renderUsers();
  //більш сучасна реалізація пошук: у фільтeр передаємо деструкторизаваного юзера і змінні закидуємо у масив,
  //та відразу через метод some передаємо елемет і у ньому перевіряємо строку
  const usersToRender = users.filter(({ name, age, city }) =>
    [name, age.toString(), city].some((element) =>
      element.includes(event.target.value)
    )
  );
  renderUsers(usersToRender);
};

sortByName.onchange = (event) => {
  if (event.target.checked) {
    sorting.names(); //нажатий чи ні?
    sortByAge.checked = false;
  } else{
    renderUsers(users);
  } 
};

sortByAge.onchange = (event) => {
  if (event.target.checked) {
    sorting.ages(); //нажатий чи ні?
    sortByName.checked = false;
  } else {
    renderUsers(users);
  } 
};

function addInnerArr(arr, step) {
  const result = [];

  for(let i = 0; i < arr.length; i++){
    result.push(arr.slice(i * step, (i+1)*step));
  }
  return result.filter(mass => mass.length > 0);
}