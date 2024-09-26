import express from "express";
const router = express.Router();
import {
    getReservations,
    getReservationById,
    insertReservation,
    updateReservation,
    deleteReservation,
} from "../controllers/reservationsControllers.js";

router.get("/", getReservations);
router.get("/:id", getReservationById);
router.post("/", insertReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);
export default router;