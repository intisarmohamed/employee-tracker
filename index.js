const inquirer = require("inquirer");
const mysql = require("mysql");

const displayDepartments = () => {
  // execute mysql query
  db.query("SELECT * FROM department", function (err,results){
    if(err){
      console.log(err);
    }
    console.table("displayDepartment",results)
    askDepartmentQuestions();
  });

const displayRoles = () => {
  // execute mysql query
  db.query("SELECT * FROM roles", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table("display roles", results);
    askRolesQuestions();
  });
  
  // log/table roles
};

const displayEmployees = () => {
   // execute mysql query
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) {
      console.log(err);
    }// log/table employees
    console.table('displayEmployees', results)
  });
  askEmployeeQuestions();
};

const getDepartments = () => {
  // execute mysql query
  // return departments
};

const getRoles = () => {
  // execute mysql query
  // return roles
};

const getEmployees = () => {
  // execute mysql query
  // return employees
};

const constructDepartmentChoices = (departments) => {
  const departmentChoices=["Finance"];
  // return an array of department choices
  return departmentChoices;
};

const constructRoleChoices = (roles) => {
  const  roleChoices=["Financial Analyst","Junior Financial Analyst","Financial Manager"];
  // return an array of role choices
  return roleChoices;
};

const constructEmployeeChoices = (roles) => {
  
  const employeeChoices=["firstname","lastname","manager id","role id"];
  // return an array of employee choices
  return employeeChoices;
};

const db = mysql.createConnection(
  {
    host: 'localhost',
//     // MySQL username,
    user: 'root',
//     // MySQL password
   password: '',
   database: 'classlist_db',
   },
  console.log(`Connected to the classlist_db database.`)
);

const start = () => {
  // declare one question with list of actions
  // prompt question and get answer (action)
  // insert if blocks for all actions
  // if displayDepartments()
  // if displayRoles()
  // if displayEmployees()
  if ("addDepartment") {
    // prompt department questions (name) and get answers
    // construct mysql insert query
    // execute mysql query
  }
  if ("addRole") {
    // get departments from DB
    // pass the departments to a choice constructor function
    // prompt question to select department, title, salary and get answers
    // construct mysql insert query for role
    // execute mysql query
  }
  if ("addEmployee") {
    // get roles from DB
    // get employees from DB
    // pass the roles to a choice constructor function
    // pass the employees to a choice constructor function
    // prompt question to select role, select manager, first name, last name and get answers
    // construct mysql insert query for employee
    // execute mysql query
  }
};

start();
