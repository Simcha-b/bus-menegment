import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getReservations } from "../services/reservationsService";
// import Table from "../componenets/Teble";
import AdvancedHebrewTable from "../components/AdvancedHebrewTable";
function Reservations() {
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
      <Link to="/reservations/new">הזמנה חדשה</Link>
      <AdvancedHebrewTable data={data} />
      {/* <Table data={data} /> */}
    </>
  );
}

export default Reservations;
