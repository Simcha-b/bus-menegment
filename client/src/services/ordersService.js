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
export const getOrdersByDate = async (from, to) => {
  const response = await fetch(
    `http://localhost:3001/api/orders/date?from=${from}&to=${to}`
  );
  const data = await response.json();
  return data;
}
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
export const formatDate = (date) => {
  //("DD/MM/YYYY")
  const formattedDate = new Date(date).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }) ;
  return formattedDate;
};
