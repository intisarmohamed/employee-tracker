USE company_db;

-- view all departments
SELECT * FROM department;

-- view all roles
SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON role.departmentId = department.id ORDER BY department.name;

-- view all employees
SELECT employee_role.firstName, employee_role.lastName, title, salary, name
FROM employee employee_role 
LEFT JOIN role 
ON employee_role.roleId=role.id 
LEFT JOIN department
ON role.departmentId=department.id;

-- insert department
INSERT INTO department (name) VALUES ('Finance')

-- insert role
INSERT INTO role (title, salary, departmentId) VALUES ('Junior', 1000, 3)

-- insert employee
INSERT INTO employee (firstName, lastName, roleId, managerId) VALUES ('Bob', 'Smith', 2, 5)


-- work bench
DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(100)NOT NULL,
PRIMARY KEY(id)
 );
 
CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(100)NOT NULL,
salary DECIMAL(6,2) NOT NULL,
departmentId INT,
FOREIGN KEY(departmentId) REFERENCES department(id) ON DELETE CASCADE,
PRIMARY KEY(id)
 );

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
firstName VARCHAR(100)NOT NULL,
lastName VARCHAR(100)NOT NULL,
roleId INT,
managerId INT,
FOREIGN KEY(roleId) REFERENCES role(id) ON DELETE SET NULL,
FOREIGN KEY(managerId) REFERENCES employee(id) ON DELETE SET NULL,
PRIMARY KEY(id)
 ); 