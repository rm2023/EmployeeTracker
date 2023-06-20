const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection({
  host: 'localhost',
  // MySQL username,
  user: 'root',
  // MySQL password
  password: 'Rm2023!',
  database: 'tracker_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the tracker_db database.');
  startMenu();
});

const startMenu = () => {
  inquirer.prompt({
    message: 'What would you like to do?',
    name: 'menu',
    type: 'list',
    choices: [
      'View all departments',
      'View all jobs',
      'View all employees',
      'Add a department',
      'Add a job',
      'Add an employee',
      'Update employee job',
      'Exit',
    ],
  })
    .then(response => {
      switch (response.menu) {
        case 'View all departments':
          viewDepartment();
          break;
        case 'View all jobs':
          viewJobs();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a job':
          addJob();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update employee job':
          updateEmployee();
          break;
        case "Exit":
          db.end();
          break;
        default:
          db.end();
      }
    });
};

const viewDepartment = () => {
  db.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
};

const viewJobs = () => {
  db.query('SELECT * FROM job', function (err, res) {
    if (err) throw err;
    console.table(res);
    startMenu();
  });
};

const viewEmployees = () => {
  db.query(
    'SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id FROM ((department JOIN job ON department.id = job.department_id) JOIN employee ON job.id = employee.job_id);',
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startMenu();
    }
  );
};

const addDepartment = () => {
  inquirer.prompt([
    {
      name: 'department',
      type: 'input',
      message: 'What is the department name?',
    },
  ])
    .then(answer => {
      db.query(
        'INSERT INTO department (dept_name) VALUES (?)',
        [answer.department],
        function (err, res) {
          if (err) throw err;
          console.log('Department added!');
          startMenu();
        }
      );
    });
};

const addJob = () => {
  inquirer.prompt([
    {
      name: 'jobTitle',
      type: 'input',
      message: 'What is the job title?',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What is the salary for this job?',
    },
    {
      name: 'deptId',
      type: 'input',
      message: 'What is the department ID number?',
    },
  ])
    .then(answer => {
      db.query(
        'INSERT INTO job (title, salary, department_id) VALUES (?, ?, ?)',
        [answer.jobTitle, answer.salary, answer.deptId],
        function (err, res) {
          if (err) throw err;
          console.log('Job added!');
          startMenu();
        }
      );
    });
};

const addEmployee = () => {
  inquirer.prompt([
    {
      name: 'nameFirst',
      type: 'input',
      message: "What is the employee's first name?",
    },
    {
      name: 'nameLast',
      type: 'input',
      message: "What is the employee's last name?",
    },
    {
      name: 'jobId',
      type: 'input',
      message: "What is the employee's job id?",
    },
    {
      name: 'managerId',
      type: 'input',
      message: 'What is the manager Id?',
    },
  ])
    .then(answer => {
      db.query(
        'INSERT INTO employee (first_name, last_name, job_id, manager_id) VALUES (?, ?, ?, ?)',
        [answer.nameFirst, answer.nameLast, answer.jobId, answer.managerId],
        function (err, res) {
          if (err) throw err;
          console.log('Employee added!');
          startMenu();
        }
      );
    });
};

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'Enter employee id',
      },
      {
        name: 'jobId',
        type: 'input',
        message: 'Enter new job id',
      },
    ])
    .then(answer => {
      db.query(
        'UPDATE employee SET job_id=? WHERE id=?',
        [answer.jobId, answer.id],
        function (err, res) {
          if (err) throw err;
          console.log('Employee updated!');
          startMenu();
        }
      );
    });
};
