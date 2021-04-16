require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const {
    mainMenu,
    viewMenu,
    createMenu,
    updateMenu,
    deleteMenu,
    addDepartment,
    addRole,
    addEmployee,
    viewDepartment,
    viewRole,
    viewEmployee,
    updateEmployee,
    updateEmployeeManager,
    viewEmployeesByManager,
    deleteDepartment,
    deleteRole,
    deleteEmployee } = require("./assets/menu")

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
                    console.log("Roles here");
                    readData("roles");
                    break;
                case "View budget":
                    console.log("Budget here");
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
                    console.log("Create employees here");
                    createMenuSelection();
                    break;
                case "Create new role":
                    console.log("Create new role here");
                    createMenuSelection();
                    break;
                case "Create new department":
                    console.log("Create new dept here");
                    createMenuSelection();
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
                case "Update employee":
                    console.log("Update Employees here");
                    updateMenuSelection();
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
                    deleteMenuSelection();
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

// I figured a switch statement is better than having separate functions for everything
const readData = (dataType) => {
    switch (dataType){
        case "employees":
            connection.query("SELECT * FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id", (err, res) => {
                if (err) throw err;
                // console.log(res);
                res.forEach(index => {
                    console.log(`ID: ${index.id} | ${index.first_name} | ${index.last_name} | ${index.title} | ${index.department} | ${index.salary}`);
                })
                viewMenuSelection();
            })
            break;
        case "roles":
            connection.query("SELECT * FROM role LEFT JOIN department on role.department_id = department.id", (err, res) => {
                if (err) throw err;
                // console.log(res);
                res.forEach(index => {
                    console.log(`ID: ${index.id} | ${index.title} | ${index.salary} | ${index.name}`);
                })
                viewMenuSelection();
            })
            break;
        case "departments":
            connection.query("SELECT * FROM department", (err, res) => {
                if (err) throw err;
                // console.log(res);
                res.forEach(index => {
                    console.log(`ID: ${index.id} | ${index.name}`);
                })
                viewMenuSelection();
            })
            break;
        case "budget":
            console.log("Budget TBD");
            viewMenuSelection();
            break;
    }
}

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    mainMenuSelection();
});