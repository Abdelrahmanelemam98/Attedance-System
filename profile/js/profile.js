let menu_btn = document.querySelector("#menu-btn");
let sidebar = document.querySelector("#sidebar");
let container = document.querySelector(".my-container");
let logoutImg = document.querySelector(".log-img");
let logoutSection = document.querySelector(".logout");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let age = document.getElementById("age");
let email = document.getElementById("email");
let address = document.getElementById("address");
let role = document.getElementById("role");
let concat = document.getElementById("concat");
let topButton = document.querySelector(".btn-top");
menu_btn.addEventListener("click", () => {
  sidebar.classList.toggle("active-nav");
  container.classList.toggle("active-cont");
});

logoutImg.addEventListener("click", () => {
  logoutSection.classList.toggle("active");
});

let userId = localStorage.getItem("id");
displayEmp();
async function displayEmp() {
  let userData = await loadNamesEmployee(userId);
  let attendance = await loadAttendanceEmployee(userData.username);

  firstName.innerHTML = userData.firstName;
  lastName.innerHTML = userData.lastName;
  age.innerHTML = userData.age;
  email.innerHTML = userData.email;
  address.innerHTML = userData.address;
  role.innerHTML = userData.role;
  concat.innerHTML = userData.firstName + " " + userData.lastName;

  $("#attend-table").DataTable({
    data: attendance,
    columns: [
      { data: "name" },
      { data: "time" },
      { data: "date" },
      { data: "late" },
      { data: "early" },
    ],
  });
}
async function loadNamesEmployee(id) {
  let response = await fetch(`http://localhost:3000/employee/${id}`);
  let users = await response.json();
  return users;
}

async function loadAttendanceEmployee(username) {
  let response = await fetch(
    `http://localhost:3000/Attendance?name=${username}`
  );
  let users = await response.json();
  return users;
}

// button to top

window.onscroll = function () {
  if (window.scrollY >= 100) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
};
topButton.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};
