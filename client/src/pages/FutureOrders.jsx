import React from "react";
import OrderTable from "../components/Orders/OrderTable";
import FutureOrdersTable from "../components/Orders/FutureOrdersTable";

function FutureOrders() {
  return (
    <div>
      <FutureOrdersTable future={true} />
    </div>
  );
}

export default FutureOrders;
