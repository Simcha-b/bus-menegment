import reservationsQueries from "../db/queries/reservationsQueries.js";

async function getReservations(req, res) {
  try {
    const reservations = await reservationsQueries.getAllReservations();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving reservations",
      error: error.message || "Internal Server Error",
    });
  }
}

async function getReservationById(req, res) {
  const reservationId = req.params.id;
  try {
    const reservation = await reservationsQueries.getReservationById(
      reservationId
    );
    if (!reservation) {
      res.status(404).json({
        success: false,
        message: "Reservation not found",
        error: error.message || "Internal Server Error",
      });
    } else {
      res.json(reservation);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving reservation",
      error: error.message || "Internal Server Error",
    });
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
    res.status(500).json({
      success: false,
      message: "Error inserting reservation",
      error: error.message || "Internal Server Error",
    });
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
      res.status(404).json({
        success: false,
        message: "Reservation not found",
        error: error.message || "Internal Server Error",
      });
    } else {
      res.json(updatedReservation);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating reservation",
      error: error.message || "Internal Server Error",
    });
  }
}

async function deleteReservation(req, res) {
  const reservationId = req.params.id;
  try {
    const deletedReservation = await reservationsQueries.deleteReservation(
      reservationId
    );
    if (!deletedReservation) {
      res.status(404).json({
        success: false,
        message: "Reservation not found",
        error: error.message || "Internal Server Error",
      });
    } else {
      res.json(deletedReservation);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting reservation",
      error: error.message || "Internal Server Error",
    });
  }
}

export {
  getReservations,
  getReservationById,
  insertReservation,
  updateReservation,
  deleteReservation,
};
