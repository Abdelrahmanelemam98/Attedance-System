let form = document.querySelector(".form");
let input = document.querySelectorAll(".input");
let buttonRegister = document.querySelector(".butt");
let requirMsg = document.querySelectorAll(".requir");

let firstInput = document.querySelector(".first");
let lastInput = document.querySelector(".last");
let emailIput = document.querySelector(".email");
let ageInput = document.getElementById("age");
let addressInput = document.getElementById("address");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

buttonRegister.addEventListener("click", async () => {
  let valid = validationForm();
  if (valid == 1) {
    const dataForEmployee = {
      firstName: firstInput.value,
      lastName: lastInput.value,
      age: ageInput.value,
      email: emailIput.value,
      address: addressInput.value,
      role: "",
    };
    dataForEmployee.role = "";
    Swal.fire({
      title: "Register",
      text: "Your register is send!",
      icon: "success",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    }).then(() => {
      dataForEmployee.username = generateRandomUsername(
        dataForEmployee.firstName
      );
      dataForEmployee.password = generateRandomPassword();
      postName(dataForEmployee);
    });
  }
  // alert();
});
async function postName(data) {
  const dataForEmployee = data;
  const response = await fetch("  http://localhost:3000/pending", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
// validation for all input
function validationForm() {
  let flag = 1;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < requirMsg.length; j++) {
      if (input[i].value.trim().length == "") {
        requirMsg[j].style.display = "block";
        flag = 0;
      } else {
        requirMsg[j].style.display = "none";
        flag = 1;
      }
    }
  }
  return flag;
}

firstInput.addEventListener("keydown", () => {
  for (let i = 0; i < requirMsg.length; i++) {
    requirMsg[0].style.display = "none";
    lastInput.addEventListener("keydown", () => {
      requirMsg[1].style.display = "none";
    });
    ageInput.addEventListener("keydown", () => {
      requirMsg[2].style.display = "none";
    });
    emailIput.addEventListener("keydown", () => {
      requirMsg[3].style.display = "none";
    });
    addressInput.addEventListener("keydown", () => {
      requirMsg[4].style.display = "none";
    });
  }
});

// generating user name
function generateRandomUsername(name) {
  let chars = "0123456789!@-_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let usernameLength = 4;
  let username = name.substring(0, 4);
  for (let i = 0; i <= usernameLength; i++) {
    let randomNumber = Math.floor(Math.random() * chars.length);
    username += chars.substring(randomNumber, randomNumber + 1);
  }
  return username;
}
// generating password
function generateRandomPassword() {
  let chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@$%-_ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let passwordLength = 12;
  let password = "";
  for (let i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  return password;
}
