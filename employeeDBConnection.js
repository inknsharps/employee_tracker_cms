require("dotenv").config();
const mysql = require("mysql");
const menu = require("./assets/menu.js");

// MySQL connection details
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.USER,
    password: process.env.PASS,
    database: "employee_db"
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    menu.mainMenuSelection(menu.mainMenu);
    connection.end();
});