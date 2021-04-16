require("dotenv").config();
const cTable = require('console.table');
const mysql = require("mysql");
const inquirer = require("inquirer");
let {
    currentRoles,
    currentDepartments,
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
                    deleteMenuSelection();
                    break;
                case "Delete role":
                    console.log("Delete roles here");
                    deleteMenuSelection();
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

const deleteData = (dataType) => {
    switch (dataType){
        case ("employee"):
            
        case ("role"):

        case ("department"):
            inquirer.prompt(deleteDepartment)
                .then(({department}) => {
                    connection.query("DELETE FROM department WHERE name = ?", [department], (err, res) => {
                        if (err) throw err;
                        console.log(`Deleted ${department} from the department table. Updating accessible data...`);
                        // For the same reasons as in createData, we update the array manually.
                        currentDepartments.splice(currentDepartments.indexOf(department), 1);
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

const createData = (dataType) => {
    switch (dataType){
        case "employees":
            inquirer.prompt(addEmployee)
                .then(answers => {
                    // Because the user selects the name of the role in inquirer, we have to convert it back into an integer based on the role ID so the SQL database doesn't get messed up.
                    connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)", [answers.employeeFName, answers.employeeLName, currentRoles.indexOf(answers.employeeRole) + 1], (err, res) => {
                        if (err) throw err;
                        console.log(`Added new employee: ${employeeFName} ${employeeLName}, Role: ${employeeRole}.`);
                        createMenuSelection();
                    }) 
                })
            break;
        case "roles":
            inquirer.prompt(addRole)
                .then(answers => {
                    // Same indexOf thing as the employees, but this time we're getting the department ID.
                    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answers.roleTitle, answers.roleSalary, currentDepartments.indexOf(answers.roleDepartment) + 1], (err, res) => {
                        if (err) throw err;
                        console.log(`Added new role: ${answers.roleTitle} with salary of ${answers.roleSalary}.`);
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
                        // We're pushing the new department to the currentDepartments array because my functions don't want to work
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
            connection.query("SELECT * FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id", (err, res) => {
                if (err) throw err;
                let employees = [];
                res.forEach(index => {
                    employees.push({ ID: index.id, FirstName: index.first_name, LastName: index.last_name, Role: index.title, Department: index.name, Salary: index.salary });
                })
                console.table(employees);
                viewMenuSelection();
            })
            break;
        case "roles":
            connection.query("SELECT * FROM role LEFT JOIN department on role.department_id = department.id", (err, res) => {
                if (err) throw err;
                // console.log(res);
                let roles = [];
                res.forEach(index => {
                    roles.push({ID: index.id, Title: index.title, Salary: index.salary, Department: index.name});
                })
                console.table(roles);
                viewMenuSelection();
            })
            break;
        case "departments":
            connection.query("SELECT * FROM department", (err, res) => {
                if (err) throw err;
                // console.log(res);
                let departments = [];
                res.forEach(index => {
                    departments.push({ID: index.id, Department: index.name});
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
                        // Basically if nothing matched, then terminate the function before we get to the reduce method which can cause errors
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
// Fix the issue where the current array of stuff in the DB duplicates whenever you create or delete an entry
// Add the manager stuff