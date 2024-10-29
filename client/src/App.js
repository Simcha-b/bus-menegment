// import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { heIL } from "@mui/material/locale";

import Orders from "./pages/Orders";
// import Home from "./pages/Home";
// import NewOrder from "./pages/NewOrder";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NewOrder from "./pages/NewOrder";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
const queryClient = new QueryClient();

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
    direction: "rtl", // מימין לשמאל
  },
  heIL // לוקליזציה בעברית
);
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div dir="rtl">
        <Router>
          <QueryClientProvider client={queryClient}>
            <Routes>
              {/* <Route path="/" element={<Login/>} /> */}

              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<HomePage />}></Route>
              <Route path="/orders" element={<Orders />}></Route>
              <Route path="orders/new" element={<NewOrder />} />
            </Routes>
          </QueryClientProvider>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
