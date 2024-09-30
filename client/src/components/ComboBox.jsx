import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getCustomers } from "../services/customersService";
export default function ComboBox() {
  const { data } = useQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomers(),
  });
  let names = [];
  async function presData() {
    await data.map((e) => names.push(e.contact_name));
  }
  if (data) {
    presData();
  }
  return (
    <Autocomplete
      disablePortal
      options={names}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="לקוח קיים" />}
    />
  );
}
