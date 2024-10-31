import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const MyAppBar = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("user");
  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {userName}
        </Typography>
        <Button color="inherit" onClick={handleHomeClick}>
          דף הבית
        </Button>
        <Button color="inherit" onClick={() => navigate("/orders")}>
          הזמנות
        </Button>
        <Button color="inherit" onClick={() => navigate("/orders/new")}>
          הזמנה חדשה
        </Button>
        <Button color="inherit" onClick={() => navigate("/customers")}>
          לקוחות
        </Button>
        <Button color="inherit" onClick={() => navigate("/offers")}>
          מבצעים
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
