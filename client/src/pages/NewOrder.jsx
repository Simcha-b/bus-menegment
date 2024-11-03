import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import {
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  FormControl,
  Box,
  Paper,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { sendNewOrder } from "../services/ordersService";
import InstitutionContactSelector from "../components/NewOrder/InstitutionContactSelector";
import { CompanySelector } from "../components/NewOrder/CompanySelector";
import { useNavigate } from "react-router-dom";
// import BasicTimePicker from "../components/NewOrder/BasicTimePicker";
import BasicDatePicker from "../components/NewOrder/BasicDatePicker";

function NewOrder() {
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
    console.log(formData);

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
      <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 2 }}>
        <StyledPaper elevation={3}>
        <h5>פרטי ההזמנה</h5>
          <Box component="form" 
           sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <BasicDatePicker setFormData={setFormData} formData={formData} />
            <InstitutionContactSelector setFormData={setFormData} formData={formData} />
            <TextField
              required
              fullWidth
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
            <TextField
              id="end_time"
              label="שעת סיום"
              variant="outlined"
              value={formData.end_time}
              onChange={handleInputChange}
            />
          </Box>
        </StyledPaper>
  
        {/* Bus and Price Information */}
        <StyledPaper elevation={3}>
          <Box dir="rtl" sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <TextField
              id="bus_quantity"
              label="כמות אוטובוסים"
              type="number"
              variant="outlined"
              value={formData.bus_quantity}
              onChange={handleInputChange}
              InputProps={{ inputProps: { min: 0 } }}
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
              value={formData.price_customer}
              onChange={handleInputChange}
              InputProps={{ readOnly: true }}
            />
            <CompanySelector setFormData={setFormData} />
          </Box>
        </StyledPaper>
  
        {/* Customer Payment Information */}
        <StyledPaper elevation={3}>
          <Box dir="rtl" sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
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
              value={formData.total_price_customer}
              InputProps={{ readOnly: true }}
            />
            <TextField
              id="notes_customer"
              label="הערות"
              variant="outlined"
              multiline
              rows={3}
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
              control={<Checkbox checked={formData.paid} onChange={handleInputChange} />}
              id="paid"
              label="שולם"
            />
            <TextField
              id="total_paid_customer"
              label='סה"כ שולם'
              variant="outlined"
              value={formData.total_paid_customer}
              onChange={handleInputChange}
            />
          </Box>
        </StyledPaper>
  
        {/* Company Information */}
        <StyledPaper elevation={3}>
          <Box dir="rtl" sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
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
              multiline
              rows={3}
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
              control={<Checkbox checked={formData.submitted_invoice} onChange={handleInputChange} />}
              id="submitted_invoice"
              label="הגיש חשבונית"
            />
          </Box>
        </StyledPaper>
  
        {/* Submit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" color="success" onClick={handleSubmit} size="large">
            שלח
          </Button>
        </Box>
  
        {/* Success Snackbar */}
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} dir="rtl">
          <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
            הזמנה נוספה בהצלחה
          </Alert>
        </Snackbar>
      </Box>
    );
  };
  
export default NewOrder;
