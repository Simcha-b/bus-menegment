import pool from "../connection.js";

//select
async function getAllOrders() {
  const [rows] =
    await pool.query(`SELECT * FROM orders, customers, bus_companies
     WHERE orders.customer_id = customers.customer_id AND orders.company_id = bus_companies.company_id`);
  return rows;
}

async function getOrderById(id) {
  const [rows] = await pool.query(
    "SELECT * FROM orders WHERE order_id = ?",
    [id]
  );
  return rows[0];
}

async function getOrdersByCustomerId(id) {
  const query = `SELECT * FROM orders
  JOIN customers
  ON orders.customer_id = customers.customer_id WHERE customer_id = ?`;

  const [rows] = await pool.query(query, [id]);
  return rows;
}
//select for mein orders table 
//להכניס תאריך כפרמטר ולטפל בו
async function getFutureOrders() {
  const [rows] = await pool.query(
    `select order_id, order_date, institution_name, start_time,
     end_time, bus_quantity, trip_details, company_name
    from orders r
    join customers c
    on r.customer_id = c.customer_id 
    join bus_companies b
    on r.company_id = b.company_id`
  );
  return rows;
}
//insert
async function insertOrder(order) {
  const entries = Object.entries(order);
  const keys = entries.map(([key]) => key).join(", ");
  const placeholders = entries.map(() => "?").join(", ");
  const values = entries.map(([, value]) => value);
  const query = `INSERT INTO orders (${keys}) VALUES (${placeholders})`;
  const [rows] = await pool.query(query, values);
  return rows;
}

//update

async function updateOrder(id, updates) {
  // Ensure we have an id and updates
  if (!id || Object.keys(updates).length === 0) {
    throw new Error(
      "Invalid input: id is required and updates object cannot be empty"
    );
  }

  // Create the SET part of the query dynamically
  const setClause = Object.keys(updates)
    .map((key) => `${key} = ?`)
    .join(", ");

  const values = Object.values(updates);

  // Add the id to the values array
  values.push(id);

  const query = `UPDATE orders SET ${setClause} WHERE order_id = ?`;

  try {
    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      throw new Error("No order found with the given id");
    }

    return { success: true, message: "order updated successfully" };
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}
//delete

async function deleteOrder(id) {
  const [result] = await pool.query(
    "DELETE FROM orders WHERE order_id = ?",
    [id]
  );

  return result;
}

export default {
  getAllOrders,
  getOrderById,
  getOrdersByCustomerId,
  getFutureOrders,
  insertOrder,
  updateOrder,
  deleteOrder,
};
