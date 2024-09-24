import express from "express";
const router = express.Router();
import {
  getCustomers,
  getCustomer,
} from "../controllers/customersControllers.js";

router.get("/", getCustomers);
router.get("/:id", getCustomer);

export default router;
