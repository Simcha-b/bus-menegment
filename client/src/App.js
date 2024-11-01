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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import NewOrder from "./pages/NewOrder";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

import HomePage from "./pages/HomePage";
import NewOrder from "./pages/NewOrder";
import Login from "./pages/Login";
import Layout from "./components/Layout/Layout";
import ProtectedPages from "./pages/ProtectedPages";
const queryClient = new QueryClient();

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
    direction: "rtl",
  },
  heIL // לוקליזציה בעברית
);
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
        <Router>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedPages />}>
                <Route path="/home" element={<HomePage />}></Route>
                <Route element={<Layout />}>
                  <Route path="/orders" element={<Orders />}></Route>
                  <Route path="orders/new" element={<NewOrder />} />
                </Route>
              </Route>
            </Routes>
          </QueryClientProvider>
        </Router>
      </CacheProvider>
    </ThemeProvider>
  );
}

export default App;
