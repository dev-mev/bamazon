const inquirer = require("inquirer");
require("console.table");
const products = require("./products.js");

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
        validate: (value) => {
          if (value === "") {
            console.log("\nThis field is required.");
            return false;
          }
          return true;
        }
      },
      {
        name: "overhead",
        message: "Enter the overhead cost:",
        validate: (value) => {
          if (isNaN(value) === false && value !== "") {
            return true;
          }
          console.log("\nInvalid number");
          return false;
        }
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
