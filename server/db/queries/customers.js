import pool from "../connection.js";
async function getAllCustomers() {
    const [rows] = await pool.query("SELECT * FROM Customers");
    return rows;
}

async function getCustomerById(id) {
    const [rows] = await pool.query("SELECT * FROM Customers WHERE id = ?", [id]);
    return rows[0];
}

export default {getAllCustomers, getCustomerById};
