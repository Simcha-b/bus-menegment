import ordersQueries from "../db/queries/ordersQueries.js";

async function getOrders(req, res) {
  try {
    const orders = await ordersQueries.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
      error: error.message || "Internal Server Error",
    });
  }
}

async function getOrderById(req, res) {
  const orderId = req.params.id;
  try {
    const order = await ordersQueries.getOrderById(orderId);
    if (!order) {
      res.status(404).json({
        success: false,
        message: "order not found",
        error: error.message || "Internal Server Error",
      });
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
      error: error.message || "Internal Server Error",
    });
  }
}
async function getFutureOrders(req, res) {
  try {
    const FutureOrders = await ordersQueries.getFutureOrders();
    res.json(FutureOrders);    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
      error: error.message || "Internal Server Error",
    });
  }
}
async function getOrdersByCustomerId(req, res) {
  const customerId = req.params.id;
  try {
    const orders = await ordersQueries.getOrderByCustomerId(customerId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving orders",
      error: error.message || "Internal Server Error",
    });
  }
}

async function insertOrders(req, res) {
  const order = req.body;
  try {
    const newOrder = await ordersQueries.insertOrder(order);
    res.status(201).json({
      success: true,
      message: "Order created",
      data: newOrder,
    });
    console.log(newOrder);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error inserting orders",
      error: error.message || "Internal Server Error",
    });
  }
}

async function updateOrders(req, res) {
  const orderId = req.params.id;
  const updates = req.body;
  try {
    const updatedOrder = await ordersQueries.updateOrder(
      reservationId,
      updates
    );
    if (!updatedOrder) {
      res.status(404).json({
        success: false,
        message: "Order not found",
        error: error.message || "Internal Server Error",
      });
    } else {
      res.json(updateOrder);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order",
      error: error.message || "Internal Server Error",
    });
  }
}

async function deleteOrder(req, res) {
  const orderId = req.params.id;
  try {
    const deletedOrder = await ordersQueries.deleteOrders(orderId);
    if (!deletedOrder) {
      res.status(404).json({
        success: false,
        message: "Order not found",
        error: error.message || "Internal Server Error",
      });
    } else {
      res.json(deletedOrder);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting order",
      error: error.message || "Internal Server Error",
    });
  }
}

export {
  getOrders,
  getOrderById,
  getOrdersByCustomerId,
  getFutureOrders,
  insertOrders,
  updateOrders,
  deleteOrder,
};
