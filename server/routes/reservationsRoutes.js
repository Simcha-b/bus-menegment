import express from "express";
const router = express.Router();
import {
  getReservations,
  getReservationById,
  getReservationsByCustomerId,
  getFutureReservations,
  insertReservation,
  updateReservation,
  deleteReservation,
} from "../controllers/reservationsControllers.js";

// router.get("/", getReservations);
router.get("/", getFutureReservations);
router.get("/:id", getReservationById);
router.get("/customer/:id", getReservationsByCustomerId);
router.post("/", insertReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);
export default router;
