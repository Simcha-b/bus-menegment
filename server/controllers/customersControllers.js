import customersQueries from "../db/queries/customers.js";

async function getCustomers(req, res) {
  try {
    const customers = await customersQueries.getAllCustomers();
    console.log(customers);
    res.json(customers);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving customers");
  }
}

async function getCustomer(req, res) {
  const userId = req.params.id;
  try {
    const customer = await customersQueries.getCustomerById(userId);
    if (!customer) {
      res.status(404).send("customer not found");
    } else {
      res.json(customer);
    }
  } catch (error) {
    res.status(500).send("Error retrieving customer");
  }
}

export { getCustomers, getCustomer };
