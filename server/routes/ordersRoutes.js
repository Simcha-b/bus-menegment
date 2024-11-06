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
  getOrdersByDate,
  updateOrderStatus,
} from "../controllers/ordersControllers.js";

router.get("/byDate", getOrdersByDate);
router.get("/future", getFutureOrders);
router.get("/customer/:id", getOrdersByCustomerId);

router.get("/", getOrders);
router.get("/:id", getOrderById);

router.put("/:id/status", updateOrderStatus);
router.post("/", insertOrders);
router.put("/:id", updateOrders);
router.delete("/:id", deleteOrder);
export default router;
