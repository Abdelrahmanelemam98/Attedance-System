let menu_btn = document.querySelector("#menu-btn");
let sidebar = document.querySelector("#sidebar");
let container = document.querySelector(".my-container");
let logoutImg = document.querySelector(".log-img");
let logoutSection = document.querySelector(".logout");
let topButton = document.querySelector(".btn-top");
var pendingData = [];
var employeeData = [];
menu_btn.addEventListener("click", () => {
  sidebar.classList.toggle("active-nav");
  container.classList.toggle("active-cont");
});
logoutImg.addEventListener("click", () => {
  logoutSection.classList.toggle("active");
});
// bar chart
window.onload = async function () {
  pendingData = await loadNamesPending();
  employeeData = await loadNamesEmployee();
  await canvesColor();
  await drawCanves();
  await bindDataPending();
  await bindDataEmployee();
};

// chart circel for absent and present in month
let xValues = ["Absent", "Present"];
let yValues = [40, 60];
let barColors = ["#ff9b44", "#fc6075"];

new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Absent and present for month",
    },
  },
});
// $("#example").DataTable();
// $("#example2").DataTable();

//table for pending employee

async function loadNamesPending() {
  const response = await fetch("http://localhost:3000/pending");
  const names = await response.json();
  return names;
}
function canvesColor() {
  CanvasJS.addColorSet("colors", [
    "#ff9b44",
    "#fc6075",
    "#ff9b44",
    "#fc6075",
    "#ff9b44",
    "#fc6075",
    "#ff9b44",
  ]);
}
function drawCanves() {
  let chart = new CanvasJS.Chart("Container", {
    animationEnabled: true,
    colorSet: "colors",
    title: {
      text: "",
    },

    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries,
    },
    data: [
      {
        type: "column",
        name: "Present",
        legendText: "Present",
        backgroundColor: "#ff9b44",
        showInLegend: true,
        dataPoints: [
          { label: "oneWeek", y: 266.21 },
          { label: "TwoWeek ", y: 302.25 },
          { label: "ThreeWeek  ", y: 157.2 },
          { label: "FourWeek", y: 148.77 },
        ],
      },
      {
        type: "column",
        name: "Absent ",
        legendText: "Absent",
        axisYType: "secondary",
        showInLegend: true,
        dataPoints: [
          { label: "OneWeek", y: 10.46 },
          { label: "TwoWeek", y: 2.27 },
          { label: "ThreeWeek ", y: 3.99 },
          { label: "FourWeek", y: 4.45 },
        ],
      },
    ],
  });
  chart.render();
  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
}

function bindDataPending() {
  // $("#example").DataTable();
  var table = $("#pending-table").DataTable({
    select: true,
    data: pendingData,
    columns: [
      { data: "firstName" },
      { data: "lastName" },
      { data: "age" },
      { data: "email" },
      { data: "address" },
      { data: "username" },
      {
        data: "",
        defaultContent: `<select id='select'><option value='select' selected>select</option><option value='admin'>admin</option><option value='employee'>employee</option><option value='security'>security</option> </select>`,
      },
      {
        data: "Approve",
        defaultContent: "<button class='btn-approve'>Approve</button>",
      },
      {
        data: "Disapprove",
        defaultContent: "<button class='btn-disapprove'>Disapprove</button>",
      },
    ],
  });
  $("#pending-table tbody").on("click", ".btn-approve", async function () {
    rowData = table.row($(this).parents("tr")).data();
    rowData.role = document.getElementById("select").value;
    console.log(rowData);

    let RemoveId = rowData.id;
    rowData.id = "";
    await sendEmail(rowData.email, rowData.username, rowData.password);
    await postEmp(rowData);
    console.log(rowData.id);
    await RemoveFromPending(RemoveId);
  });
  $("#pending-table tbody").on("click", ".btn-disapprove", async function () {
    rowDataLeave = table.row($(this).parents("tr")).data();
    console.log(rowDataLeave);
    let RemoveId = rowDataLeave.id;
    rowDataLeave.id = "";
    await RemoveFromPending(RemoveId);
  });
}
//post employee for database
async function postEmp(data) {
  rowData = data;
  response = await fetch("http://localhost:3000/employee", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
// load employee data
async function loadNamesEmployee() {
  response = await fetch("http://localhost:3000/employee");
  names = await response.json();
  return names;
}

function bindDataEmployee() {
  $("#table-employee").DataTable({
    data: employeeData,
    columns: [
      { data: "firstName" },
      { data: "lastName" },
      { data: "email" },
      { data: "address" },
      { data: "role" },
    ],
  });
}
// delete from pending
async function RemoveFromPending(RemoveId) {
  response = await fetch(`http://localhost:3000/pending/${RemoveId}`, {
    method: "DELETE",
  });
}
//send email

function sendEmail(email, username, password) {
  return emailjs
    .send("service_z64lbwv", "template_7ni9els", {
      username: username,
      password: password,
      email: email,
    })
    .then((message) => alert("send it"));
}
// button to top

window.onscroll = function () {
  if (window.scrollY >= 200) {
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
