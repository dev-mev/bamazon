const inquirer = require("inquirer");
require("console.table");
const products = require("./products.js");
const validation = require("./validation.js");

function prompt() {
  inquirer
    .prompt([
      {
        name: "product_choice",
        message: "Please enter the item ID number of the product you would like to purchase:",
        validate: validation.validateNumeric
      },
      {
        name: "quantity",
        message: "How many would you like to buy?",
        validate: validation.validateNumeric
      }
    ])
    .then((answer) => {
      products.GetProductsWithSales((err, res) => {
        let chosenItem;
        for (let i = 0; i < res.length; i++) {
          if (res[i].item_id.toString() === answer.product_choice) {
            chosenItem = res[i];
          }
        }

        if (chosenItem.stock_quantity >= answer.quantity) {
          console.log("We will ship your item '"
            + chosenItem.product_name + "' (quantity: "
            + answer.quantity + ") within three business days.");
          const quantityAfterPurchase = chosenItem.stock_quantity - parseInt(answer.quantity);
          const totalProductSales = (chosenItem.price * parseInt(answer.quantity)) + chosenItem.product_sales;
          products.updateProducts([
            {
              stock_quantity: quantityAfterPurchase,
              product_sales: totalProductSales
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

// displays all products when app starts
products.getProductsSummary((err, res) => {
  console.table(res);
  prompt();
});
