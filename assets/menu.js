const inquirer = require("inquirer");

const menu = [
    {
        type: "list",
        name: "mainMenu",
        message: "Main Menu - Please select an option.",
        choices: [
            new inquirer.Separator("-- READ --"), "View all employees", "View all departments", "View all roles", "View all Employees", "View budget", 
            new inquirer.Separator("-- CREATE --"), "Create new employee", "Create new role","Create new department",
            new inquirer.Separator("-- UPDATE --"), "Update employee", "Update employee manager", 
            new inquirer.Separator("-- DELETE --"), "Delete employee", "Delete role","Delete department" ]
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

module.exports = {
    menu,
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
    deleteEmployee
}