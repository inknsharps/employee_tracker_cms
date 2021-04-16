require("dotenv").config();
const cTable = require('console.table');
const mysql = require("mysql");
const inquirer = require("inquirer");
let {
    currentRoles,
    currentDepartments,
    currentEmployees,
    mainMenu,
    viewMenu,
    createMenu,
    updateMenu,
    deleteMenu,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    viewEmployeesByManager,
    viewDepartmentBudget,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    renderDepartments,
    renderRoles,
    renderEmployees } = require("./assets/menu")

/* Menu Functions */
const mainMenuSelection = () => {
    inquirer.prompt(mainMenu)
        .then((selection) => {
            switch (selection.mainMenu){
                case "--------- ACCESS VIEW MENU ---------":
                    viewMenuSelection();
                    break;
                case "-------- ACCESS CREATE MENU --------":
                    createMenuSelection();
                    break;
                case "-------- ACCESS UPDATE MENU --------":
                    updateMenuSelection();
                    break;
                case "-------- ACCESS DELETE MENU --------":
                    deleteMenuSelection();
                    break;
                case "--------- EXIT THE PROGRAM ---------":
                    connection.end();
                    process.exit(0);
            }
        })
}

const viewMenuSelection = () => {
    inquirer.prompt(viewMenu)
        .then((selection) => {
            switch (selection.viewMenu){
                case "View all employees":
                    console.log("----- LIST OF EMPLOYEES -----");
                    readData("employees");
                    break;
                case "View all departments":
                    console.log("----- LIST OF DEPARTMENTS -----");
                    readData("departments");
                    break;
                case "View all roles":
                    console.log("----- LIST OF ROLES -----");
                    readData("roles");
                    break;
                case "View budget":
                    console.log("----- BUDGET -----");
                    readData("budget");
                    break;
                case "-------- RETURN TO MAIN MENU --------":
                    mainMenuSelection();
                    break;
            }
        })
}

const createMenuSelection = () => {
    inquirer.prompt(createMenu)
        .then((selection) => {
            switch (selection.createMenu){
                case "Create new employee":
                    console.log("----- CREATE NEW EMPLOYEE -----");
                    createData("employees");
                    break;
                case "Create new role":
                    console.log("----- CREATE NEW ROLE -----");
                    createData("roles");
                    break;
                case "Create new department":
                    console.log("----- CREATE NEW DEPARTMENT -----");
                    createData("departments");
                    break;
                case "-------- RETURN TO MAIN MENU --------":
                    mainMenuSelection();
                    break;
            }
        })
}

const updateMenuSelection = () => {
    inquirer.prompt(updateMenu)
        .then((selection) => {
            switch (selection.updateMenu){
                case "Update employee roles":
                    console.log("----- UPDATE EMPLOYEE'S ROLE -----");
                    updateData("roles");
                    break;
                case "Update employee manager":
                    console.log("Update employee manager here");
                    updateMenuSelection();
                    break;
                case "-------- RETURN TO MAIN MENU --------":
                    mainMenuSelection();
                    break;
            }
        })
}

const deleteMenuSelection = () => {
    inquirer.prompt(deleteMenu)
        .then((selection) => {
            switch (selection.deleteMenu){
                case "Delete employee":
                    console.log("Delete Employees here");
                    deleteData("employee");
                    break;
                case "Delete role":
                    console.log("Delete roles here");
                    deleteData("role");
                    break;
                case "Delete department":
                    console.log("Delete department here");
                    deleteData("department");
                    break;
                case "-------- RETURN TO MAIN MENU --------":
                    mainMenuSelection();
                    break;
            }
        })
}

/* Connection Functions */
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.USER,
    password: process.env.PASS,
    database: "employee_db"
});

// For the same reasons as in createData, we update our data arrays manually with the splice method.
const deleteData = (dataType) => {
    switch (dataType){
        case ("employee"):
            inquirer.prompt(deleteEmployee)
                .then(({deleteEmployee}) => {
                    connection.query("DELETE FROM employee WHERE id = ?", [parseInt(deleteEmployee)], (err, res) => {
                        if (err) throw err;
                        console.log(`Deleted ${deleteEmployee} from the employee table. Updating accessible data...`);
                        currentEmployees.splice(currentEmployees.indexOf(deleteEmployee), 1);
                        deleteMenuSelection();
                    })
                })
            break;
        case ("role"):
            inquirer.prompt(deleteRole)
                .then(({deleteRole}) => {
                    connection.query("DELETE FROM role WHERE title = ?", [deleteRole], (err, res) => {
                        if (err) throw err;
                        console.log(`Deleted ${deleteRole} from the employee table. Updating accessible data...`);
                        currentRoles.splice(currentRoles.indexOf(deleteRole), 1);
                        deleteMenuSelection();
                    })
                })
            break;
        case ("department"):
            inquirer.prompt(deleteDepartment)
                .then(({deleteDepartment}) => {
                    connection.query("DELETE FROM department WHERE name = ?", [deleteDepartment], (err, res) => {
                        if (err) throw err;
                        console.log(`Deleted ${deleteDepartment} from the department table. Updating accessible data...`);
                        currentDepartments.splice(currentDepartments.indexOf(deleteDepartment), 1);
                        deleteMenuSelection();
                    })
                })
            break;
    }
}

