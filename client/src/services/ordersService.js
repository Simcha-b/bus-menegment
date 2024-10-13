export const getOrders = async () => {
  const response = await fetch("http://localhost:3001/api/orders");
  const data = await response.json();
  return data;
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
  // console.log(data);
  return data;
};
