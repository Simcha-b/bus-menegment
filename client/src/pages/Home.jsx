import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import BasicDatePicker from "../componenets/BasicDatePicker";
import BasicTimePicker from "../componenets/BasicTimePicker";
function Home() {
  const [formData, setFormData] = useState({
    company_name: "",
    order_name: "",
    travel_details: "",
    date: "",
    bus_number: "",
    start_time: "",
    end_time: "",
  });

  //handleChange
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  //handleSubmit
  async function handleSubmit(e) {
    console.log("formData", formData);
    e.preventDefault();

    const res = await fetch("http://localhost:3001/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setFormData({
      company_name: "",
      order_name: "",
      travel_details: "",
      // date: "",
      bus_number: "",
      // start_time: null,
      // end_time: null,
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <Box
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        name="company_name"
        label="מוסד"
        variant="outlined"
        value={formData.company_name}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <TextField
        name="order_name"
        label="שם המזמין"
        variant="outlined"
        value={formData.order_name}
        onChange={(e) => handleChange(e)}
      />
      <BasicDatePicker
        name="date"
        label="תאריך הנסיעה"
        setFormData={setFormData}
        formData={formData}
      />
      <TextField
        name="bus_number"
        label="כמות אוטובוסים"
        variant="outlined"
        type="number"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        onChange={(e) => handleChange(e)}
      />
      <TextField
        name="travel_details"
        label="פירוט הנסיעה"
        variant="outlined"
        value={formData.travel_details}
        onChange={(e) => handleChange(e)}
      />

      <BasicTimePicker
        name="start_time"
        label={"start_time"}
        setFormData={setFormData}
        formData={formData}
      />

      <BasicTimePicker
        name="end_time"
        label={"end_time"}
        setFormData={setFormData}
        formData={formData}
      />

      <Button variant="contained" type="submit">
        שלח
      </Button>
    </Box>
  );
}

export default Home;
