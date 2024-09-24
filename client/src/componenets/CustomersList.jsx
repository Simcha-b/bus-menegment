import React, { useEffect, useState } from "react";
import { getCustomers } from "../services/customersService";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  async function fetchData() {
    const data = await getCustomers();
    setCustomers(data);
    console.log(data);
    
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>customers List</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.customer_id}>{customer.contact_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomersList;
