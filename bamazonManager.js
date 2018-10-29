const inquirer = require("inquirer");
require("console.table");
const products = require("./products.js");

function viewProducts(callback) {
  products.getAllProducts((err, res) => {
    console.table(res);

    if (callback != null) {
      callback();
    }
  });
}

function viewLowInventory() {
  products.getLowStock((err, res) => {
    console.table(res);
  });
}

function addInventory() {
  viewProducts(() => {
    inquirer
      .prompt([
        {
          name: "itemToAdd",
          message: "Enter the item number of the item you'd like to add more of."
        },
        {
          name: "numberAdded",
          message: "How many would you like to add?"
        }
      ])
      .then((answer) => {
        products.getAllProducts((err, res) => {
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
  inquirer
    .prompt([
      {
        name: "newProductName",
        message: "Enter the name of the product:",
        validate: (value) => {
          if (value === "") {
            console.log("\nThis field is required.");
            return false;
          }
          return true;
        }
      },
      {
        name: "newProductDept",
        message: "Enter the department name:",
        validate: (value) => {
          if (value === "") {
            console.log("\nThis field is required.");
            return false;
          }
          return true;
        }
      },
      {
        name: "newProductPrice",
        message: "Enter the sales price of the product:",
        validate: (value) => {
          if (isNaN(value) === false && value !== "") {
            return true;
          }
          console.log("\nInvalid number");
          return false;
        }
      },
      {
        name: "newProductQuantity",
        message: "Enter the starting quantity:"
      }
    ])
    .then((answer) => {
      products.addProduct([
        {
          product_name: answer.newProductName,
          department_name: answer.newProductDept,
          price: answer.newProductPrice,
          stock_quantity: answer.newProductQuantity
        }
      ]);
      console.log("Item added");
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
