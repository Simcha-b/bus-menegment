import companiesQueries from "../db/queries/companiesQueries";
async function getCompanies(_, res) {
  try {
    const companies = await companiesQueries.getAllCompanies();
    res.json(companies);
  } catch (error) {
    res.status(500).send("Error retrieving companies");
  }
}

async function getCompany(req, res) {
  const companyId = req.params.id;
  try {
    const company = await companiesQueries.getCompanyById(companyId);
    if (!company) {
      res.status(404).send("Company not found");
    } else {
      res.json(company);
    }
  } catch (error) {
    res.status(500).send("Error retrieving company");
  }
}

async function insertCompany(req, res) {
  const company = req.body;
  try {
    const newCompany = await companiesQueries.insertCompany(company);
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).send("Error inserting company");
  }
}

async function updateCompany(req, res) {
  const companyId = req.params.id;
  const updates = req.body;
  try {
    const updatedCompany = await companiesQueries.updateCompany(
      companyId,
      updates
    );
    if (!updatedCompany) {
      res.status(404).send("Company not found");
    } else {
      res.json(updatedCompany);
    }
  } catch (error) {
    res.status(500).send("Error updating company");
  }
}

async function deleteCompany(req, res) {
  const companyId = req.params.id;
  try {
    const deletedCompany = await companiesQueries.deleteCompany(companyId);
    if (!deletedCompany) {
      res.status(404).send("Company not found");
    } else {
      res.json(deletedCompany);
    }
  } catch (error) {
    res.status(500).send("Error deleting company");
  }
}

export {
  getCompanies,
  getCompany,
  insertCompany,
  updateCompany,
  deleteCompany,
};
