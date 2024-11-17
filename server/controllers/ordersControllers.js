import ordersQueries from "../db/queries/ordersQueries.js";
import { calculateDistance } from "../api-maps/fetchMaps.js";
import fetchData from "../api-trafik/traficReports.js";
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

 async function getOrdersByDate(req, res) {
  const {from , to} = req.query;
  if (!from || !to) {
    return res.status(400).json({ error: 'Start date and end date are required' });
  }
  try {
    const orders = await ordersQueries.getOrderByDate(from, to);
    res.json(orders);
  } catch (error) {
    console.log("hahah");
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
    const orders = await ordersQueries.getOrdersByCustomerId(customerId);
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

// Add this helper function
function formatDateForMySQL(dateString) {
  if (!dateString) return null;
  return new Date(dateString).toISOString().slice(0, 19).replace('T', ' ');
}

async function updateOrders(req, res) {
  const orderId = req.params.id;
  const updates = req.body;
  
  // Format the date if it exists in the updates
  if (updates.order_date) {
    updates.order_date = formatDateForMySQL(updates.order_date);
  }

  try {
    const updatedOrder = await ordersQueries.updateOrder(
      orderId,
      updates
    );
    if (!updatedOrder) {
      res.status(404).json({
        success: false,
        message: "Order not found",
      });
    } else {
      res.json(updatedOrder);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order",
      error: error.message || "Internal Server Error",
    });
  }
}
async function updateOrderStatus(req, res) {
  const orderId = req.params.id;
  const status = req.body.status;

  console.log(`Updating order ${orderId} to status ${status}`); // Log the input values

  try {
    const updatedOrder = await ordersQueries.updateOrderStatus(orderId, status);
    if (!updatedOrder) {
      console.log(`Order ${orderId} not found`); // Log if order is not found
      res.status(404).json({
        success: false,
        message: "Order not found",
        error: "Order not found",
      });
    } else {
      console.log(`Order ${orderId} updated successfully`); // Log successful update
      res.json(updatedOrder);
    }
  } catch (error) {
    console.error(`Error updating order ${orderId}: ${error.message}`); // Log the error
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
    const deletedOrder = await ordersQueries.deleteOrder(orderId);
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
async function getDistance(req, res) {
  const { origin, destination } = req.query;
  try {
    const distance = await calculateDistance(origin, destination);
    res.json(distance);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error calculating distance",
      error: error.message || "Internal Server Error",
    });
  }
}

async function getTrafficReports(req, res) {
  try {
    const reports = await fetchData();
    res.json(reports);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving reports",
      error: error.message || "Internal Server Error",
    });
  }
}
export {
  getOrders,
  getOrderById,
  getOrdersByCustomerId,
  getFutureOrders,
  getOrdersByDate,
  insertOrders,
  updateOrders,
  updateOrderStatus,
  deleteOrder,
  getDistance,
  getTrafficReports,
};
