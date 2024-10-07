import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Checkbox, FormControlLabel } from "@mui/material";
import ComboBox from "../components/ComboBox";
import { getCustomers } from "../services/customersService";
import { Button } from "@mui/material";
import { sendNewReservation } from "../services/reservationsService";

function NewReservation() {
  const [formData, setFormData] = useState({
    contact_name: "",
    trip_details: "",
    start_time: "",
    end_time: "",
    bus_quantity: "",
    price_per_bus_customer: "",
    extra: "",
    total_price: "",
    notes: "",
    paid: false,
    total_paid_customer: "",
    price_company: "",
    notes_company: "",
    extra_pay_company: "",
    total_price_company: "",
    submitted_invoice: false,
  });

  const handleInputChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const [number, setNumber] = useState(0);
  const [total, setTotal] = useState(0);
  const numBus = React.useRef();
  const price = React.useRef();
  const extra = React.useRef();
  const handleChange = () => {
    setNumber(Number(price.current.value) * Number(numBus.current.value));
  };

 
  const handleSubmit = async () => {
    try {
      const response = await sendNewReservation(formData);
      console.log("Reservation submitted successfully:", response);
      // Reset form or show success message
    } catch (error) {
      console.error("Error submitting reservation:", error);
      // Show error message to user
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        // autoComplete="off"
      >
        {
          //TODO date piker
        }
        {/* <ComboBox id="institution_name" label="מוסד" onChange={handleInputChange} /> */}
        <TextField
          id="institution_name"
          label="מוסד"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="contact_name"
          label="איש קשר"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="trip_details"
          label="פרטי הנסיעה"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="start_time"
          label="שעת התחלה"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="end_time"
          label="שעת סיום"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="bus_quantity"
          label="כמות אוטובוסים"
          type="number"
          variant="outlined"
          //למנוע מינוס
          inputRef={numBus}
          onChange={() => {
            handleChange();
          }}
        />
        <TextField
          id="price_per_bus_customer"
          label="מחיר לאוטובוס"
          variant="outlined"
          inputRef={price}
          onChange={() => handleChange()}
        />
        <TextField
          id="price_customer"
          label="מחיר ללקוח"
          variant="outlined"
          onChange={handleInputChange}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          value={number}
        />

        <TextField
          id="company_name"
          //לעשות השלמה אוטומטית
          label="מבצע"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="extra_pay_customer"
          label="תשלומים נוספים"
          variant="outlined"
          inputRef={extra}
          onChange={handleChange}
        />
        <TextField
          id="total_price"
          label="סכום כולל"
          variant="outlined"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          value={total}
          // onChange={handleInputChange}
        />
        <TextField
          id="notes"
          label="הערות"
          variant="outlined"
          multiline={true}
          onChange={handleInputChange}
        />
        <TextField
          id="invoice"
          label="מספר חשבונית"
          variant="outlined"
          onChange={handleInputChange}
        />
        <FormControlLabel
          control={<Checkbox />}
          id="paid"
          label="שולם"
          onChange={handleInputChange}
        />
        <TextField
          id="total_paid_customer"
          label="סה''כ שולם"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="price_company"
          label="מחיר ספק לאוטובוס"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="notes_company"
          label="הערות ספק"
          variant="outlined"
          multiline={true}
          onChange={handleInputChange}
        />
        <TextField
          id="extra_pay_company"
          label="תשלומים נוספים"
          variant="outlined"
        />
        <TextField
          id="total_price_company"
          label="סכום כולל ספק"
          variant="outlined"
          onChange={handleInputChange}
        />
        <FormControlLabel
          control={<Checkbox />}
          id="submitted_invoice"
          label="הגיש חשבונית"
          onChange={handleInputChange}
        />
      </Box>
      <Button variant="contained" color="success" onClick={handleSubmit}>
        שלח
      </Button>
    </>
  );
}
export default NewReservation;
