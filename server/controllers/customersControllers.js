import customersQueries from "../db/queries/customersQueries.js";

async function getCustomers(_, res) {
  try {
    const customers = await customersQueries.getAllCustomers();
    res.json(customers);
  } catch (error) {
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

async function insertCustomer(req, res) {
  const customer = req.body;
  try {
    const newCustomer = await customersQueries.insertCustomer(customer);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).send("Error inserting customer");
  }
}

async function updateCustomer(req, res) {
  const customerId = req.params.id;
  const updates = req.body;
  try {
    const updatedCustomer = await customersQueries.updateCustomer(
      customerId,
      updates
    );
    if (!updatedCustomer) {
      res.status(404).send("customer not found");
    } else {
      res.json(updatedCustomer);
    }
  } catch (error) {
    res.status(500).send("Error updating customer");
  }
}

async function deleteCustomer(req, res) {
  const customerId = req.params.id;
  try {
    const deletedCustomer = await customersQueries.deleteCustomer(customerId);
    if (!deletedCustomer) {
      res.status(404).send("customer not found");
    } else {
      res.json(deletedCustomer);
    }
  } catch (error) {
    res.status(500).send("Error deleting customer");
  }
}
export {
  getCustomers,
  getCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
};
