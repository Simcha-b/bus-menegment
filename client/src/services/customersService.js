export const getCustomers = async () => {
  const response = await fetch("http://localhost:3001/api/customers");
  return await response.json();
};

export const getCustomerById = async (id) => {
  const response = await fetch(`http://localhost:3001/api/customer/:${id}`);
  return await response.json();
};
