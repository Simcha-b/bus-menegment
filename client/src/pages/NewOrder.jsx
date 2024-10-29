import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Button } from "@mui/material";
import { sendNewOrder } from "../services/ordersService";
import InstitutionContactSelector from "../components/InstitutionContactSelector";
import { CompanySelector } from "../components/CompanySelector";

function NewOrder() {
  const [formData, setFormData] = useState({
    customer_id: 0,
    contact_id: 0,
    trip_details: "",
    start_time: "",
    end_time: "",
    bus_quantity: 0,
    price_per_bus_customer: 0,
    extra_pay_customer: 0,
    total_price_customer: 0,
    notes_customer: "",
    paid: false,
    total_paid_customer: 0,
    price_company: 0,
    notes_company: "",
    extra_pay_company: 0,
    total_price_company: 0,
    submitted_invoice: false,
  });

  const handleInputChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === "Checkbox" ? checked : value,
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
      const response = await sendNewOrder(formData);
      console.log("Order submitted successfully:", response);
    } catch (error) {
      console.error("Error submitting order:", error);
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
        <InstitutionContactSelector setFormData={setFormData} />
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
        <CompanySelector setFormData={setFormData} />

        {/* <TextField
          id="company_name"
          label="מבצע"
          variant="outlined"
          onChange={handleInputChange}
        /> */}
        <TextField
          id="extra_pay_customer"
          label="תשלומים נוספים"
          variant="outlined"
          // inputRef={extra}
          onChange={handleChange}
        />
        <TextField
          id="total_paid_customer"
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
          id="notes_customer"
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
export default NewOrder;
