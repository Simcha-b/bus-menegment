import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  Box,
  Paper,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { sendNewOrder } from "../services/ordersService";
import { CompanySelector } from "../components/NewOrder/CompanySelector";
import { useNavigate } from "react-router-dom";
// import BasicTimePicker from "../components/NewOrder/BasicTimePicker";
import BasicDatePicker from "../components/NewOrder/BasicDatePicker";
import CustomerContactSelector from "../components/NewOrder/CustomerContactSelector";

function NewOrder() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_id: 0,
    contact_id: 0,
    company_id: 0,
    trip_details: "",
    start_time: "",
    end_time: "",
    bus_quantity: 0,
    price_per_bus_customer: 0,
    price_customer: 0,
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
  useEffect(() => {
    if (location.state && location.state.order) {
      console.log("Edit order:", location.state.order);

      setFormData(location.state.order);
    }
  }, [location.state]);
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

  const calculateTotals = () => {
    const busQuantity = Number(formData.bus_quantity);
    const pricePerBus = Number(formData.price_per_bus_customer);
    const extraPay = Number(formData.extra_pay_customer);
    const price_customer = busQuantity * pricePerBus;
    const totalCustomer = price_customer + extraPay;
    const totalCompany =
      Number(formData.price_company) + Number(formData.extra_pay_company);

    setFormData((prevData) => ({
      ...prevData,
      price_customer: price_customer,
      total_price_customer: totalCustomer,
      total_price_company: totalCompany,
    }));
  };
  useEffect(() => {
    calculateTotals();
  }, [
    formData.bus_quantity,
    formData.price_per_bus_customer,
    formData.extra_pay_customer,
    formData.price_company,
    formData.extra_pay_company,
  ]);

  const handleSubmit = async () => {
    try {
      const response = await sendNewOrder(formData);
      if (response.success) {
        console.log("Order submitted successfully:", response);
        setOpen(true);
        setTimeout(() => {
          navigate("/orders");
        }, 3000);
      } else {
        console.log("Error submitting order:", response);
        // Show error message to user
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      // Show error message to user
    }
  };

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: theme.spacing(2),
  }));
  return (
    <>
      <Box
        dir="rtl"
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
        }}
      >
        <BasicDatePicker setFormData={setFormData} formData={formData} />
        <CustomerContactSelector
          setFormData={setFormData}
          formData={formData}
        />
        <TextField
          required
          dir="rtl"
          id="trip_details"
          label="פרטי הנסיעה"
          variant="outlined"
          value={formData.trip_details}
          onChange={handleInputChange}
        />
        <TextField
          id="start_time"
          label="שעת התחלה"
          variant="outlined"
          value={formData.start_time}
          onChange={handleInputChange}
        />
        {/* <BasicTimePicker
            label="start_time"
            formData={formData}
            setFormData={setFormData}
          /> */}
        <TextField
          id="end_time"
          label="שעת סיום"
          variant="outlined"
          value={formData.end_time}
          onChange={handleInputChange}
        />
        <TextField
          id="bus_quantity"
          label="כמות אוטובוסים"
          type="number"
          variant="outlined"
          value={formData.bus_quantity}
          sx={{ width: "10ch" }}
          //למנוע מינוס
          onChange={handleInputChange}
        />
        <TextField
          id="price_per_bus_customer"
          label="מחיר לאוטובוס"
          variant="outlined"
          value={formData.price_per_bus_customer}
          onChange={handleInputChange}
        />
        <TextField
          id="price_customer"
          label="מחיר ללקוח"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.price_customer}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <CompanySelector setFormData={setFormData} />

        <TextField
          id="extra_pay_customer"
          label="תשלומים נוספים"
          variant="outlined"
          value={formData.extra_pay_customer}
          onChange={handleInputChange}
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
          value={formData.total_price_customer}
        />
        <TextField
          id="notes_customer"
          label="הערות"
          variant="outlined"
          multiline={true}
          value={formData.notes_customer}
          onChange={handleInputChange}
        />
        <TextField
          id="invoice"
          label="מספר חשבונית"
          variant="outlined"
          value={formData.invoice}
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
          value={formData.total_paid_customer}
          onChange={handleInputChange}
        />
        <TextField
          id="price_company"
          label="מחיר ספק לאוטובוס"
          variant="outlined"
          value={formData.price_company}
          onChange={handleInputChange}
        />
        <TextField
          id="notes_company"
          label="הערות ספק"
          variant="outlined"
          multiline={true}
          value={formData.notes_company}
          onChange={handleInputChange}
        />
        <TextField
          id="extra_pay_company"
          label="תשלומים נוספים"
          variant="outlined"
          value={formData.extra_pay_company}
          onChange={handleInputChange}
        />
        <TextField
          id="total_price_company"
          label="סכום כולל ספק"
          variant="outlined"
          value={formData.total_price_company}
          onChange={handleInputChange}
        />
        <FormControlLabel
          control={<Checkbox />}
          id="submitted_invoice"
          label="הגיש חשבונית"
          onChange={handleInputChange}
        />
      </Box>

      {location.state ? (
        <Button onClick={() => {}} variant="contained">
          עדכן
        </Button>
      ) : (
        <Button onClick={handleSubmit} variant="contained">
          שלח
        </Button>
      )}

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
export default NewOrder;
