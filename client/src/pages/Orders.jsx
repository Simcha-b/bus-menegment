import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import ChooseYearAndMonth from "../components/Orders/ChooseYearAndMonth";
import OrderTable from "../components/Orders/OrderTable";

function Orders() {
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const [tableType, setTableType] = useState("future");

  useEffect(() => {
    if (tableType !== "past") {
      setYear("");
      setMonth("");
    }
  }, [tableType]);

  return (
    <Box>
      <FormControl>
        <RadioGroup
          row
          value={tableType}
          onChange={(e) => {
            setTableType(e.target.value);
            if (e.target.value === "past") {
              setOpen(true);
            }
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
      {tableType === "past" && (
        <ChooseYearAndMonth
          open={open}
          year={year}
          month={month}
          setOpen={setOpen}
          setYear={setYear}
          setMonth={setMonth}
        />
      )}
      <OrderTable
        tableType={tableType}
        year={tableType === "past" ? year : ""}
        month={tableType === "past" ? month : ""}
      />
    </Box>
  );
}

export default Orders;
