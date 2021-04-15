const inquirer = require("inquirer");

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

const createMenu =[
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
        type: "input",
        name: "employeeRole",
        message: "Please input the new employee's role."
    }
];

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
                    process.exit(0);
            }
        })
}

const viewMenuSelection = () => {
    inquirer.prompt(viewMenu)
        .then((selection) => {
            switch (selection.viewMenu){
                case "View all employees":
                    console.log("Employees here");
                    viewMenuSelection();
                    break;
                case "View all departments":
                    console.log("Departments here");
                    viewMenuSelection();
                    break;
                case "View all roles":
                    console.log("Roles here");
                    viewMenuSelection();
                    break;
                case "View budget":
                    console.log("Budget here");
                    viewMenuSelection();
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
}