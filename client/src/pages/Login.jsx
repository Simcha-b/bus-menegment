import React from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";

function Login() {
  const handleLogin = () => {
    // הוסף את הלוגיקה לטיפול בכניסה כאן
    console.log("Login clicked");
  };

  return (
    <>
    <h1 style={{ textAlign: "center" , margin: "20px", fontSize: "30px", fontWeight: "bold"}}>בדרך הישר</h1>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            התחברות
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="אימייל"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="סיסמה"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              כניסה
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
