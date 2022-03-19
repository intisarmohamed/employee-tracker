USE company_db;

INSERT INTO department (name) VALUES
("Human Resources"),
("Finances"),
("Marketing"),
("Managment");

INSERT INTO role (title, salary, department_id) VALUES
("HR Director", 50000, 1),
("Finance Manager", 40000, 2),
("Finance Advisor ", 30000, 2),
("Marketing Manager", 45000, 3),
("Marketing Advisor", 35000, 3),
("Management leader", 20000, 4);

INSERT INTO employee (first_name, last_name, role_id) VALUES
("Melisa", "Swift", 1),
("Loius", "Pace", 1),
-- managers (3)
("Sarah", "Jane", 2),
("Elizabeth ", "Greens", 2),
("Adam", "Davis", 2),
("Matthew", "Jones", 3),
("Nella", "Plumber", 3),
-- managers (8)
("Bob", "Smith", 3),
("John", "Kane", 4),
-- managers (10)
("David", "Williams", 5),
("Alex", "Jones", 6);

UPDATE employee SET manager_id = 3 WHERE (id = 1);
UPDATE employee SET manager_id = 8 WHERE (id = 2);
UPDATE employee SET manager_id = 10 WHERE (id = 4);
UPDATE employee SET manager_id = 8 WHERE (id = 5);
UPDATE employee SET manager_id = 3 WHERE (id = 6);
UPDATE employee SET manager_id = 3 WHERE (id = 7);
UPDATE employee SET manager_id = 10 WHERE (id = 9);
UPDATE employee SET manager_id = 3 WHERE (id = 11);