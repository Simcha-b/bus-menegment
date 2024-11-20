import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import OrderTable from "../components/Orders/OrderTable";

function Orders() {
  

  const [tableType, setTableType] = useState("future");

  // useEffect(() => {
  //   if (tableType !== "past") {
  //     setYear("");
  //     setMonth("");
  //   }
  // }, [tableType]);

  return (
    <Box>
      <FormControl>
        <RadioGroup
          row
          value={tableType}
          onChange={(e) => {
            setTableType(e.target.value);
            // if (e.target.value === "past") {
            //   setOpen(true);
            // }
          }}
        >
          <FormControlLabel
            value="future"
            control={<Radio />}
            label="הזמנות עתידיות"
          />
          <FormControlLabel
            value="past"
            control={<Radio />}
            label="הזמנות קודמות"
          />
          <FormControlLabel
            value="all"
            control={<Radio />}
            label="כל ההזמנות"
          />
        </RadioGroup>
      </FormControl>

      <OrderTable
        tableType={tableType}
      />
    </Box>
  );
}

export default Orders;
