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
      flexDirection: "colum",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      mt: 5,
      gap: 2, // ריווח בין הכפתורים
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
        נסיעה חדשה
      </Button>
      <Button
        sx={{ margin: "20px", alignItems: "center" }}
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/orders/future");
        }}
      >
        נסיעות עתידיות
      </Button>

      <Button
        sx={{ margin: "20px", alignItems: "center" }}
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/orders/all");
        }}
      >
        כל הנסיעות
      </Button>
      <Button
        sx={{ margin: "20px", alignItems: "center" }}
        variant="contained"
        color="success"
        onClick={() => {
          setOpen(true);
        }}
      >
        נסיעות קודמות
      </Button>
      {open && <ChooseYearAndMonth open={open} setOpen={setOpen} />}
    </Box>
  );
}

export default Orders;
