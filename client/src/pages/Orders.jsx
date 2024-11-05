import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import ChooseYearAndMonth from "../components/Orders/ChooseYearAndMonth";

function Orders() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
          navigate("/orders/all");
        }}
      >
        כל ההזמנות
      </Button>
      <Button
        sx={{ margin: "20px", alignItems: "center" }}
        variant="contained"
        color="success"
        onClick={() => {
          setOpen(true);
        }}
      >
        הזמנות קודמות
      </Button>
      {open && <ChooseYearAndMonth open={open} setOpen={setOpen} />}
    </Box>
  );
}

export default Orders;
