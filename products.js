const mysql = require("mysql");
require("dotenv").config();

function connect() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
  });
}

function runQuery(query, queryArgs, callback) {
  const connection = connect();
  connection.query(query, queryArgs, callback);
  connection.end();
}

function getAllProducts(runFunction) {
  runQuery("SELECT * FROM products", null, runFunction);
}

function updateProducts(queryArgs) {
  runQuery("UPDATE products SET ? WHERE ?", queryArgs, null);
}

function getLowStock(runFunction) {
  runQuery("SELECT * FROM products WHERE stock_quantity < 5", null, runFunction);
}

function addProduct(queryArgs) {
  runQuery("INSERT INTO products SET ?", queryArgs, null);
}

module.exports = {
  getAllProducts,
  updateProducts,
  getLowStock,
  addProduct
};
