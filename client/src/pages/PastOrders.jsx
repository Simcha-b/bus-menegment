import React from "react";
import { useLocation } from "react-router-dom";
import PastOrdersTable from "../components/Orders/PastOrdersTable";

function PastOrders() {
  const { state } = useLocation();
  return (
    <div>
      <h1>{`הזמנות חודש ${state.month}/${state.year}`}</h1>
      <PastOrdersTable year={state.year} month={state.month} />
    </div>
  );
}

export default PastOrders;
