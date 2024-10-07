import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getReservations } from "../services/reservationsService";

// import Table from "../componenets/Teble";
import AdvancedHebrewTable from "../components/AdvancedHebrewTable";
function Reservations() {
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => getReservations(),
  });
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <h1>Reservations</h1>
      <Button variant="contained" color="success" onClick={() => {navigate("/reservations/new")}}> הזמנה חדשה</Button>
      <AdvancedHebrewTable data={data} />
      {/* <Table data={data} /> */}
    </>
  );
}

export default Reservations;