const updateData = (dataType) => {
    switch (dataType){
        case "roles":
            inquirer.prompt(updateEmployeeRole)
                .then(answers => {
                    connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [
                        currentRoles.indexOf(answers.newRole) + 1, parseInt(answers.selectedEmployee)], (err, res) => {
                            if(err) throw err;
                            console.log(`Updated employee ${answers.selectedEmployee}'s role to ${answers.newRole}.`)
                            updateMenuSelection();
                        }
                    )
                })
            break;
        case "manager":
            console.log("Managers TBD");
            updateMenuSelection();
    }
}

// We're pushing the newly created data the existing array because my functions for rerendering those arrays don't want to work.
const createData = (dataType) => {
    switch (dataType){
        case "employees":
            inquirer.prompt(addEmployee)
                .then(({employeeFName, employeeLName, employeeRole}) => {
                    // Because the user selects the name of the role in inquirer, we have to convert it back into an integer based on the role ID so the SQL database doesn't get messed up.
                    connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)", [employeeFName, employeeLName, currentRoles.indexOf(employeeRole) + 1], (err, res) => {
                        if (err) throw err;
                        // res.insertID gives us the ID of the row we inserted this into, which we need for our current employees array
                        console.log(`Added new employee: ID ${res.insertId} - ${employeeFName} ${employeeLName}, Role: ${employeeRole}.`);
                        currentEmployees.push(`${res.insertId} - ${employeeFName} ${employeeLName}`);
                        createMenuSelection();
                    }) 
                })
            break;
        case "roles":
            inquirer.prompt(addRole)
                .then(answers => {
                    // Same indexOf thing as the employees, but this time we're getting the department ID
                    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answers.roleTitle, answers.roleSalary, currentDepartments.indexOf(answers.roleDepartment) + 1], (err, res) => {
                        if (err) throw err;
                        console.log(`Added new role: ${answers.roleTitle} with salary of ${answers.roleSalary}.`);
                        currentRoles.push(answers.roleTitle);
                        createMenuSelection();
                    })
                })
            break;
        case "departments":
            inquirer.prompt(addDepartment)
                .then(answers => {
                    connection.query("INSERT INTO department (name) VALUES (?)", answers.departmentName, (err, res) => {
                        if (err) throw err;
                        console.log(`Added new department: ${answers.departmentName}`);
                        currentDepartments.push(answers.departmentName);
                        createMenuSelection();
                    })
                })
            break;
    }
}

const readData = (dataType) => {
    switch (dataType){
        case "employees":
            connection.query("SELECT employee.id, first_name, last_name, title, salary, name, manager_id FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id", (err, res) => {
                if (err) throw err;
                let employees = [];
                res.forEach(index => {
                    employees.push({ EmployeeID: index.id, FirstName: index.first_name, LastName: index.last_name, Role: index.title, Department: index.name, Salary: index.salary });
                })
                console.table(employees);
                viewMenuSelection();
            })
            break;
        case "roles":
            connection.query("SELECT * FROM role LEFT JOIN department on role.department_id = department.id", (err, res) => {
                if (err) throw err;
                let roles = [];
                res.forEach(index => {
                    roles.push({ RoleID: index.id, Title: index.title, Salary: index.salary, Department: index.name });
                })
                console.table(roles);
                viewMenuSelection();
            })
            break;
        case "departments":
            connection.query("SELECT * FROM department", (err, res) => {
                if (err) throw err;
                let departments = [];
                res.forEach(index => {
                    departments.push({ DepartmentID: index.id, Department: index.name });
                })
                console.table(departments);
                viewMenuSelection();
            })
            break;
        case "budget":
            inquirer.prompt(viewDepartmentBudget)
                .then(({ department }) => {
                    // Matcher is used to grab only the department id, we use the same trick of converting the worded department name into a number
                    let matcher = currentDepartments.indexOf(department) + 1;
                    // Inner join is used to filter out any null values in the tables
                    connection.query("SELECT department.id, title, salary, first_name, last_name FROM department INNER JOIN role on department.id = role.department_id INNER JOIN employee on role.id = employee.role_id", (err, res) => {
                        if (err) throw err;
                        let budget = [];
                        res.forEach(index => {
                            if (index.id === matcher){
                                budget.push(index.salary);
                            }
                        })
                        // If nothing matched, then terminate the function before we get to the reduce method which can cause errors
                        if (budget.length === 0){
                            console.log("Budget is $0! Nobody works for this department. :(");
                            viewMenuSelection();
                        } else {
                            let total = budget.reduce((accumulator, currentValue) => accumulator + currentValue);
                            console.log(`The budget for the ${department} Department is $${total}.`);
                            viewMenuSelection();
                        }
                    })
                })
            break;
    }
}

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    mainMenuSelection();
});

// TO DO
// Add the manager stuff
// destructure some asnwers from inquirer for cleaner code