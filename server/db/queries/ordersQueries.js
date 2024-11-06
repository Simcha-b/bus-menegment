import pool from "../connection.js";

//select
async function getAllOrders() {
  const [rows] =
    await pool.query(`SELECT * FROM orders, customers, bus_companies
     WHERE orders.customer_id = customers.customer_id AND orders.company_id = bus_companies.company_id`);
  return rows;
}

async function getOrderById(id) {
  const [rows] = await pool.query("SELECT * FROM orders WHERE order_id = ?", [
    id,
  ]);
  return rows[0];
}

async function getOrdersByCustomerId(id) {
  const query = `SELECT * FROM orders
  JOIN customers
  ON orders.customer_id = customers.customer_id WHERE customer_id = ?`;

  const [rows] = await pool.query(query, [id]);
  return rows;
}
// select future orders
async function getFutureOrders() {
  const query = `SELECT * FROM orders
    LEFT JOIN customers ON orders.customer_id = customers.customer_id
    LEFT JOIN bus_companies ON orders.company_id = bus_companies.company_id
    WHERE order_date > CURDATE()`;
  const [rows] = await pool.query(query);
  return rows;
}
//select orders by date
async function getOrderByDate(from, to) {
  const [rows] = await pool.query(
    `select * from orders
    where order_date between ? and ?`,
    [from, to]
  );
  return rows;
}
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
  async function updateOrderStatus(order_id, status) {
    const query = `UPDATE orders SET status = ? WHERE order_id = ?`;
    await pool.query(query, [status, order_id]);
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
  const [result] = await pool.query("DELETE FROM orders WHERE order_id = ?", [
    id,
  ]);

  return result;
}

export default {
  getAllOrders,
  getOrderById,
  getFutureOrders,
  getOrderByDate,
  getOrdersByCustomerId,
  insertOrder,
  updateOrder,
  deleteOrder,
};
