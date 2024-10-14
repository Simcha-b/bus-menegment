export const getInstitutions = async () => {
    const response = await fetch("http://localhost:3001/api/institutions");
    const data = await response.json();
    return  data;
};
