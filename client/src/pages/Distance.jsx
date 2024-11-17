import { Button, Input, Modal, Box, Stack } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Distance() {
  const [distance, setDistance] = useState("");
  const [locations, setLocations] = useState(["", ""]); // Initialize with two empty inputs

  const addLocationField = () => {
    // Insert new empty location before the last element (destination)
    const newLocations = [
      ...locations.slice(0, -1), // כל הנקודות חוץ מהיעד
      "",                        // נקודה חדשה
      locations[locations.length - 1] // היעד
    ];
    setLocations(newLocations);
  };

  const handleLocationChange = (index, value) => {
    const newLocations = [...locations];
    newLocations[index] = value;
    setLocations(newLocations);
  };

  const removeLocationField = (index) => {
    if (locations.length > 2) {
      // Never remove first (start) or last (destination) points
      if (index === 0 || index === locations.length - 1) return;
      const newLocations = locations.filter((_, i) => i !== index);
      setLocations(newLocations);
    }
  };

  const handleSubmit = async () => {
    const validLocations = locations.filter(loc => loc.trim() !== "");
    if (validLocations.length < 2) {
      alert("נא להזין לפחות שתי נקודות ציון");
      return;
    }
    console.log(validLocations);
    try {
      
      const response = await fetch("http://localhost:3001/api/orders/calculate-distance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locations: validLocations
        })
      });

      if (!response.ok) {
        throw new Error("שגיאה בבקשת הנתונים");
      }

      const data = await response.json();
      setDistance(`המרחק הכולל הוא ${data.distance} ק"מ`);
    } catch (error) {
      console.error("שגיאה בחישוב המרחק:", error);
      alert("אירעה שגיאה בחישוב המרחק");
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
        {locations.map((loc, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Input
              fullWidth
              placeholder={
                index === 0 ? "נקודת התחלה" : 
                index === locations.length - 1 ? "יעד" : 
                `נקודת ביניים ${index}`
              }
              value={loc}
              onChange={(e) => handleLocationChange(index, e.target.value)}
            />
            {locations.length > 2 && index !== 0 && index !== locations.length - 1 && (
              <Button 
                onClick={() => removeLocationField(index)}
                variant="outlined"
                color="error"
                sx={{ minWidth: 'auto' }}
              >
                X
              </Button>
            )}
          </Box>
        ))}

        <Button 
          onClick={addLocationField} 
          variant="outlined"
          sx={{ alignSelf: 'flex-start' }}
        >
          הוסף נקודת ביניים +
        </Button>

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
              setLocations(["", ""]);
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
