import React from "react";
import OrderTable from "../components/Orders/OrderTable";

function FutureOrders() {
  return (
    <div>
      <OrderTable future={true} />
    </div>
  );
}

export default FutureOrders;
