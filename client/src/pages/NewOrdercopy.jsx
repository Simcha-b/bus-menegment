import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { Button } from "@mui/material";
import { sendNewOrder } from "../services/ordersService";
import InstitutionContactSelector from "../components/NewOrder/InstitutionContactSelector";
import { CompanySelector } from "../components/NewOrder/CompanySelector";
import { useNavigate } from "react-router-dom";
import {  Form, Input } from "antd";
function NewOrdercopy() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    order_date: "",
    customer_id: 0,
    contact_id: 0,
    company_id: 0,
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
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
    setTotal(Number(number) + Number(extra));
  };
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const response = await sendNewOrder(formData);
      console.log("Order submitted successfully:", response);
      setOpen(true);
      setTimeout(() => {
        navigate("/orders");
      }, 3000);
    } catch (error) {
      console.error("Error submitting order:", error);
      // Show error message to user
    }
  };

  return (
    <>
      <Form >
        <Input type="date" id="order_date" onChange={handleInputChange} />
        <InstitutionContactSelector setFormData={setFormData} />
        <Input
          type="text"
          required
          dir="rtl"
          id="trip_details"
          placeholder="פרטי הנסיעה"
          onChange={handleInputChange}
        />
        <Input
          type="time"
          id="start_time"
          placeholder="שעת התחלה"
          onChange={handleInputChange}
        />
        <Input
          type="time"
          id="end_time"
          placeholder="שעת סיום"
          onChange={handleInputChange}
        />
        <Input
          type="number"
          id="bus_quantity"
          placeholder="כמות אוטובוסים"
          defaultValue={number}
          //למנוע מינוס
          ref={numBus}
          onChange={() => {
            handleChange();
          }}
        />
        <Input
          type="text"
          id="price_per_bus_customer"
          placeholder="מחיר לאוטובוס"
          ref={price}
          onChange={() => handleChange()}
        />
        <Input
          type="text"
          id="price_customer"
          placeholder="מחיר ללקוח"
          onChange={handleInputChange}
          readOnly
          value={number}
        />
        <CompanySelector setFormData={setFormData} />
        <Input
          type="text"
          id="extra_pay_customer"
          placeholder="תשלומים נוספים"
          ref={extra}
          onChange={handleChange}
        />
        <Input
          type="text"
          id="total_paid_customer"
          placeholder="סכום כולל"
          readOnly
          value={total}
          // onChange={handleInputChange}
        />
        <Input
          type="text"
          id="notes_customer"
          placeholder="הערות"
          onChange={handleInputChange}
        />
        <Input
          type="text"
          id="invoice"
          placeholder="מספר חשבונית"
          onChange={handleInputChange}
        />

        <Input
          type="checkbox"
          id="paid"
          placeholder="שולם"
          onChange={handleInputChange}
        />
        <Input
          type="text"
          id="total_paid_customer"
          placeholder="סה''כ שולם"
          onChange={handleInputChange}
        />
        <Input
          type="text"
          id="price_company"
          placeholder="מחיר ספק לאוטובוס"
          onChange={handleInputChange}
        />
        <Input
          type="text"
          id="notes_company"
          placeholder="הערות ספק"
          onChange={handleInputChange}
        />
        <Input
          type="text"
          id="extra_pay_company"
          placeholder="תשלומים נוספים"
        />
        <Input
          type="text"
          id="total_price_company"
          placeholder="סכום כולל ספק"
          onChange={handleInputChange}
        />
        <Input
          type="checkbox"
          id="submitted_invoice"
          placeholder="הגיש חשבונית"
          onChange={handleInputChange}
        />
      </Form>
      <Button variant="contained" color="success" onClick={handleSubmit}>
        שלח
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        dir="rtl"
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          הזמנה נוספה בהצלחה
        </Alert>
      </Snackbar>
    </>
  );
}
export default NewOrdercopy;
