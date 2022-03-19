require("dotenv").config();
const inquirer = require("inquirer");
const Db = require("./db/db");

const {
  selectFromDepartment,
  selectFromRole,
  selectFromEmployee,
} = require("./utils/selectAllFrom");

const {
  initialQuestions,
  departmentQuestions,
  viewDepartmentQuestion,
  deleteDepartmentQuestion,
  roleQuestions,
  updateRoleQuestions,
  deleteRoleQuestion,
  employeeQuestions,
  updateManagerQuestions,
  deleteEmployeeQuestion,
  viewBudget,
} = require("./utils/questions");

const start = async () => {
  const db = new Db({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await db.start();

  let active = true;

  while (active) {
    const { option } = await initialQuestions();
    console.log(option);

    // Add/View Department
    if (option === "addDepartment") {
      const { departmentName } = await departmentQuestions(inquirer);
      const query = `INSERT INTO department (name) VALUES ('${departmentName}');`;
      await db.query(query);
      console.log(`Added ${departmentName} into database`);
    }
    if (option === "viewDepartment") {
      const data = await selectFromDepartment(db);
      console.table(data);
    }

    // Add/View Role
    if (option === "addRole") {
      const departments = await selectFromDepartment(db);

      if (departments.length) {
        const questions = await roleQuestions(db);
        const { name, salary, department_id } = await inquirer.prompt(
          questions
        );

        const query = `INSERT INTO role (title, salary, department_id) VALUES ("${name}", "${salary}", "${department_id}");`;
        await db.query(query);
        console.log(`Added ${name} into Role Table!`);
      } else {
        console.warn("[ERROR]: Please enter a department before continuing...");
      }
    }
    if (option === "viewRole") {
      const data = await selectFromRole(db);
      console.table(data);
    }

    // Add/View Employee
    if (option === "addEmployee") {
      const role = await selectFromRole(db);
      // check if roles available
      if (role.length) {
        const questions = await employeeQuestions(db);
        const { firstName, lastName, role_id } = await inquirer.prompt(
          questions
        );

        const query = `INSERT INTO employee (first_name, last_name, role_id) VALUES ("${firstName}","${lastName}","${role_id}");`;
        await db.query(query);
        console.log(`Created ${firstName} ${lastName} as an employee!`);
      } else {
        console.warn("[ERROR]: Please enter a role before continuing...");
      }
    }
    if (option === "viewEmployee") {
      const query =
        'SELECT CONCAT(employee_role.first_name, " ", employee_role.last_name) AS Employee, title as "Role", salary as "Salary",  name as "Department",  CONCAT (employee_manager.first_name, " ", employee_manager.last_name) as "Manager"  FROM employee employee_role LEFT JOIN role ON employee_role.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee employee_manager ON employee_role.manager_id = employee_manager.id;';
      const data = await db.query(query);
      console.table(data);
    }
    if (option === "updateEmployeeRole") {
      const employee = await selectFromEmployee(db);

      if (employee.length) {
        const questions = await updateRoleQuestions(db);
        const { employees, role_id } = await inquirer.prompt(questions);
        const query = `UPDATE employee SET role_id = ${role_id} WHERE id = ${employees};`;
        await db.query(query);
      }
    }
    // if (option === "viewEmployee") {
    //   const questions = await viewDepartmentQuestion(db);
    //   const { department } = await inquirer.prompt(questions);
    //   const query = `SELECT first_name, last_name FROM employee INNER JOIN role ON employee.role_id = role.id WHERE department_id = ${department};`;
    //   console.table(await db.query(query));
    // }
    if (option === "updateEmployeeManager") {
      const employee = await selectFromEmployee(db);

      if (employee.length) {
        const questions = await updateManagerQuestions(db);
        const { employee, manager } = await inquirer.prompt(questions);

        const query = `UPDATE employee SET manager_id = ${manager} WHERE id = ${employee};`;
        await db.query(query);
      }
    }
    if (option === "viewEmployeeDepartment") {
      const questions = await viewDepartmentQuestion(db);
      const { department } = await inquirer.prompt(questions);
      const query = `SELECT first_name, last_name FROM employee INNER JOIN role ON employee.role_id = role.id WHERE department_id = ${department};`;
      console.table(await db.query(query));
    }

    // Delete Options
    if (option === "deleteDepartment") {
      const questions = await deleteDepartmentQuestion(db);
      const { department } = await inquirer.prompt(questions);
      const query = `DELETE FROM department WHERE id = ${department};`;
      await db.query(query);
    }
    if (option === "deleteRole") {
      const questions = await deleteRoleQuestion(db);
      const { role } = await inquirer.prompt(questions);
      const query = `DELETE FROM role WHERE id = ${role}`;
      await db.query(query);
    }
    if (option === "deleteEmployee") {
      const questions = await deleteEmployeeQuestion(db);
      const { employee } = await inquirer.prompt(questions);
      const query = `DELETE FROM employee WHERE id = ${employee};`;
      await db.query(query);
    }
    if (option === "viewBudget") {
      const question = await viewBudget(db);
      const { department } = await inquirer.prompt(question);
      const query = `SELECT SUM(salary) AS Total_Utilized_Budget FROM role WHERE department_id = ${department};`;
      console.table(await db.query(query));
    }

    // Quit
    if (option === "exit") {
      active = false;
      db.stop();
      console.log("Exited application");
    }
  }
};

start();
