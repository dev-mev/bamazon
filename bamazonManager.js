const inquirer = require("inquirer");
require("console.table");
const products = require("./products.js");
const validation = require("./validation");

function viewProducts(callback) {
  products.getProductsSummary((err, res) => {
    console.table(res);

    if (callback) {
      callback();
    }
  });
}

function viewLowInventory() {
  products.getProductsSummary((err, res) => {
    console.table(res);
  }, true);
}

function addInventory() {
  viewProducts(() => {
    inquirer
      .prompt([
        {
          name: "itemToAdd",
          message: "Enter the item number of the item you'd like to add more of.",
          validate: validation.validateNumeric
        },
        {
          name: "numberAdded",
          message: "How many would you like to add?",
          validate: validation.validateNumeric
        }
      ])
      .then((answer) => {
        products.getProductsSummary((err, res) => {
          let chosenItem;
          for (let i = 0; i < res.length; i++) {
            if (res[i].item_id.toString() === answer.itemToAdd) {
              chosenItem = res[i];
            }
          }
          const newQuantity = parseInt(answer.numberAdded) + chosenItem.stock_quantity;

          products.updateProducts([
            {
              stock_quantity: newQuantity
            },
            {
              item_id: chosenItem.item_id
            }
          ]);
        });
        console.log("Product inventory updated.");
      });
  });
}

function addProduct() {
  products.getDepartments((err, depts) => {
    inquirer
      .prompt([
        {
          name: "newProductName",
          message: "Enter the name of the product:",
          validate: validation.validateText
        },
        {
          name: "newProductDept",
          message: "Enter the department:",
          type: "list",
          choices: depts.map(dept => ({ name: dept.department_name, value: dept.department_id }))
        },
        {
          name: "newProductPrice",
          message: "Enter the sales price of the product:",
          validate: validation.validateNumeric
        },
        {
          name: "newProductQuantity",
          message: "Enter the starting quantity:",
          validate: validation.validateNumeric
        }
      ])
      .then((answer) => {
        products.addProduct([
          {
            product_name: answer.newProductName,
            department_id: answer.newProductDept,
            price: answer.newProductPrice,
            stock_quantity: answer.newProductQuantity
          }
        ]);
        console.log("Item added");
      });
  });
}

function showMenu() {
  inquirer
    .prompt([
      {
        name: "managerOptions",
        type: "list",
        message: "What would you like to do?",
        choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]
      }
    ]).then((answer) => {
      switch (answer.managerOptions) {
      case "View products for sale":
        viewProducts();
        break;
      case "View low inventory":
        viewLowInventory();
        break;
      case "Add to inventory":
        addInventory();
        break;
      case "Add new product":
        addProduct();
        break;
      default:
        break;
      }
    });
}

showMenu();
