import React from "react";
import { useLocation } from "react-router-dom";
import PastOrdersTable from "../components/Orders/PastOrdersTable";
import ChooseYearAndMonth from "../components/Orders/ChooseYearAndMonth";
import { Button } from "antd";
function PastOrders() {
  const { open, setOpen } = React.useState(false);
  const { state } = useLocation();
  return (
    <div>
      <h1>{`הזמנות חודש ${state.month}/${state.year}`}</h1>
      <Button onClick={() => setOpen(true)}>בחר חודש ושנה</Button>
      <ChooseYearAndMonth open={open} setOpen={setOpen} />
      <PastOrdersTable year={state.year} month={state.month} />
    </div>
  );
}

export default PastOrders;
