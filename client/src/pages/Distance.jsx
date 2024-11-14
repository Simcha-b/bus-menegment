import { Button, Input, Modal, Box, Stack } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Distance() {
  const [distance, setDistance] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = async () => {
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
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
            חישוב מרחק נסיעה
          </h2>
          
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <label>מוצא:</label>
              <Input
                fullWidth
                placeholder="הכנס מוצא"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <label>יעד:</label>
              <Input
                fullWidth
                placeholder="הכנס יעד"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </Box>

            {distance && (
              <Box
                sx={{
                  p: 2,
                  bgcolor: '#e3f2fd',
                  borderRadius: 1,
                  textAlign: 'center'
                }}
              >
                {distance}
              </Box>
            )}

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ minWidth: '120px' }}
              >
                חשב מרחק
              </Button>
              <Button
                onClick={() => {
                  setOrigin("");
                  setDestination("");
                  setDistance("");
                }}
                variant="outlined"
                sx={{ minWidth: '120px' }}
              >
                איפוס
              </Button>
            </Stack>
          </Stack>
        </Box>
  );
}

export default Distance;
