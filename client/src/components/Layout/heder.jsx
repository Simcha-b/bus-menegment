import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Heder = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))[0].name;
  
  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {user}
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

export default Heder;
