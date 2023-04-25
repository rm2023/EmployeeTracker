const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
require("console.table")
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Rm2023!',
    database: 'tracker_db'
  },
  console.log(`Connected to the tracker_db database.`)
);
const questions = [
  {
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: ["view all employees", "add employee", "update employee role", "view all employees", "add role", "view all departments", "add department"

    ]
  },

];


inquirer
  .prompt(questions)
  .then((response) => {
    switch (response.choice) {
      case "view all employees": viewAlldepartments();
        break
      case "add employee": viewRoles();
        break
      case "update employee role": viewEmployees();
        break
      case "add role": addDepartment();
        break
      case "view all departments": addRole();
        break
      case "add department": addEmployee();
        break
        case "add department": updateEmployee();
        break
    }
  });

  function viewAlldepartments() {
  
    db.query('SELECT * FROM department', function (err, results) {
      console.table(results);
    });
  }
  function viewRoles() {
  
    db.query('SELECT * FROM title', function (err, results) {
      console.table(results);
    });
  }
  function viewEmployees() {
  
    db.query('SELECT * FROM department', function (err, results) {
      console.table(results);
    });
  }
  function addDepartment() {
  
    db.query('SELECT * FROM department', function (err, results) {
      console.table(results);
    });
  }
  function addRole() {
  
    db.query('SELECT * FROM department', function (err, results) {
      console.table(results);
    });
  }
  function addEmployee() {
  
    db.query('SELECT * FROM department', function (err, results) {
      console.table(results);
    });
  }
  function updateEmployee() {
  
    db.query('SELECT * FROM department', function (err, results) {
      console.table(results);
    });
  }



