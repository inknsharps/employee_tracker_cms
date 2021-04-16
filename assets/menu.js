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

let currentEmployees = [];
connection.query("SELECT id, first_name, last_name FROM employee", (err, res) => {
    if (err) throw err;
    res.forEach(index => currentEmployees.push(`${index.id} - ${index.first_name} ${index.last_name}`));
})

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
            "Update employee roles", 
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

const updateEmployeeRole = [
    {
        type: "list",
        name: "selectedEmployee",
        message: "Please select a current employee.",
        choices: currentEmployees
    },
    {
        type: "list",
        name: "newRole",
        message: "Please input the employee's new role.",
        choices: currentRoles
    }
];

const updateEmployeeManager = [];

const viewEmployeesByManager = [];

const viewDepartmentBudget = [
    {
        type: "list",
        name: "department",
        message: "Please select which department to check the budget for.",
        choices: currentDepartments
    }
]

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
    updateEmployeeRole,
    updateEmployeeManager,
    viewEmployeesByManager,
    viewDepartmentBudget,
    deleteDepartment,
    deleteRole,
    deleteEmployee
}