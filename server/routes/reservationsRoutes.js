const router = express.Router();
import {
    getReservations,
    getReservation,
    insertReservation,
    updateReservation,
    deleteReservation,
} from "../controllers/reservationsControllers.js";

router.get("/", getReservations);
router.get("/:id", getReservation);
router.post("/", insertReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);