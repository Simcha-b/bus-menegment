import express from "express";
const router = express.Router();

import {
    getAllContacts,
    getContactById,
    insertContact,
    updateContact,
    deleteContact,
} from "../controllers/contactControllers.js";
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.post("/", insertContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;