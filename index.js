require('dotenv').config();
const express = require('express');
 mysql = require('mysql2');
const inquier = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Database configuration
const dbConfig =   {
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME
}

// Connect to database
const db = mysql.createConnection(dbConfig,
  console.log(` +++ Connected to ${process.env.DB_NAME}`)
);

// prompts user with list of options
function options() {
  inquirer
      .prompt({
          name: 'action',
          type: 'list',
          message: 'What would you like to do?',
          choices: [
                  'View all departments',
                  'View all roles',
                  'View all employees',
                  'Add a department',
                  'Add a role',
                  'Add a employee',
                  'Update an employee role',
                  'EXIT'
                  ]
          }).then(function (answer) {
              switch (answer.action) {
                  case 'View all employees':
                      viewEmployees();
                      break;
                  case 'View all departments':
                      viewDepartments();
                      break;
                  case 'View all roles':
                      viewRoles();
                      break;
                  case 'Add an employee':
                      addEmployee();
                      break;
                  case 'Add a department':
                      addDepartment();
                      break;
                  case 'Add a role':
                      addRole();
                      break;
                  case 'Update employee role':
                      updateRole();
                      break;
                  case 'Delete an employee':
                      deleteEmployee();
                      break;
                  case 'EXIT': 
                      exitApp();
                      break;
                  default:
                      break;
              }
      })
};

// view all departments in the database
function viewDepartments() {
  var query = 'SELECT * FROM department';
  connection.query(query, function(err, res) {
      if(err)throw err;
      console.table('All Departments:', res);
      options();
  })
};

// view all roles in the database
function viewRoles() {
  var query = 'SELECT * FROM roles';
  connection.query(query, function(err, res){
      if (err) throw err;
      console.table('All Roles:', res);
      options();
  })
};

// view all employees in the database
function viewEmployees() {
  var query = 'SELECT * FROM employee';
  connection.query(query, function(err, res) {
      if (err) throw err;
      console.log(res.length + ' employees found!');
      console.table('All Employees:', res); 
      options();
  })
};

// add a department to the database
function addDepartment() {
  inquirer
      .prompt([
          {
              name: 'newDepartment', 
              type: 'input', 
              message: 'What is the new department name?'
          }
          ]).then(function (answer) {
              connection.query(
                  'INSERT INTO department SET ?',
                  {
                      name: answer.newDepartment
                  });
              var query = 'SELECT * FROM department';
              connection.query(query, function(err, res) {
              if(err)throw err;
              console.log('The new department has been added!');
              console.table('All Departments:', res);
              options();
              })
          })
};

// add a role to the database
function addRole() {
  connection.query('SELECT * FROM department', function(err, res) {
      if (err) throw err;
  
      inquirer 
      .prompt([
          {
              name: 'new_role',
              type: 'input', 
              message: "What is the name of the new role?"
          },
          {
              name: 'salary',
              type: 'input',
              message: 'What is the salary of this role? (Enter a number)'
          },
          {
              name: 'Department',
              type: 'list',
              choices: function() {
                  var deptArry = [];
                  for (let i = 0; i < res.length; i++) {
                  deptArry.push(res[i].name);
                  }
                  return deptArry;
              },
          }
      ]).then(function (answer) {
          let department_id;
          for (let a = 0; a < res.length; a++) {
              if (res[a].name == answer.Department) {
                  department_id = res[a].id;
              }
          }
  
          connection.query(
              'INSERT INTO role SET ?',
              {
                  title: answer.new_role,
                  salary: answer.salary,
                  department_id: department_id
              },
              function (err, res) {
                  if(err)throw err;
                  console.log('The new role has been added!');
                  console.table('All Roles:', res);
                  options();
              })
      })
  })
};

// add an employee to the database
function addEmployee() {
  connection.query('SELECT * FROM role', function (err, res) {
      if (err) throw err;
      inquirer
          .prompt([
              {
                  name: 'first_name',
                  type: 'input', 
                  message: "What is the employee's fist name? ",
              },
              {
                  name: 'last_name',
                  type: 'input', 
                  message: "What is the employee's last name? "
              },
              {
                  name: 'role', 
                  type: 'list',
                  choices: function() {
                  var roleArray = [];
                  for (let i = 0; i < res.length; i++) {
                      roleArray.push(res[i].title);
                  }
                  return roleArray;
                  },
                  message: "What is this employee's role? "
              },
              {
                name: 'manager_id',
                type: 'input', 
                message: "What is the employee's manager's ID? "
              },
              ]).then(function (answer) {
                  let role_id;
                  for (let a = 0; a < res.length; a++) {
                      if (res[a].title == answer.role) {
                          role_id = res[a].id;
                          console.log(role_id)
                      }                  
                  }  
                  connection.query(
                  'INSERT INTO employee SET ?',
                  {
                      first_name: answer.first_name,
                      last_name: answer.last_name,
                      role_id: role_id,
                      manager_id: answer.manager_id,
                  },
                  function (err) {
                      if (err) throw err;
                      console.log('New employee has been added!');
                      options();
                  })
              })
      })
};


// update a role in the database
function updateRole() {

};

//  delete an employee
function deleteEmployee() {

};

// exit the app
function exitApp() {
  connection.end();
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
