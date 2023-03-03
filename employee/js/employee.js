let menu_btn = document.querySelector("#menu-btn");
let sidebar = document.querySelector("#sidebar");
let container = document.querySelector(".my-container");
let dateValue = document.getElementById("date-input");
let selectInput = document.getElementById("select");
let btn = document.getElementById("btn-submit");
let logoutImg = document.querySelector(".log-img");
let logoutSection = document.querySelector(".logout");
let AttendanceData = [];

menu_btn.addEventListener("click", () => {
  sidebar.classList.toggle("active-nav");
  container.classList.toggle("active-cont");
});
logoutImg.addEventListener("click", () => {
  logoutSection.classList.toggle("active");
});

window.onload = async function () {
  setMaxmimeFilterDate();
  AttendanceData = await loadNamesAttendance();
  await bindDataAttendance();
};
function reinitilationTable(dateValue, select) {
  let table = $("#attend-table").DataTable();
  table.destroy();
  bindDataAttendance(dateValue, select);
}
function bindDataAttendance(date, select) {
  if (date != null && select != null) {
    if (selectInput.value == "Daily") {
      AttendanceData = AttendanceData.filter((emp) => emp.date == date);
    } else if (selectInput.value == "Weekly") {
      //You should apply the filter as you wish for this
      AttendanceData = AttendanceData.filter((emp) => emp.date == date);
    } else if (selectInput.value == "Monthly") {
      AttendanceData = AttendanceData.filter(
        (emp) => emp.date.getMonth() == date.getMonth()
      );
    }
  }
  $("#attend-table").DataTable({
    data: AttendanceData,
    columns: [
      { data: "name" },
      { data: "time" },
      { data: "late" },
      { data: "date" },
      { data: "leaving" },
      { data: "early" },
    ],
  });
}

async function loadNamesAttendance() {
  response = await fetch("http://localhost:3000/Attendance");
  names = await response.json();
  return names;
}
btn.addEventListener("click", () => {
  if (dateValue.value && selectInput.value)
    reinitilationTable(dateValue.value, selectInput.value);
  else alert("please select datte and report type firstt!");
});
function setMaxmimeFilterDate() {
  let yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  // let month = yesterday.getMonth() + 1;
  // let day = yesterday.getDate();
  // let year = yesterday.getFullYear();
  // let newdate = year + "-" + month + "-" + day;
  // dateValue.setAttribute("max", newdate);
  dateValue.max = yesterday.toISOString().split("T")[0];
  // dateValue.max = "2023-01-24";
}
