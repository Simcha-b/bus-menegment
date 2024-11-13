import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export function Heder() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const date = new Date();
      const formattedDate = date.toLocaleDateString("he-IL", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        
      });
      setCurrentDate(formattedDate);
    };

    updateDate();
  }, []);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")).email; 

  const handleHomeClick = () => {
    navigate("/home");
  };

  return (
    <AppBar position="static" color="info">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {user}
        </Typography>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {currentDate}
        </Typography>
        <Button color="inherit" onClick={handleHomeClick}>
          דף הבית
        </Button>
        <Button color="inherit" onClick={() => navigate("/orders")}>
          נסיעות
        </Button>
        <Button color="inherit" onClick={() => navigate("/orders/new")}>
          נסיעה חדשה
        </Button>
        <Button color="inherit" onClick={() => navigate("/customers")}>
          לקוחות
        </Button>
        <Button color="inherit" onClick={() => navigate("/offers")}>
          ספקים
        </Button>
      </Toolbar>
    </AppBar>
  );
}
