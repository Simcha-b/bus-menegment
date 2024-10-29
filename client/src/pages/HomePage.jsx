import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const userEmail = "Simcha"

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ברוך הבא, {userEmail}
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 5,
          gap: 2,  // ריווח בין הכפתורים
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/orders')}
          sx={{ width: 150 , height: 70 }}
        >
          נסיעות
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/customers')}
          sx={{ width: 150, height: 70}}
        >
          לקוחות
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate('/operators')}
          sx={{ width: 150, height: 70 }}
        >
          מבצעים
        </Button>
      </Box>
    </Container>
  );
}

export default HomePage;
