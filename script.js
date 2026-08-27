/* =========================
   DATABASE
========================= */

let employees =
    JSON.parse(localStorage.getItem("employees")) || [];

let leaves =
    JSON.parse(localStorage.getItem("leaves")) || [];


/* =========================
   PAGE NAVIGATION
========================= */

function showPage(page) {

    document.querySelectorAll(".page")
        .forEach(p => p.classList.add("hidden"));

    document.getElementById(page)
        .classList.remove("hidden");

    const titles = {
        dashboard: "Dashboard",
        employees: "Employee 201 Files",
        leave: "Leave Tracker"
    };

    document.getElementById("pageTitle")
        .innerText = titles[page];

    updateDashboard();
}


/* =========================
   EMPLOYEE MODAL
========================= */

function openEmployeeModal() {
    document.getElementById("employeeModal")
        .style.display = "flex";
}

function closeEmployeeModal() {
    document.getElementById("employeeModal")
        .style.display = "none";
}


/* =========================
   ADD EMPLOYEE
========================= */

function addEmployee() {

    const employee = {

        id: document.getElementById("employeeID").value,

        name: document.getElementById("employeeName").value,

        department:
            document.getElementById("employeeDepartment").value,

        position:
            document.getElementById("employeePosition").value,

        date:
            document.getElementById("employeeDate").value,

        status:
            document.getElementById("employeeStatus").value
    };


    if (!employee.id || !employee.name) {

        alert("Employee ID and Name are required.");

        return;
    }


    employees.push(employee);

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );


    closeEmployeeModal();

    clearEmployeeForm();

    displayEmployees();

    updateDashboard();

    alert("Employee successfully added.");
}


/* =========================
   DISPLAY EMPLOYEES
========================= */

function displayEmployees() {

    const table =
        document.getElementById("employeeTable");

    const search =
        document.getElementById("employeeSearch")
        .value
        .toLowerCase();

    table.innerHTML = "";


    employees
        .filter(employee =>

            employee.id.toLowerCase().includes(search) ||

            employee.name.toLowerCase().includes(search) ||

            employee.department.toLowerCase().includes(search)

        )
        .forEach((employee, index) => {

            table.innerHTML += `

                <tr>

                    <td>${employee.id}</td>

                    <td>${employee.name}</td>

                    <td>${employee.department}</td>

                    <td>${employee.position}</td>

                    <td>${employee.date}</td>

                    <td>${employee.status}</td>

                    <td>

                        <button
                            class="delete-btn"
                            onclick="deleteEmployee(${index})">
                            Delete
                        </button>

                    </td>

                </tr>

            `;
        });
}


/* =========================
   DELETE EMPLOYEE
========================= */

function deleteEmployee(index) {

    if (!confirm("Delete this employee?")) {
        return;
    }

    employees.splice(index, 1);

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

    displayEmployees();

    updateDashboard();
}


/* =========================
   CLEAR EMPLOYEE FORM
========================= */

function clearEmployeeForm() {

    document.getElementById("employeeID").value = "";

    document.getElementById("employeeName").value = "";

    document.getElementById("employeeDepartment").value = "";

    document.getElementById("employeePosition").value = "";

    document.getElementById("employeeDate").value = "";

}


/* =========================
   LEAVE MODAL
========================= */

function openLeaveModal() {

    document.getElementById("leaveModal")
        .style.display = "flex";
}

function closeLeaveModal() {

    document.getElementById("leaveModal")
        .style.display = "none";
}


/* =========================
   ADD LEAVE
========================= */

function addLeave() {

    const employeeID =
        document.getElementById("leaveEmployeeID").value;

    const employeeName =
        document.getElementById("leaveEmployeeName").value;

    const type =
        document.getElementById("leaveType").value;

    const from =
        document.getElementById("leaveFrom").value;

    const to =
        document.getElementById("leaveTo").value;


    if (!employeeID || !employeeName || !from || !to) {

        alert("Please complete all required fields.");

        return;
    }


    const start =
        new Date(from);

    const end =
        new Date(to);


    const days =
        Math.ceil(
            (end - start) /
            (1000 * 60 * 60 * 24)
        ) + 1;


    if (days <= 0) {

        alert("Invalid leave dates.");

        return;
    }


    const leave = {

        id: employeeID,

        name: employeeName,

        type: type,

        from: from,

        to: to,

        days: days,

        status: "Pending"
    };


    leaves.push(leave);


    localStorage.setItem(
        "leaves",
        JSON.stringify(leaves)
    );


    closeLeaveModal();

    displayLeaves();

    updateDashboard();

    alert("Leave successfully filed.");
}


/* =========================
   DISPLAY LEAVES
========================= */

function displayLeaves() {

    const table =
        document.getElementById("leaveTable");

    const search =
        document.getElementById("leaveSearch")
        .value
        .toLowerCase();

    table.innerHTML = "";


    leaves
        .filter(leave =>

            leave.id.toLowerCase().includes(search) ||

            leave.name.toLowerCase().includes(search) ||

            leave.type.toLowerCase().includes(search)

        )
        .forEach((leave, index) => {

            table.innerHTML += `

                <tr>

                    <td>${leave.id}</td>

                    <td>${leave.name}</td>

                    <td>${leave.type}</td>

                    <td>${leave.from}</td>

                    <td>${leave.to}</td>

                    <td>${leave.days}</td>

                    <td>${leave.status}</td>

                    <td>

                        ${
                            leave.status === "Pending"

                            ?

                            `<button
                                class="approve-btn"
                                onclick="approveLeave(${index})">
                                Approve
                            </button>`

                            :

                            "✓ Approved"
                        }

                    </td>

                </tr>

            `;
        });
}


/* =========================
   APPROVE LEAVE
========================= */

function approveLeave(index) {

    leaves[index].status = "Approved";


    localStorage.setItem(
        "leaves",
        JSON.stringify(leaves)
    );


    displayLeaves();

    updateDashboard();
}


/* =========================
   DASHBOARD
========================= */

function updateDashboard() {

    document.getElementById("totalEmployees")
        .innerText = employees.length;


    document.getElementById("activeEmployees")
        .innerText = employees.filter(
            e => e.status === "Active"
        ).length;


    document.getElementById("pendingLeaves")
        .innerText = leaves.filter(
            l => l.status === "Pending"
        ).length;


    document.getElementById("approvedLeaves")
        .innerText = leaves.filter(
            l => l.status === "Approved"
        ).length;
}


/* =========================
   DASHBOARD SEARCH
========================= */

function dashboardSearch() {

    const search =
        document.getElementById("dashboardSearch")
        .value
        .toLowerCase();

    const results =
        document.getElementById("searchResults");

    results.innerHTML = "";


    employees
        .filter(employee =>

            employee.id.toLowerCase().includes(search) ||

            employee.name.toLowerCase().includes(search)

        )
        .forEach(employee => {

            results.innerHTML += `

                <div style="
                    padding:15px;
                    border-bottom:1px solid #eee;
                ">

                    <strong>
                        ${employee.id}
                    </strong>

                    - ${employee.name}

                    <br>

                    ${employee.department}
                    | ${employee.position}

                    <br>

                    Status:
                    ${employee.status}

                </div>

            `;
        });
}


/* =========================
   INITIALIZE
========================= */

displayEmployees();

displayLeaves();

updateDashboard();
