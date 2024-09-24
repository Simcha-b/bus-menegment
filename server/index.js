import bodyParser from "body-parser";


// app.use(bodyParser.json());


import pool from "./db/connection.js";

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

app.get("/customers", (req, res) => {
  pool.query("SELECT * FROM Customers", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

//יצירת לקוח חדש
app.post("/nuwCustomer", (req, res) => {
  const { name, contact_person, phone, email } = req.body;
  const query = "INSERT INTO Customers (name, phone, email) VALUES (?, ?, ?)";
  pool.query(query, [name, contact_person, phone, email], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ customer_id: result.insertId });
  });
});

//הדגמה להכנסת נתונים למסד
app.post("/insert", (req, res) => {
  const {
    company_name,
    order_name,
    date,
    travel_details,
    bus_number,
    start_time,
    end_time,
  } = req.body;
  console.log(company_name, order_name, travel_details, date);

  pool.query(
    "INSERT INTO orders ( company_name, order_name, date, travel_details, bus_number, start_time, end_time) VALUES ( ?, ?, ? ,?, ?,?,?)",
    [
      company_name,
      order_name,
      date,
      travel_details,
      bus_number,
      start_time,
      end_time,
    ],
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
