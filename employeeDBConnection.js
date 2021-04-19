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
    viewDepartmentBudget,
    deleteDepartment,
    deleteRole,
    deleteEmployee
} = require("./assets/menu");

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
                    console.log("\n ---------------------------------------- \n EXITING PROGRAM... \n ---------------------------------------- \n")
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
                    console.log("\n ---------------------------------------- \n LIST OF EMPLOYEES \n ---------------------------------------- \n");
                    readEmployeeQuery();
                    break;
                case "View all employees by manager":
                    console.log("\n ---------------------------------------- \n LIST OF EMPLOYEES BY MANAGER \n ---------------------------------------- \n");
                    readEmployeesByManagerQuery();
                    break
                case "View all departments":
                    console.log("\n ---------------------------------------- \n LIST OF DEPARTMENTS \n ---------------------------------------- \n");
                    readDepartmentsQuery();
                    break;
                case "View all roles":
                    console.log("\n ---------------------------------------- \n LIST OF ROLES \n ---------------------------------------- \n");
                    readRolesQuery();
                    break;
                case "View budget":
                    console.log("\n ---------------------------------------- \n VIEW BUDGET \n ---------------------------------------- \n");
                    readBudgetQuery();
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
                    console.log("\n ---------------------------------------- \n CREATE NEW EMPLOYEE \n ---------------------------------------- \n");
                    createEmployeeQuery();
                    break;
                case "Create new role":
                    console.log("\n ---------------------------------------- \n CREATE NEW ROLE \n ---------------------------------------- \n");
                    createRoleQuery();
                    break;
                case "Create new department":
                    console.log("\n ---------------------------------------- \n CREATE NEW DEPARTMENT \n ---------------------------------------- \n");
                    createDepartmentQuery();
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
                    console.log("\n ---------------------------------------- \n UPDATE EMPLOYEE'S ROLE \n ---------------------------------------- \n");
                    updateRolesQuery();
                    break;
                case "Update employee manager":
                    console.log("\n ---------------------------------------- \n UPDATE EMPLOYEE'S MANAGER \n ---------------------------------------- \n");
                    updateEmployeeManagerQuery();
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
                    console.log("\n ---------------------------------------- \n DELETE EMPLOYEES \n ---------------------------------------- \n");
                    deleteEmployeeQuery();
                    break;
                case "Delete role":
                    console.log("\n ---------------------------------------- \n DELETE ROLES \n ---------------------------------------- \n");
                    deleteRoleQuery();
                    break;
                case "Delete department":
                    console.log("\n ---------------------------------------- \n DELETE DEPARTMENTS \n ---------------------------------------- \n");
                    deleteDepartmentQuery();
                    break;
                case "-------- RETURN TO MAIN MENU --------":
                    mainMenuSelection();
                    break;
            }
        })
}

/* Delete Query Functions */
// For the same reasons as in the create data queries, we update our data arrays manually with the splice method.
const deleteEmployeeQuery = () => {
    inquirer.prompt(deleteEmployee)
        .then(({deleteEmployee}) => {
            connection.query("DELETE FROM employee WHERE id = ?", [parseInt(deleteEmployee)], (err, res) => {
                if (err) throw err;
                console.log(`Deleted ${deleteEmployee} from the employee table. Updating accessible data...`);
                currentEmployees.splice(currentEmployees.indexOf(deleteEmployee), 1);
                deleteMenuSelection();
            })
        })
}

const deleteRoleQuery = () => {
    inquirer.prompt(deleteRole)
        .then(({deleteRole}) => {
            connection.query("DELETE FROM role WHERE title = ?", [deleteRole], (err, res) => {
                if (err){
                    console.log("\n ~~~~~~~~~~~~~~ \n W A R N I N G! \n ~~~~~~~~~~~~~~ \n There are employees under this role! Please delete those employees first before deleting the role. Returning to delete menu...");
                    deleteMenuSelection();
                } else {
                    console.log(`Deleted ${deleteRole} from the employee table. Updating accessible data...`);
                    currentRoles.splice(currentRoles.indexOf(deleteRole), 1);
                    deleteMenuSelection();
                }
            })
        })
}

