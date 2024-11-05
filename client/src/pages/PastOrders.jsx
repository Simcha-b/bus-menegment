import React from "react";
import { useLocation } from "react-router-dom";
import OrderTable from "../components/Orders/OrderTable";

function PastOrders() {
  const {state} = useLocation();
  return (
    <div>
      <OrderTable past={true} year={state.year} month={state.month} />
    </div>
  );
}

export default PastOrders;
