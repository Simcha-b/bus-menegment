import { AppBar, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar position="static" sx={{ marginBottom: 5 }} color="transparent" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          padding: 5,
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/orders")}
        >
          הזמנות
        </Button>
        <Button variant="contained" size="large">
          לקוחות
        </Button>
        <Button variant="contained" size="large">
          מבצעים
        </Button>
      </Box>
    </>
  );
}

export default Home;
