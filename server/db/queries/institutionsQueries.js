import pool from "../connection.js";
//select
async function getAllInstitutions() {
    const [rows] = await pool.query("SELECT * FROM institutions");
    return rows;
}
//select
async function getInstitutionById(id) {
    const [rows] = await pool.query("SELECT * FROM institutions WHERE id = ?", [id]);
    return rows;
}
//insert
async function insertInstitution(institution) {
    const [rows] = await pool.query("INSERT INTO institutions SET ?", institution);
    return rows;
}
//update
async function updateInstitution(id, updates) {
    const [rows] = await pool.query("UPDATE institutions SET ? WHERE id = ?", [updates, id]);
    return rows;
}
//delete
async function deleteInstitution(id) {
    const [rows] = await pool.query("DELETE FROM institutions WHERE id = ?", [id]);
    return rows;
}
export default { getAllInstitutions, getInstitutionById, insertInstitution, updateInstitution, deleteInstitution }