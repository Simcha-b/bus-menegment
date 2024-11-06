export const getOrders = async () => {
  const response = await fetch("http://localhost:3001/api/orders");
  const data = await response.json();
  return data;
};
//get orders future
export const getFutureOrders = async () => {
  const response = await fetch("http://localhost:3001/api/orders/future");
  const data = await response.json();
  return data;
};
// get orders by date
export const getOrdersByDate = async (year, month) => {
  try {
    const from = `${year}-${month}-01`;
    const to = `${year}-${month}-31`;
    const url = `http://localhost:3001/api/orders/byDate?from=${from}&to=${to}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Server error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Fetch error:", error);
    throw error;
  }
};

export const sendNewOrder = async (body) => {
  const response = await fetch("http://localhost:3001/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

export const updateOrder = async (id, body) => {
  const response = await fetch(`http://localhost:3001/api/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};
export async function updateOrderStatus(order_id, status) {
  const response = await fetch(`/api/orders/${order_id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error("Failed to update order status");
  }
}
export const deleteOrder = async (id) => {
  const response = await fetch(`http://localhost:3001/api/orders/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};
export const formatDate = (date) => {
  //("DD/MM/YYYY")
  const formattedDate = new Date(date).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate;
};
