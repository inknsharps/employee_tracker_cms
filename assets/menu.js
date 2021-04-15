const inquirer = require("inquirer");

/* Inquirer Arrays */ 
const mainMenu = [
    {
        type: "list",
        name: "mainMenu",
        message: "Main Menu - Please select an option.",
        choices: [
            new inquirer.Separator("-------- READ --------"), "View all employees", "View all departments", "View all roles", "View all Employees", "View budget", 
            new inquirer.Separator("-------- CREATE --------"), "Create new employee", "Create new role","Create new department",
            new inquirer.Separator("-------- UPDATE --------"), "Update employee", "Update employee manager", 
            new inquirer.Separator("-------- DELETE --------"), "Delete employee", "Delete role","Delete department",
            "-------- QUIT --------"
        ]
    }
];

const addDepartment = [];

const addRole = [];

const addEmployee = [];

const viewDepartment = [];

const viewRole = [];

const viewEmployee = [];

const updateEmployee = [];

const updateEmployeeManager = [];

const viewEmployeesByManager = [];

const deleteDepartment =[];

const deleteRole = [];

const deleteEmployee = [];

/* Functions */
const mainMenuSelection = (menu) => {
    inquirer.prompt(menu)
        .then((selection) => {
            executeSelection(selection.mainMenu);
        })
}

const executeSelection = (selection) => {
    switch (selection){
        case "-------- QUIT --------":
            console.log("Exiting program...");
            break;
    }
}

module.exports = {
    mainMenu,
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
    deleteEmployee,
    mainMenuSelection,
    executeSelection
}