import React, { useRef } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkLogin} from "../services/loginServis.js";

function Login() {
  const navigate = useNavigate();
  const emailInput = useRef();
  const passwordInput = useRef();

  function handleLogin(e) {
    e.preventDefault();
    if (checkLogin(emailInput.current.value, passwordInput.current.value)) {
      navigate("/home");
    } else {
      alert("שם משתמש או סיסמא אינם נכונים");
      navigate("/");
    }
  }

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          margin: "20px",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        בדרך הישר
      </h1>
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
              type="email"
              label="אימייל"
              name="email"
              inputRef={emailInput}
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
              inputRef={passwordInput}
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
