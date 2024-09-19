// Get the client
const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(3001, () => {
  console.log("server is running on port 3001");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });  
});

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "sb96616",
  database: "bus_menegment",
});

app.post("/insert", (req, res) => {
  const { company_name, order_name, travel_details } = req.body;
  console.log(company_name, order_name, travel_details);

  connection.query(
    "INSERT INTO orders ( company_name, order_name, travel_details) VALUES ( ?, ?, ?)",
    [company_name, order_name, travel_details],
    (error, results) => {
      if (error) {
        console.log(error);
        res.json({
          status: false,
          message: "There are some error with query",
        });
      } else {
        res.json({
          status: true,
          data: results,
          message: "User registered sucessfully",
        });
      }
    }
  );
});
