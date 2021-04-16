DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
	id INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE role (
	id INTEGER NOT NULL AUTO_INCREMENT,
	title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
	department_id INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INTEGER NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	role_id INT NOT NULL,
    manager_id INT,
	PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Marketing"), ("Finance"), ("Business Affairs"), ("IT");

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Manager", 65000, 1), ("Marketing Associate", 45000, 1), ("Lead Developer", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jane", "One", 1), ("John", "Two", 2), ("Vito", "Three", 3);

-- DELETE FROM employee WHERE id = ;
-- DELETE FROM role WHERE id = 5;

-- SELECT * FROM department;
-- SELECT * FROM role;
-- SELECT * FROM employee;

-- SELECT employee.id, first_name, last_name, title, salary, name, manager_id FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;
-- SELECT name = "IT", title, salary, first_name, last_name FROM department INNER JOIN role on department.id = role.department_id INNER JOIN employee on role.id = employee.role_id;-- 