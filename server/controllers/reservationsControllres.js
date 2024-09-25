import reservationsQueries from "../db/queries/reservationsQueries";

async function getReservations(req, res) {
  try {
    const reservations = await reservationsQueries.getAllReservations();
    res.json(reservations);
  } catch (error) {
    res.status(500).send("Error retrieving reservations");
  }
}

async function getReservationById(req, res) {
  const reservationId = req.params.id;
  try {
    const reservation = await reservationsQueries.getReservationById(
      reservationId
    );
    if (!reservation) {
      res.status(404).send("Reservation not found");
    } else {
      res.json(reservation);
    }
  } catch (error) {
    res.status(500).send("Error retrieving reservation");
  }
}

async function insertReservation(req, res) {
  const reservation = req.body;
  try {
    const newReservation = await reservationsQueries.insertReservation(
      reservation
    );
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).send("Error inserting reservation");
  }
}

async function updateReservation(req, res) {
  const reservationId = req.params.id;
  const updates = req.body;
  try {
    const updatedReservation = await reservationsQueries.updateReservation(
      reservationId,
      updates
    );
    if (!updatedReservation) {
      res.status(404).send("Reservation not found");
    } else {
      res.json(updatedReservation);
    }
  } catch (error) {
    res.status(500).send("Error updating reservation");
  }
}

async function deleteReservation(req, res) {
  const reservationId = req.params.id;
  try {
    const deletedReservation = await reservationsQueries.deleteReservation(
      reservationId
    );
    if (!deletedReservation) {
      res.status(404).send("Reservation not found");
    } else {
      res.json(deletedReservation);
    }
  } catch (error) {
    res.status(500).send("Error deleting reservation");
  }
}

export {
  getReservations,
  getReservationById,
  insertReservation,
  updateReservation,
  deleteReservation,
};
