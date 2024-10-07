export const getReservations = async () => {
  const response = await fetch("http://localhost:3001/api/reservations");
  const data = await response.json();
  console.log(data);
  return data;
};

export const sendNewReservation = async (body) => {
  const response = await fetch("http://localhost:3001/api/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log(data);
  return data;
};
