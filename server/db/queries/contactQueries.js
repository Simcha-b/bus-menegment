import pool from "../connection.js";

//select
async function getAllContacts() {
    const [rows] = await pool.query("SELECT * FROM contacts");
    return rows;
}

//select
async function getContactById(id) {
    const [rows] = await pool.query("SELECT * FROM contacts WHERE id = ?", [id]);
    return rows;
}
//select
async function getContactsByInstitutionId(id) {
    const [rows] = await pool.query("SELECT * FROM contacts WHERE institution_id = ?", [id]);
    return rows;
}
//insert
async function insertContact(contact) {
    const [rows] = await pool.query("INSERT INTO contacts SET ?", contact);
    return rows;
}
//update
async function updateContact(id, updates) {
    const [rows] = await pool.query("UPDATE contacts SET ? WHERE contact_id = ?", [updates, id]);
    return rows;
}

//delete
async function deleteContact(id) {
    const [rows] = await pool.query("DELETE FROM contacts WHERE id = ?", [id]);
    return rows;
}

export default {getAllContacts, getContactById,getContactsByInstitutionId, insertContact, updateContact, deleteContact}