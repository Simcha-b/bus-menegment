import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../services/ordersService";
import { Table } from "../components/Table";

import AdvancedHebrewTable from "../components/AdvancedHebrewTable";
import { style } from "@mui/system";
function Orders() {
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => getOrders(),
  });
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return ( 
    <>
      <h1 style={{ textAlign: "center" , margin: "20px", fontSize: "30px"}}>orders</h1>
      <Button sx={{margin: "20px", alignItems: "center"}} variant="contained" color="success" onClick={() => {navigate("/orders/new")}}> הזמנה חדשה</Button>
      {/* <AdvancedHebrewTable data={data} /> */}
      <Table data={data} />
    </>
  );
}

export default Orders;
