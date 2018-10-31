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

function getProductsSummary(runFunction, lowStockOnly) {
  let query = `
    SELECT
      item_id,
      product_name,
      department_name,
      price,
      stock_quantity
    FROM products
    LEFT JOIN departments 
    ON products.department_id = departments.department_id`;
  if (lowStockOnly) {
    query += " WHERE stock_quantity < 5";
  }
  runQuery(query, null, runFunction);
}

function GetProductsWithSales(runFunction) {
  runQuery("SELECT * FROM products", null, runFunction);
}

function updateProducts(queryArgs) {
  runQuery("UPDATE products SET ? WHERE ?", queryArgs, null);
}

function addProduct(queryArgs) {
  runQuery("INSERT INTO products SET ?", queryArgs, null);
}

function getSalesInfo(table) {
  runQuery(
    `SELECT
      departments.department_id,
      department_name,
      IFNULL(SUM(overhead_costs), 0) AS overhead,
      IFNULL(SUM(product_sales),0) AS sales,
      IFNULL(SUM(product_sales - overhead_costs), 0) AS profit
    FROM departments
    LEFT JOIN products
      ON products.department_id = departments.department_id
    GROUP BY departments.department_id`,
    null, table
  );
}

function getDepartments(runFunction) {
  runQuery("SELECT * FROM departments", null, runFunction);
}

function addDepartment(queryArgs) {
  runQuery("INSERT INTO departments SET ?", queryArgs, null);
}

module.exports = {
  getProductsSummary,
  updateProducts,
  addProduct,
  getSalesInfo,
  getDepartments,
  addDepartment,
  GetProductsWithSales
};
