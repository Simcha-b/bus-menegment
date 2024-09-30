// import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Reservations from "./pages/Reservations";
// import Home from "./pages/Home";
// import NewReservation from "./pages/NewReservation";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NewReservation from "./pages/NewReservation";
const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Reservations />}></Route>
          <Route path="home/reservations" element={<Reservations />}></Route>
          <Route path="reservations/new" element={<NewReservation />} />
        </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
