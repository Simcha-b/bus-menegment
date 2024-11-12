import { Button, Input } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

function Distance() {
  const [distance, setDistance] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const hendelSabmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/orders/calculate-distance?origin=${origin}&destination=${destination}`
      );
      if (!response.ok) {
        throw new Error("שגיאה בבקשת הנתונים");
      }
      const data = await response.json();
      setDistance(data);
    } catch (error) {
      console.error("שגיאה בחישוב המרחק:", error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        חישוב מרחק נסיעה
      </h2>
      <label style={{ fontSize: "14px", fontWeight: "bold", color: "#555" }}>
        מוצא:
        <Input
          type="text"
          value={origin}
          onChange={(e) => {
            setOrigin(e.target.value);
          }}
        />
      </label>
      <label
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          color: "#555",
          marginTop: "10px",
        }}
      >
        יעד:
        <Input
          type="text"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
          }}
        />
      </label>
      <Button
        onClick={hendelSabmit}
        variant="contained"
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
          marginTop: "20px",
          padding: "10px 20px",
          fontWeight: "bold",
        }}
      >
        חשב מרחק
      </Button>
      <Button
        onClick={() => {
          setOrigin("");
          setDestination("");
          setDistance("");
        }}
        variant="contained"
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
          marginTop: "20px",
          padding: "10px 20px",
          fontWeight: "bold",
        }}
      >
        איפוס{" "}
      </Button>
      <p
        style={{
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#333",
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#e3f2fd",
          borderRadius: "4px",
        }}
      >
        {distance}
      </p>
    </Box>
  );
}

export default Distance;
