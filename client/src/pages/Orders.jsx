import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

function Orders() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex",flexDirection:"row", alignItems: "center", justifyContent: "center"  }}>

      <Button
        sx={{ margin: "20px", alignItems: "center" }}
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/orders/new");
        }}
      >
        הזמנה חדשה
      </Button>
      <Button
        sx={{ margin: "20px", alignItems: "center" }}
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/orders/future");
        }}
      >
        הזמנות עתידיות
      </Button>
      
      <Button
        sx={{ margin: "20px", alignItems: "center" }}
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/orders/new");
        }}
      >
        כל ההזמנות
      </Button>
      <Button
        sx={{ margin: "20px", alignItems: "center" }}
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/orders/new");
        }}
      >
        {" "}
        הזמנות קודמות
      </Button>
    </Box>
  );
}

export default Orders;
