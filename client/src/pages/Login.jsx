import React, { useRef, useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../services/loginServis.js";
import "../css/login.css";
import { loginWithGoogle } from "../firebase/authentication.js";
function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const email = useRef();
  const password = useRef();
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await checkLogin(email, password);
      if(!user) throw new Error("שם משתמש או סיסמה לא נכונים");
      console.log("User logged in:", user);
      navigate("/home");
    } catch (error) {
      setError("שם משתמש או סיסמה לא נכונים");
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      console.log("User logged in with Google:", user);
    } catch (error) {
      setError("שגיאה בהתחברות עם גוגל");
    }
  };

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
              inputRef={email}
              // onChange={(e) =>  setPassword(email)}
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
              inputRef={password}              
              // onChange={(e) => setPassword(password)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              כניסה
            </Button>
            <Button
              type="submit"
              
              variant="contained"
              onClick={handleGoogleLogin}
            >
               התחבר עם גוגל
              <img
                src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                alt="logo"
                height={"20px"}
                width={"20px"}
              />
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
