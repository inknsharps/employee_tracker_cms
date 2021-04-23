const inquirer = require("inquirer");
const mysql = require("mysql");

/* The explanation for this hot mess of including and using the MySQL module here, and making separate arrays for the current information in the application:

Inquirer is promised based, while MySQL appears to use callback in a callback, so the JS event loop deals with inquirer first, then MySQL's functions.

Therefore, trying to use the MySQL queries directly as choices for the inquirer prompts just doesn't work. You get thrown an error that nothing is in the choices array (because it hasn't executed yet!).

Thanks JavaScript. 
*/ 

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
    console.log("Retrieving database records...");
    connection.end();
});

let currentDepartments;
const renderDepartments = () => {
    currentDepartments = [];
    connection.query("SELECT id, dept_name FROM department", (err, res) => {
        if (err) throw err;
        res.forEach(index => currentDepartments.push(index.dept_name));
    })
}

let currentRoles;
const renderRoles = () => {
    currentRoles = [];
    connection.query("SELECT id, title FROM role", (err, res) => {
        if (err) throw err;
        res.forEach(index => currentRoles.push(index.title));
    })    
}

let currentEmployees;
const renderEmployees = () => {
    currentEmployees = [];
    connection.query("SELECT id, first_name, last_name FROM employee", (err, res) => {
        if (err) throw err;
        res.forEach(index => currentEmployees.push(`${index.id} - ${index.first_name} ${index.last_name}`));
    })
}

renderDepartments();
renderRoles();
renderEmployees();

/* Inquirer Menu Arrays */ 
const mainMenu = [
    {
        type: "list",
        name: "mainMenu",
        message: "\n ---------------------------------------- \n MAIN MENU - Please select an option. \n ---------------------------------------- \n",
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
        message: "\n ---------------------------------------- \n VIEW MENU: Please select an option. \n ---------------------------------------- \n",
        choices: [
            "View all employees", 
            "View all employees by manager",
            "View all departments", 
            "View all roles", 
            "View budget", 
            new inquirer.Separator(" "),
            "-------- RETURN TO MAIN MENU --------"
        ]
    }
];

const createMenu = [
    {
        type: "list",
        name: "createMenu",
        message: "\n ---------------------------------------- \n CREATE MENU: Please select an option. \n ---------------------------------------- \n",
        choices: [
            "Create new employee", 
            "Create new role",
            "Create new department",
            new inquirer.Separator(" "),
            "-------- RETURN TO MAIN MENU --------"
        ]
    }
];

const updateMenu = [
    {
        type: "list",
        name: "updateMenu",
        message: "\n ---------------------------------------- \n UPDATE MENU: Please select an option. \n ---------------------------------------- \n ",
        choices: [
            "Update employee roles", 
            "Update employee manager",
            new inquirer.Separator(" "),
            "-------- RETURN TO MAIN MENU --------"
        ]
    }
];

const deleteMenu = [
    {
        type: "list",
        name: "deleteMenu",
        message: "\n ---------------------------------------- \n DELETE MENU: Please select an option. \n ---------------------------------------- \n ",
        choices: [
            "Delete employee", 
            "Delete role",
            "Delete department",
            new inquirer.Separator(" "),
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

const updateEmployeeManager = [
    {
        type: "list",
        name: "selectedEmployee",
        message: "Please select a current employee.",
        choices: currentEmployees
    },
    {
        type: "list",
        name: "assignedManager",
        message: "Please input who this employee reports to.",
        choices: currentEmployees
    }
];

const viewDepartmentBudget = [
    {
        type: "list",
        name: "department",
        message: "Please select which department to check the budget for.",
        choices: currentDepartments
    }
]

const deleteDepartment =[
    {
        type: "list",
        name: "deleteDepartment",
        message: "Please select which department to delete.",
        choices: currentDepartments
    }
];

const deleteRole = [
    {
        type: "list",
        name: "deleteRole",
        message: "Please select which role to delete.",
        choices: currentRoles
    }
];

const deleteEmployee = [
    {
        type: "list",
        name: "deleteEmployee",
        message: "Please select which employee to delete.",
        choices: currentEmployees
    }
];

module.exports = {
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
    deleteEmployee,
    renderDepartments,
    renderRoles,
    renderEmployees
}