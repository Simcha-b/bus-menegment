export const getContacts = async () => {
  const response = await fetch("http://localhost:3001/api/contacts");
  const data = await response.json();
  return data;
};
export const getContactsByInstitutionId = async (id) => {
  const response = await fetch(`http://localhost:3001/api/contacts/${id}`);
  const data = await response.json();
  return data;
};
