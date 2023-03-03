let empName = document.querySelector("#empName");
let table = document.querySelector("table");
let btn = document.querySelector(".btn-1");
let late = 0;
let arrData;
let newTime;
let permission = 0;
let early = 0;
let leaving = "";

btn.addEventListener("click", () => {
  if (empName.value.trim().length == "") {
    alert("please employee name ");
    return;
  }
  //check from employee attedance
  let data = {
    name: empName.value,
    time: getCurrentTime(),
    date: getCurrentDate(),
    late: late,
    leaving: newTime,
    early: 1,
    permission: 0,
  };
  // data.late = late;
  // data.leaving = newTime;
  // data.early = 1;
  data.permission = 0;
  attendanceName(data);
  drawTableRow(data);
  //Set arrData to the local storage

  saveData(data);
  empName.value = null;
});
window.addEventListener("load", function () {
  bindDataSource();
  drawTable();
});
function bindDataSource() {
  let empData = localStorage.getItem("arrData");

  if (empData != null) {
    arrData = JSON.parse(empData);
  } else {
    arrData = [];
  }
}
function saveData(data) {
  bindDataSource();
  arrData.push(data);
  localStorage.setItem("arrData", JSON.stringify(arrData));
}

function drawTable() {
  for (let i = 0; i < arrData.length; i++) {
    drawTableRow(arrData[i]);
  }
}
function drawTableRow(data) {
  let createdtr = document.createElement("tr");
  // createdtr.appendChild((td1 = document.createElement("td")));
  createdtr.appendChild((td1 = document.createElement("td")));
  createdtr.appendChild((td2 = document.createElement("td")));
  createdtr.appendChild((td3 = document.createElement("td")));
  createdtr.appendChild((td4 = document.createElement("td")));
  td1.innerHTML = data.name;
  td2.innerHTML = data.time;
  td3.innerHTML = data.date;
  td4.innerHTML = `<input type="checkbox" class="early" onclick="getCurrentTimeForLeave(this)">`;
  table.appendChild(createdtr);
}

function getCurrentDate() {
  let date = new Date();
  let year = date.getFullYear();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  return year + "-" + month + "-" + day;
}

function getCurrentTime() {
  let date = new Date();
  let hrs = date.getHours();
  let mins = date.getMinutes();
  if (hrs <= 9) hrs = "0" + hrs;
  if (mins < 10) mins = "0" + mins;
  if (hrs > 9) late = 1;
  return hrs + ":" + mins;
}

async function attendanceName(data) {
  const arrData = data;
  const response = await fetch("  http://localhost:3000/Attendance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

async function getCurrentTimeForLeave(that) {
  user = that.parentNode.parentNode.childNodes[0].innerText;
  console.log(user);
  let date = new Date();
  let hrs = date.getHours();
  let mins = date.getMinutes();
  newTime = hrs + ":" + mins;
  let existance = await chechExistanceInAttendance(user);
  let array = await existance.json();
  patchData(array[0], newTime);
}

// Patch the values
async function patchData(object, newTime) {
  const response = await fetch(
    `http://localhost:3000/attendance/${object.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: object.id,
        username: object.username,
        time: object.time,
        date: object.date,
        late: object.late,
        leaving: newTime,
        early: 1,
        permission: 0,
      }),
    }
  );
}

// check the email existance in attendance
async function chechExistanceInAttendance(username) {
  const existance = await fetch(
    `http://localhost:3000/attendance?userName=${username}`
  );
  return existance;
}
