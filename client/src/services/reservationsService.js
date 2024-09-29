export const getReservations = async () => {
  const response = await fetch("http://localhost:3001/api/reservations");
  const data = await response.json();
  console.log(data);
  return data;
};

