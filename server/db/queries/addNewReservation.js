import  pool  from '../connection.js';

 async function addNewReservation(reservationData) {
  // Validation
  if (!reservationData.institution_name) {
    throw new Error('Institution name is required');
  }
  if (!reservationData.contact_name) {
    throw new Error('Contact name is required');
  }
  if (!reservationData.company_name) {
    throw new Error('Company name is required');
  }

  let connection;
  try {
    connection = await pool.getConnection();

    await connection.beginTransaction();

    // Check if the institution exists, if not, insert it
    let [institutionResults] = await connection.query(
      'INSERT INTO institutions (institution_name) VALUES (?) ON DUPLICATE KEY UPDATE institution_name = VALUES(institution_name)',
      [reservationData.institution_name]
    );
    const institutionId = institutionResults.insertId || institutionResults.affectedRows;

    // Check if the contact person exists, if not, insert it
    let [contactResults] = await connection.query(
      'INSERT INTO contacts (contact_name, institution_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE contact_name = VALUES(contact_name)',
      [reservationData.contact_name, institutionId]
    );
    const contactId = contactResults.insertId || contactResults.affectedRows;

    // Check if the company exists, if not, insert it
    let [companyResults] = await connection.query(
      'INSERT INTO companies (company_name) VALUES (?) ON DUPLICATE KEY UPDATE company_name = VALUES(company_name)',
      [reservationData.company_name]
    );
    const companyId = companyResults.insertId || companyResults.affectedRows;

    // Insert the new reservation
    const [reservationResults] = await connection.query(
      `INSERT INTO reservations (
        institution_id, contact_id, company_id, trip_details, start_time, end_time,
        bus_quantity, price_per_bus_customer, extra_pay_customer, total_price,
        notes, paid, total_paid_customer, price_company, notes_company,
        extra_pay_company, total_price_company, submitted_invoice
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        institutionId, contactId, companyId, 
        reservationData.trip_details || null,
        reservationData.start_time || null, 
        reservationData.end_time || null, 
        reservationData.bus_quantity || null,
        reservationData.price_per_bus_customer || null, 
        reservationData.extra_pay_customer || null,
        reservationData.total_price || null, 
        reservationData.notes || null, 
        reservationData.paid || false,
        reservationData.total_paid_customer || null, 
        reservationData.price_company || null,
        reservationData.notes_company || null, 
        reservationData.extra_pay_company || null,
        reservationData.total_price_company || null, 
        reservationData.submitted_invoice || false
      ]
    );

    await connection.commit();
    return reservationResults.insertId;
  } catch (error) {
    if (connection) await connection.rollback();
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

export default addNewReservation;
