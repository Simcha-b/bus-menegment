// import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Orders from "./pages/Orders";
// import Home from "./pages/Home";
// import NewOrder from "./pages/NewOrder";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NewOrder from "./pages/NewOrder";
import Home from "./pages/Home";
const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="orders/new" element={<NewOrder />} />
        </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
