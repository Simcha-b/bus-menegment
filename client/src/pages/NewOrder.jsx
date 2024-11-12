import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { sendNewOrder } from "../services/ordersService";
import { CompanySelector } from "../components/NewOrder/CompanySelector";
import { useNavigate } from "react-router-dom";
// import BasicTimePicker from "../components/NewOrder/BasicTimePicker";
import BasicDatePicker from "../components/NewOrder/BasicDatePicker";
import CustomerContactSelector from "../components/NewOrder/CustomerContactSelector";
import BasicTimePicker from "../components/NewOrder/BasicTimePicker";

function NewOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const companyRef = useRef();

  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);

  const [priceCustomer, setPriceCustomer] = useState(0);
  const [totalPriceCustomer, setTotalPriceCustomer] = useState(0);
  const [totalPriceCompany, setTotalPriceCompany] = useState(0);

  const [formData, setFormData] = useState({
    customer_id: 0,
    contact_id: 0,
    company_id: 0,
    trip_details: "",
    start_time: null,
    end_time: null,
    bus_quantity: null,
    price_per_bus_customer: null,
    extra_pay_customer: null,
    notes_customer: "",
    paid: false,
    total_paid_customer: null,
    price_per_bus_company: null,
    notes_company: "",
    extra_pay_company: null,
    submitted_invoice: false,
    status: "חסר שיבוץ",
  });

  const [errors, setErrors] = useState({});

  //function to calculate the price
  const calculatePrice = () => {
    const priceCustomer =
      Number(formData.bus_quantity) * Number(formData.price_per_bus_customer);
    setPriceCustomer(priceCustomer);
    const totalPriceCustomer =
      priceCustomer + Number(formData.extra_pay_customer);
    setTotalPriceCustomer(totalPriceCustomer);
    const totalPriceCompany =
      Number(formData.bus_quantity) * Number(formData.price_per_bus_company) +
      Number(formData.extra_pay_company);
    setTotalPriceCompany(totalPriceCompany);
  };

  useEffect(() => {
    calculatePrice();
  }, [formData]);

  useEffect(() => {
    if (location.state && location.state.order) {
      console.log("Edit order:", location.state.order);
      // companyRef.current.focus();
      setFormData(location.state.order);
    }
  }, [location.state]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  const handleInputChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === "Checkbox" ? checked : value,
    }));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.trip_details) newErrors.trip_details = "פרטי הנסיעה נדרשים";
    if (!formData.customer_id) newErrors.customer_id = "לקוח נדרש";
    if (!formData.contact_id) newErrors.contact_id = "איש קשר נדרש";
    // if (!formData.start_time) newErrors.start_time = "שעת התחלה נדרשת";
    // if (!formData.end_time) newErrors.end_time = "שעת סיום נדרשת";
    if (!formData.bus_quantity) newErrors.bus_quantity = "כמות אוטובוסים נדרשת";
    if (!formData.order_date) newErrors.date = "תאריך נדרש";
    // if (showPaymentDetails && !formData.price_per_bus_customer)
    //   newErrors.price_per_bus_customer = "מחיר לאוטובוס נדרש";
    // if (showCompanyDetails && !formData.price_per_bus_company)
    //   newErrors.price_per_bus_company = "מחיר ספק לאוטובוס נדרש";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setErrorMessage("אנא מלא את כל השדות הנדרשים");
      setErrorOpen(true);
    }
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async () => {
    if (!validateForm()) return;
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

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      {/* Main Form Container */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          }}
        >
          {/* Trip Details Section */}
          <Box
            sx={{
              gridColumn: "1/-1",
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            }}
          >
            <BasicDatePicker setFormData={setFormData} formData={formData} />

            <Box sx={{ gridColumn: "1/-1" }}>
              <CustomerContactSelector
                setFormData={setFormData}
                formData={formData}
                errors={errors}
              />
            </Box>
            <TextField
              required
              fullWidth
              dir="rtl"
              id="trip_details"
              label="פרטי הנסיעה"
              variant="outlined"
              value={formData.trip_details}
              onChange={handleInputChange}
              error={!!errors.trip_details}
              helperText={errors.trip_details}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 2,
              }}
            >
              <BasicTimePicker
                label="שעת התחלה"
                keyTable="start_time"
                formData={formData}
                setFormData={setFormData}
                // error={!!errors.start_time}
                // helperText={errors.start_time}
              />
              <BasicTimePicker
                label="שעת סיום"
                keyTable="end_time"
                formData={formData}
                setFormData={setFormData}
                // error={!!errors.end_time}
                // helperText={errors.end_time}
              />
              <TextField
                fullWidth
                id="bus_quantity"
                label="כמות אוטובוסים"
                type="number"
                variant="outlined"
                value={formData.bus_quantity}
                onChange={handleInputChange}
                error={!!errors.bus_quantity}
                helperText={errors.bus_quantity}
              />
            </Box>
          </Box>

          {/* Payment Details Section */}
          <Button
            variant="contained"
            onClick={() => setShowPaymentDetails(!showPaymentDetails)}
            sx={{
              gridColumn: "1/-1",
              justifySelf: "start",
              maxWidth: "180px",
              minWidth: "140px",
              height: "36px",
            }}
          >
            {showPaymentDetails ? "הסתר פרטי תשלום" : "הוסף פרטי תשלום"}
          </Button>

          {showPaymentDetails && (
            <Paper elevation={2} sx={{ p: 2, gridColumn: "1/-1" }}>
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                }}
              >
                <TextField
                  fullWidth
                  id="price_per_bus_customer"
                  label="מחיר לאוטובוס"
                  variant="outlined"
                  value={formData.price_per_bus_customer}
                  onChange={handleInputChange}
                  error={!!errors.price_per_bus_customer}
                  helperText={errors.price_per_bus_customer}
                />
                <TextField
                  fullWidth
                  id="extra_pay_customer"
                  label="תשלומים נוספים"
                  variant="outlined"
                  value={formData.extra_pay_customer}
                  onChange={handleInputChange}
                />
                <Box sx={{ gridColumn: "1/-1" }}>
                  <Typography variant="h6">
                    {`מחיר ללקוח: ${priceCustomer} ש"ח`}
                  </Typography>
                  <Typography variant="h6">
                    {`סכום כולל: ${totalPriceCustomer} ש"ח`}
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  id="notes_customer"
                  label="הערות"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={formData.notes_customer}
                  onChange={handleInputChange}
                  sx={{ gridColumn: "1/-1" }}
                />
              </Box>
            </Paper>
          )}

          {/* Company Details Section */}
          <Button
            variant="contained"
            onClick={() => setShowCompanyDetails(!showCompanyDetails)}
            sx={{
              gridColumn: "1/-1",
              justifySelf: "start",
              maxWidth: "180px",
              minWidth: "140px",
              height: "36px",
            }}
          >
            {showCompanyDetails ? "הסתר פרטי ספק" : "הוסף פרטי ספק"}
          </Button>

          {showCompanyDetails && (
            <Paper
              elevation={2}
              sx={{ p: 2, gridColumn: "1/-1" }}
              ref={companyRef}
            >
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                }}
              >
                <CompanySelector setFormData={setFormData} />
                <TextField
                  fullWidth
                  id="invoice"
                  label="מספר חשבונית"
                  variant="outlined"
                  value={formData.invoice}
                  onChange={handleInputChange}
                />
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    id="paid"
                    label="שולם"
                    onChange={handleInputChange}
                  />
                  <TextField
                    fullWidth
                    id="total_paid_customer"
                    label="סה''כ שולם"
                    variant="outlined"
                    value={formData.total_paid_customer}
                    onChange={handleInputChange}
                  />
                </Box>
                <TextField
                  fullWidth
                  id="price_per_bus_company"
                  label="מחיר ספק לאוטובוס"
                  variant="outlined"
                  value={formData.price_per_bus_company}
                  onChange={handleInputChange}
                  error={!!errors.price_per_bus_company}
                  helperText={errors.price_per_bus_company}
                />
                <TextField
                  fullWidth
                  id="extra_pay_company"
                  label="תשלומים נוספים"
                  variant="outlined"
                  value={formData.extra_pay_company}
                  onChange={handleInputChange}
                />
                <Typography variant="h6" sx={{ gridColumn: "1/-1" }}>
                  {`סכום כולל ספק: ${totalPriceCompany} ש"ח`}
                </Typography>
                <TextField
                  fullWidth
                  id="notes_company"
                  label="הערות ספק"
                  variant="outlined"
                  multiline
                  rows={3}
                  value={formData.notes_company}
                  onChange={handleInputChange}
                  sx={{ gridColumn: "1/-1" }}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  id="submitted_invoice"
                  label="הגיש חשבונית"
                  onChange={handleInputChange}
                />
              </Box>
            </Paper>
          )}
        </Box>
      </Paper>

      {/* Submit Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        {location.state ? (
          <Button
            onClick={() => {}}
            variant="contained"
            sx={{
              width: "120px",
              height: "36px",
            }}
          >
            עדכן
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              width: "120px",
              height: "36px",
            }}
          >
            שלח
          </Button>
        )}
      </Box>

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

      <Snackbar
        open={errorOpen}
        autoHideDuration={6000}
        onClose={handleErrorClose}
        dir="rtl"
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
export default NewOrder;
