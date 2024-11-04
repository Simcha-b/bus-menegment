export const getContacts = async () => {
  const response = await fetch("http://localhost:3001/api/contacts");
  const data = await response.json();
  return data;
};
export const getContactsByCustomerId = async (id) => {
  const response = await fetch(`http://localhost:3001/api/contacts/customer_id?customer_id=${id}`);
  const data = await response.json();
  return data;
};


