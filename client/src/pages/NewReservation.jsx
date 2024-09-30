import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Checkbox, FormControlLabel } from "@mui/material";
import ComboBox from "../components/ComboBox";
import { getCustomers } from "../services/customersService";

function NewReservation() {
  const [number, setNumber] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const numBus = React.useRef();
  const price = React.useRef();
  const extra = React.useRef();
  const handleChange = () => {
    setNumber(Number(price.current.value) * Number(numBus.current.value));
  };
  return (
    <>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        // autoComplete="off"
      >
        <ComboBox />
        {
          //TODO date piker
        }
        <TextField id="contact_name" label="איש קשר" variant="outlined" />
        <TextField id="trip_details" label="פרטי הנסיעה" variant="outlined" />
        <TextField id="start_time" label="שעת התחלה" variant="outlined" />
        <TextField id="end_time" label="שעת סיום" variant="outlined" />
        <TextField
          id="bus_quantity"
          label="כמות אוטובוסים"
          type="number"
          variant="outlined"
          //למנוע מינוס
          inputRef={numBus}
          onChange={() => handleChange()}
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
        />
        <TextField
          id="extra_pay_customer"
          label="תשלומים נוספים"
          variant="outlined"
          inputRef={extra}
          onChange={() => setTotal(number + Number(extra.current.value))}
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
        />
        <TextField
          id="notes"
          label="הערות"
          variant="outlined"
          multiline={true}
        />
        <TextField id="invoice" label="מספר חשבונית" variant="outlined" />
        <TextField id="customer_id" label="זיהוי לקוח" variant="outlined" />
        <FormControlLabel control={<Checkbox />} label="שולם" />
        <TextField
          id="total_paid_customer"
          label="סה''כ שולם"
          variant="outlined"
        />
        <TextField
          id="price_company"
          label="מחיר ספק לאוטובוס"
          variant="outlined"
        />
        <TextField
          id="notes_company"
          label="הערות ספק"
          variant="outlined"
          multiline={true}
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
        />
        <FormControlLabel control={<Checkbox />} label="הגיש חשבונית" />
      </Box>
      <button onClick={() => getCustomers()}>שלח</button>
      <button>חזור</button>
    </>
  );
}
export default NewReservation;
