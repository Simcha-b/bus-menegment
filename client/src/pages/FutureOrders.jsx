import React from "react";
import FutureOrdersTable from "../components/Orders/FutureOrdersTable";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function FutureOrders() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>הזמנות עתידיות</h1>
      <FutureOrdersTable future={true} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/orders/new")}
      >
        הזמנה חדשה
      </Button>
    </div>
  );
}

export default FutureOrders;
