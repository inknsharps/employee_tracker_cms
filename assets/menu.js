const mysql = require("mysql");

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
});

// This connection query reads and grabs the current titles in the DB
let currentRoles = [];
connection.query("SELECT id, title FROM role", (err, res) => {
    if (err) throw err;
    res.forEach(index => currentRoles.push(index.title));
})

let currentDepartments = [];
connection.query("SELECT id, name FROM department", (err, res) => {
    if (err) throw err;
    res.forEach(index => currentDepartments.push(index.name));
})


/* Inquirer Menu Arrays */ 
const mainMenu = [
    {
        type: "list",
        name: "mainMenu",
        message: "MAIN MENU - Please select an option.",
        choices: [
            "--------- ACCESS VIEW MENU ---------", 
            "-------- ACCESS CREATE MENU --------",
            "-------- ACCESS UPDATE MENU --------",
            "-------- ACCESS DELETE MENU --------",
            "--------- EXIT THE PROGRAM ---------"
        ]
    }
];

const viewMenu = [
    {
        type: "list",
        name: "viewMenu",
        message: "---- VIEW MENU: Please select an option. ----",
        choices: [
            "View all employees", 
            "View all departments", 
            "View all roles", 
            "View budget", 
            "-------- RETURN TO MAIN MENU --------"
        ]
    }
];

const createMenu = [
    {
        type: "list",
        name: "createMenu",
        message: "---- CREATE MENU: Please select an option. ----",
        choices: [
            "Create new employee", 
            "Create new role",
            "Create new department",
            "-------- RETURN TO MAIN MENU --------"
        ]
    }
];

const updateMenu = [
    {
        type: "list",
        name: "updateMenu",
        message: "---- UPDATE MENU: Please select an option. ----",
        choices: [
            "Update employee", 
            "Update employee manager",
            "-------- RETURN TO MAIN MENU --------"
        ]
    }
];

const deleteMenu = [
    {
        type: "list",
        name: "deleteMenu",
        message: "---- DELETE MENU: Please select an option. ----",
        choices: [
            "Delete employee", 
            "Delete role",
            "Delete department",
            "-------- RETURN TO MAIN MENU --------"
        ]
    }
];

const addDepartment = [
    {
        type: "input",
        name: "departmentName",
        message: "Please input the new department's name."
    }
];

const addRole = [
    {
        type: "input",
        name: "roleTitle",
        message: "Please input the new role's title."
    },
    {
        type: "input",
        name: "roleSalary",
        message: "Please input the new role's base salary."
    },
    {
        type: "list",
        name: "roleDepartment",
        message: "Please input which department this role belongs to.",
        choices: currentDepartments
    }
];

const addEmployee = [
    {
        type: "input",
        name: "employeeFName",
        message: "Please input the new employee's first name."
    },
    {
        type: "input",
        name: "employeeLName",
        message: "Please input the new employee's last name."
    },
    {
        type: "list",
        name: "employeeRole",
        message: "Please input the new employee's role.",
        choices: currentRoles
    }
];

const updateEmployee = [];

const updateEmployeeManager = [];

const viewEmployeesByManager = [];

const deleteDepartment =[];

const deleteRole = [];

const deleteEmployee = [];

module.exports = {
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
    updateEmployee,
    updateEmployeeManager,
    viewEmployeesByManager,
    deleteDepartment,
    deleteRole,
    deleteEmployee
}