import pool from "../connection.js";

//select
async function getAllCustomers() {
  const [rows] = await pool.query("SELECT * FROM customers");
  return rows;
}

async function getCustomerById(id) {
  const [rows] = await pool.query(
    "SELECT * FROM customers WHERE customer_id = ?",
    [id]
  );
  return rows[0];
}


//insert
async function insertCustomer(customer) {
  const [rows] = await pool.query(
    "INSERT INTO customers (institution_name, contact_person, phone, email) values(?,?,?,?)",
    [customer.name, customer.contact_person, customer.phone, customer.email]
  );
  return rows;
}

//update
async function updateCustomer(customer) {
  const [rows] = await pool.query(
    "UPDATE customers SET institution_name = ?, contact_person = ?, phone = ?, email = ? WHERE customer_id = ?",
    [
      customer.name,
      customer.contact_person,
      customer.phone,
      customer.email,
      customer.customer_id,
    ]
  );
  return rows;
}

//delete
async function deleteCustomer(id) {
  const [rows] = await pool.query(
    "DELETE FROM customers WHERE customer_id = ?",
    [id]
  );
  return rows;
}
export default { getAllCustomers, getCustomerById, insertCustomer, updateCustomer, deleteCustomer };
