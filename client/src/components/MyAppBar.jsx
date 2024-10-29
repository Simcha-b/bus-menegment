import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const MyAppBar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/"); // כאן תשים את הנתיב לדף הבית שלך
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          בדרך הישר
        </Typography>
        <Button color="inherit" onClick={handleHomeClick}>
          דף הבית
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;