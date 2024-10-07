import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
export default function ComboBox({ value, fanc }) {
  const { data } = useQuery({
    queryKey: [value],
    queryFn: () => fanc(),
  });
  let names = [];
  async function presData() {
    await data.map((c) => names.push(c.name));
  }
  if (data) {
    presData();
  }
  return (
    <Autocomplete
      disablePortal
      options={names}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={value} />}
    />
  );
}
