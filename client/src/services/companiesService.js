export async function getCompanies() {
  const response = await fetch("http://localhost:3001/api/companies");
  const data = await response.json();
  return data;
}

