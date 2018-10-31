const inquirer = require("inquirer");
require("console.table");
const products = require("./products.js");
const validation = require("./validation");

function viewProductSales() {
  products.getSalesInfo((err, res) => {
    console.table(res);
  });
}

function createDept() {
  inquirer
    .prompt([
      {
        name: "deptName",
        message: "Enter the name of the department:",
        validate: validation.validateText
      },
      {
        name: "overhead",
        message: "Enter the overhead cost:",
        validate: validation.validateNumeric
      }
    ])
    .then((answer) => {
      products.addDepartment([
        {
          department_name: answer.deptName,
          overhead_costs: answer.overhead
        }
      ]);
      console.log("Department added");
    });
}

inquirer
  .prompt([
    {
      name: "supervisorOptions",
      type: "list",
      message: "What would you like to do?",
      choices: ["View product sales by department", "Create new department"]
    }
  ]).then((answer) => {
    switch (answer.supervisorOptions) {
    case "View product sales by department":
      viewProductSales();
      break;
    case "Create new department":
      createDept();
      break;
    default:
      break;
    }
  });
