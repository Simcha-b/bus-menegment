const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "sb96616",
  database: "bus_menegment",
});
module.exports = con;
