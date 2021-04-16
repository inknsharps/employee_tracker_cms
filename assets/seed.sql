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
VALUES ("John", "Doe", 2);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;