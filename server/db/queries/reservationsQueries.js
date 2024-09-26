import pool from "../connection.js";

//select
async function getAllReservations() {
  const [rows] = await pool.query("SELECT * FROM reservations");
  return rows;
}

async function getReservationById(id) {
  const [rows] = await pool.query(
    "SELECT * FROM reservations WHERE reservation_id = ?",
    [id]
  );
  return rows[0];
}

//insert
async function insertReservation(reservation) {
  const entries = Object.entries(reservation);
  const keys = entries.map(([key]) => key).join(", ");
  const placeholders = entries.map(() => "?").join(", ");
  const values = entries.map(([, value]) => value);

  const query = `INSERT INTO reservations (${keys}) VALUES (${placeholders})`;
  const [rows] = await pool.query(query, values);
  return rows;
}

//update

async function updateReservation(id, updates) {
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

  const query = `UPDATE reservations SET ${setClause} WHERE reservation_id = ?`;

  try {
    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      throw new Error("No reservation found with the given id");
    }

    return { success: true, message: "Reservation updated successfully" };
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw error;
  }
}
//delete

async function deleteReservation(id) {
  const [result] = await pool.query(
    "DELETE FROM reservations WHERE reservation_id = ?",
    [id]
  );

  return result;
}

export default {
  getAllReservations,
  getReservationById,
  insertReservation,
  updateReservation,
  deleteReservation,
};
