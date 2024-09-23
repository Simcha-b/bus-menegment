// Get the client
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(3001, () => {
  console.log("server is running on port 3001");
});

const connection = require("./db.js");

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

//יצירת לקוח חדש
app.post("/nuwCustomer", (req, res) => {
  const { name, contact_person, phone, email } = req.body;
  const query = "INSERT INTO Customers (name, phone, email) VALUES (?, ?, ?)";
  connection.query(
    query,
    [name, contact_person, phone, email],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ customer_id: result.insertId });
    }
  );
});

//קבלת כל הלקוחות
app.get("/customers", (req, res) => {
  connection.query("SELECT * FROM customers", (error, results) => {
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
        message: "User registered successfully",
      });
    }
  });
});

//הדגמה להכנסת נתונים למסד
app.post("/insert", (req, res) => {
  const { company_name, order_name, travel_details, date } = req.body;
  console.log(company_name, order_name, travel_details);

  connection.query(
    "INSERT INTO orders ( company_name, order_name, travel_details) VALUES ( ?, ?, ? ,?)",
    [company_name, order_name, travel_details, date],
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
