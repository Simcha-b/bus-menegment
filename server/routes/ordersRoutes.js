import express from "express";
const router = express.Router();
import {
  getOrders,
  getOrderById,
  getOrdersByCustomerId,
  getFutureOrders,
  insertOrders,
  updateOrders,
  deleteOrder,
} from "../controllers/ordersControllers.js";

// import addNewOrder from "../controllers/newOrder.js";

// router.get("/", getOrders);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.get("/customer/:id", getOrdersByCustomerId);
router.post("/", insertOrders);
router.put("/:id", updateOrders);
router.delete("/:id", deleteOrder);
export default router;
