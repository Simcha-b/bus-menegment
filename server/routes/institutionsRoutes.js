import express from "express";
const router = express.Router();
import {
    getAllInstitutions,
    getInstitutionById,
    insertInstitution,
    updateInstitution,
    deleteInstitution
} from "../controllers/institutionsControllers.js";
router.get("/", getAllInstitutions);
router.get("/:id", getInstitutionById);
router.post("/", insertInstitution);
router.put("/:id", updateInstitution);
router.delete("/:id", deleteInstitution);

export default router;