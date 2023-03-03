let input = document.querySelectorAll(".input");
let buttonLogin = document.querySelector(".butt");
let icon = document.querySelector(".icon-1");
let reqMsg = document.querySelectorAll(".requir");
let inputPassword = document.querySelector(".pass");
let inputEmail = document.querySelector(".email");
let form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
buttonLogin.addEventListener("click", async () => {
  let users = await loadNamesEmployee(inputEmail.value, inputPassword.value);
  // alert(users);
  checkEmpExtence(users);

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < reqMsg.length; j++) {
      if (input[i].value.trim("").length == 0) {
        reqMsg[j].style.display = "block";
      } else {
        reqMsg[j].style.display = "none";
      }
    }
  }

  reset();
});
function reset() {
  inputEmail.value = "";
  inputPassword.value = "";
}

inputEmail.addEventListener("keydown", () => {
  for (let i = 0; i < reqMsg.length; i++) {
    reqMsg[0].style.display = "none";
    inputPassword.addEventListener("keydown", () => {
      reqMsg[1].style.display = "none";
    });
  }
});

icon.addEventListener("click", function () {
  icon.classList.toggle("fa-eye");
  if (inputPassword.type == "password") {
    inputPassword.setAttribute("type", "text");
  } else {
    inputPassword.setAttribute("type", "password");
  }
});
async function loadNamesEmployee(username, pass) {
  let response = await fetch(
    `http://localhost:3000/employee?username=${username}&password=${pass}`
  );
  let users = await response.json();
  return users;
}
function checkEmpExtence(users) {
  if (users.length == 0);
  else if (
    inputEmail.value == users[0].username &&
    inputPassword.value == users[0].password
  ) {
    localStorage.setItem("id", users[0].id);
    localStorage.setItem("username", inputEmail.value);
    localStorage.setItem("userpassword", inputPassword.value);
    console.log(users[0].role);
    if (users[0].role === "admin") {
      window.location.href = "../../admin/admin.html";
    } else if (users[0].role === "employee") {
      window.location.href = "../../profile/profile.html";
    } else if (users[0].role === "security") {
      window.location.href = "../../Attendance_page/attendance.html";
    }
  }
}