const deleteDepartmentQuery = () => {
    inquirer.prompt(deleteDepartment)
        .then(({deleteDepartment}) => {
            connection.query("DELETE FROM department WHERE dept_name = ?", [deleteDepartment], (err, res) => {
                if (err) {
                    console.log("\n ~~~~~~~~~~~~~~ \n W A R N I N G! \n ~~~~~~~~~~~~~~ \n There are roles under this department! Please delete those roles first before deleting the department. Returning to delete menu...");
                    deleteMenuSelection();
                } else {
                    console.log(`Deleted ${deleteDepartment} from the department table. Updating accessible data...`);
                    currentDepartments.splice(currentDepartments.indexOf(deleteDepartment), 1);
                    deleteMenuSelection();
                }
            })
        })
}

/* Update Query Functions */
const updateRolesQuery = () => {
    inquirer.prompt(updateEmployeeRole)
        .then(({newRole, selectedEmployee}) => {
            connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [
                currentRoles.indexOf(newRole) + 1, parseInt(selectedEmployee)], (err, res) => {
                    if (err) throw err;
                    console.log(`Updated employee ${selectedEmployee}'s role to ${newRole}.`);
                    updateMenuSelection();
                }
            )
        })
}

const updateEmployeeManagerQuery = () => {
    inquirer.prompt(updateEmployeeManager)
        .then(({selectedEmployee, assignedManager}) => {
            // In this case we set the manager ID to the employee ID of the person who is becoming the manager
            connection.query("UPDATE employee SET manager_id = ? WHERE id = ?", [parseInt(assignedManager), parseInt(selectedEmployee)], (err, res) => {
                if (err) throw err;
                console.log(`Updated employee ${selectedEmployee} who now reports to ${assignedManager}.`);
                updateMenuSelection();
            })
        })
}

/* Create queries and helper functions */
// We're pushing the newly created data the existing array because my functions for rerendering those arrays don't want to work.
const createEmployeeQuery = () => {
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
}

const createRoleQuery = () => {
    inquirer.prompt(addRole)
        .then(({roleTitle, roleSalary, roleDepartment}) => {
            // Same indexOf thing as the employees, but this time we're getting the department ID
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [roleTitle, roleSalary, currentDepartments.indexOf(roleDepartment) + 1], (err, res) => {
                if (err) throw err;
                console.log(`Added new role: ${roleTitle} with salary of ${roleSalary}.`);
                currentRoles.push(roleTitle);
                createMenuSelection();
            })
        })
}

const createDepartmentQuery = () => {
    inquirer.prompt(addDepartment)
        .then(({departmentName}) => {
            connection.query("INSERT INTO department (dept_name) VALUES (?)", departmentName, (err, res) => {
                if (err) throw err;
                console.log(`Added new department: ${departmentName}`);
                currentDepartments.push(departmentName);
                createMenuSelection();
            })
        })
}

/* Read Query Functions */
const readEmployeeQuery = () => {
    connection.query("SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id", (err, res) => {
        if (err) throw err;
        let employees = [];
        res.forEach(index => {
            employees.push({ EmployeeID: index.id, FirstName: index.first_name, LastName: index.last_name, Role: index.title, ManagersID: index.manager_id, Department: index.dept_name, Salary: index.salary });
        })
        console.table(employees);
        viewMenuSelection();
    })
}

const readEmployeesByManagerQuery = () => {
    connection.query("SELECT manager_id, employee.id, first_name, last_name, title, dept_name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id ORDER BY manager_id DESC", (err, res) => {
        if (err) throw err;
        let employees = [];
        console.log(res);
        res.forEach(index => {
            employees.push({ ManagersID: index.manager_id, EmployeeID: index.id, FirstName: index.first_name, LastName: index.last_name, Role: index.title, Department: index.dept_name });
        })
        console.table(employees);
        viewMenuSelection();
    })
}

const readRolesQuery = () => {
    connection.query("SELECT * FROM role LEFT JOIN department on role.department_id = department.id", (err, res) => {
        if (err) throw err;
        let roles = [];
        res.forEach(index => {
            roles.push({ RoleID: index.id, Title: index.title, Salary: index.salary, Department: index.dept_name });
        })
        console.table(roles);
        viewMenuSelection();
    })
}

const readDepartmentsQuery = () => {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        let departments = [];
        res.forEach(index => {
            departments.push({ DepartmentID: index.id, Department: index.dept_name });
        })
        console.table(departments);
        viewMenuSelection();
    })
}

const readBudgetQuery = () => {
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
}

/* Connection Functions */
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.USER,
    password: process.env.PASS,
    database: "employee_db"
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`MYSQL: Connected as ID ${connection.threadId}.`);
    mainMenuSelection();
});