import React from "react";
import OrderTable from "../components/Orders/OrderTable";

function FutureOrders() {
  const [data, setData] = React.useState({});
  return (
    <div>
      <OrderTable date={data} />
    </div>
  );
}

export default FutureOrders;
