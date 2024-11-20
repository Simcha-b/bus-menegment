const API_URL = process.env.REACT_APP_BASE_URL;
export async function getCompanies() {
  const response = await fetch(`${API_URL}/api/companies`);
  const data = await response.json();
  return data;
}

