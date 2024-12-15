let detailsSubmit = document.getElementById("submit");
let formDetails = document.getElementById("form");
let addEmployee = document.getElementById("add-employee-button");
const tableBody = document.getElementById("tableBody");
let year = document.getElementById("year");
let baseSalary = document.getElementById("baseSalary");
let bonus = document.getElementById("bonus");
let total = document.getElementById("total");
let basicSalary = document.getElementById("basicPay");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let city = document.getElementById("city");
let arrayOfUser = [];

// Prevent form submission and collect details
formDetails.addEventListener("submit", collectDetails);

function collectDetails(event) {
    event.preventDefault(); // Prevent form submission

    // Collect form values
    let employeeYears = parseInt(year.value, 10);
    let baseSalaryValue = parseFloat(baseSalary.value);
    let firstNAME = firstName.value;
    let lastNAME = lastName.value;
    let cityValue = city.value;

    // Validation
    if (isNaN(employeeYears) || isNaN(baseSalaryValue) || !firstNAME || !lastNAME || !cityValue) {
        alert("Please fill in all fields correctly.");
        return;
    }

    // Calculate bonus and total salary
    let bonusPercent = employeeYears >= 5 ? 0.10 : 0.05;
    let bonusPay = baseSalaryValue * bonusPercent;
    let totalSalary = baseSalaryValue + bonusPay;

    // Display calculated values
    bonus.value = bonusPay.toFixed(2);
    total.value = totalSalary.toFixed(2);
    basicSalary.value = baseSalaryValue;

    // Store details in localStorage
    sendToLocal(firstNAME, lastNAME, cityValue, employeeYears, baseSalaryValue);

    // Reset only input fields (except calculated values)
    formDetails.reset();
    // bonus.value = bonusPay.toFixed(2);
    // total.value = totalSalary.toFixed(2);
    // basicSalary.value = baseSalaryValue;
}

function sendToLocal(firstNAME, lastNAME, cityValue, employeeYears, baseSalaryValue) {
    let userObj = {
        firstName: firstNAME,
        lastName: lastNAME,
        city: cityValue,
        years: employeeYears,
        baseSalary: baseSalaryValue,
    };

    arrayOfUser.push(userObj);
    localStorage.setItem("salary", JSON.stringify(arrayOfUser));
    fetchData();
}

function fetchData() {
    if (localStorage.getItem("salary")) {
        arrayOfUser = JSON.parse(localStorage.getItem("salary"));
    }
    showEmployeeDetails();
}

function showEmployeeDetails() {
    // Clear existing rows in the table body
    tableBody.innerHTML = "";

    arrayOfUser.forEach((item, index) => {
       const row = document.createElement("tr");

    // Create and append table cells with appropriate data
    row.innerHTML = `
        <td>${index + 1}</td>
        <td><input type="text" id="firstName-${index}" value="${item.firstName}"></td>
        <td><input type="text" id="lastName-${index}" value="${item.lastName}"></td>
        <td><input type="text" id="city-${index}" value="${item.city}"></td>
        <td><input type="text" id="year-${index}" value="${item.year}"></td>
        <td><input type="text" id="baseSalary-${index}" value="${item.baseSalary}"></td>
        <td><button type="submit" id="submit-${index}">Details</button></td>
    `;

    // Append the row to the table body
    tableBody.appendChild(row);
    
    });

}


// Placeholder for "Add Employee" button
addEmployee.addEventListener("click", function() {
   console.log(`This is my website.`) 
});

// Initial fetch to populate the table
fetchData();
