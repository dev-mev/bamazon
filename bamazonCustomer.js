const inquirer = require("inquirer");
const products = require("./products.js");

function prompt() {
  inquirer
    .prompt([
      {
        name: "product_choice",
        message: "Please enter the item number of the product you would like to purchase.",
        validate: (value) => {
          if (isNaN(value) === false && value !== "") {
            return true;
          }
          console.log("\nInvalid number");
          return false;
        }
      },
      {
        name: "quantity",
        message: "How many would you like to buy?",
        validate: (value) => {
          if (isNaN(value) === false && value !== "") {
            return true;
          }
          console.log("\nInvalid number");
          return false;
        }
      }
    ])
    .then(function (answer) {
      products.getAllProducts(function (err, res) {
        let chosenItem;
        for (let i = 0; i < res.length; i++) {
          if (res[i].item_id.toString() === answer.product_choice) {
            chosenItem = res[i];
          }
        }

        if (chosenItem.stock_quantity > answer.quantity) {
          console.log("We will ship your item '"
            + chosenItem.product_name + "' (quantity: "
            + answer.quantity + ") within three business days.");
          const quantityAfterPurchase = chosenItem.stock_quantity - parseInt(answer.quantity);
          products.updateProducts([
            {
              stock_quantity: quantityAfterPurchase
            },
            {
              item_id: chosenItem.item_id
            }
          ]);
          console.log("Your total is $" + chosenItem.price * parseInt(answer.quantity));
        } else {
          console.log("Sorry, we only have " + chosenItem.stock_quantity + " available.");
        }
      });
    });
}

products.getAllProducts(function (err, res) {
  for (let i = 0; i < res.length; i++) {
    console.log("ITEM NUMBER: " + res[i].item_id + "\n"
    + "PRODUCT: " + res[i].product_name + "\n"
    + "DEPARTMENT: " + res[i].department_name + "\n"
    + "PRICE: " + res[i].price + "\n"
    + "QUANTITY AVAILABLE: " + res[i].stock_quantity + "\n");
  }
  prompt();
});
