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
  runQuery(
    `SELECT
      item_id,
      product_name,
      department_name,
      price,
      stock_quantity
    FROM products
    LEFT JOIN departments 
    ON products.department_id = departments.department_id`,
    null, runFunction
  );
}

function queryAllProducts(runFunction) {
  runQuery("SELECT * FROM products", null, runFunction);
}

function updateProducts(queryArgs) {
  runQuery("UPDATE products SET ? WHERE ?", queryArgs, null);
}

function getLowStock(runFunction) {
  runQuery(
    `SELECT
      item_id,
      product_name,
      department_name,
      price,
      stock_quantity
    FROM products
    LEFT JOIN departments 
    ON products.department_id = departments.department_id
    WHERE stock_quantity < 5`,
    null, runFunction
  );
}

function addProduct(queryArgs) {
  runQuery("INSERT INTO products SET ?", queryArgs, null);
}

function getSalesInfo(table) {
  runQuery(
    `SELECT
      products.department_id,
      department_name,
      SUM(overhead_costs) AS overhead,
      SUM(product_sales) AS sales,
      SUM(product_sales - overhead_costs) AS profit
    FROM departments
    LEFT JOIN products
      ON products.department_id = departments.department_id
    GROUP BY departments.department_id`,
    null, table
  );
}

function addDepartment(queryArgs) {
  runQuery("INSERT INTO departments SET ?", queryArgs, null);
}

module.exports = {
  getAllProducts,
  updateProducts,
  getLowStock,
  addProduct,
  getSalesInfo,
  addDepartment,
  queryAllProducts
};
