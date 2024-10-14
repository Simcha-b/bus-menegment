import React, { useState, useRef } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/he"; // ייבוא לוקליזציה לעברית
import ComboBox from "../components/ComboBox";
import { getCustomers } from "../services/customersService";

function NewReservation() {
  const [number, setNumber] = useState(0);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState(null);
  const numBus = useRef();
  const price = useRef();
  const extra = useRef();

  const handleChange = () => {
    setNumber(Number(price.current.value) * Number(numBus.current.value));
  };

  const Section = ({ title, children }) => (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {children}
    </Box>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: "auto" }}>
        <Typography variant="h4" gutterBottom align="center">
          טופס הזמנה חדשה
        </Typography>

        <Section title="פרטי הזמנה">
          <Box display="flex" flexDirection="column" gap={2}>
            <ComboBox />
            <DatePicker
              label="תאריך"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <TextField fullWidth label="איש קשר" />
            <TextField fullWidth label="פרטי הנסיעה" multiline rows={2} />
          </Box>
        </Section>

        <Section title="זמני נסיעה">
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              label="שעת התחלה"
              type="time"
              slotLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="שעת סיום"
              type="time"
              slotLabelProps={{ shrink: true }}
            />
          </Box>
        </Section>

        <Section title="פרטי תמחור">
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              label="כמות אוטובוסים"
              type="number"
              inputRef={numBus}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="מחיר לאוטובוס"
              type="number"
              inputRef={price}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="מחיר ללקוח"
              value={number}
              slotProps={{ readOnly: true }}
            />
            <TextField
              fullWidth
              label="תשלומים נוספים"
              type="number"
              inputRef={extra}
              onChange={() => setTotal(number + Number(extra.current.value))}
            />
            <TextField
              fullWidth
              label="סכום כולל"
              value={total}
              slotProps={{ readOnly: true }}
            />
          </Box>
        </Section>

        <Section title="פרטי ביצוע">
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField fullWidth label="מבצע" />
            <TextField fullWidth label="מספר חשבונית" />
            <TextField fullWidth label="זיהוי לקוח" />
            <FormControlLabel control={<Checkbox />} label="שולם" />
            <TextField fullWidth label="סה''כ שולם" />
          </Box>
        </Section>

        <Section title="פרטי ספק">
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField fullWidth label="מחיר ספק לאוטובוס" />
            <TextField fullWidth label="תשלומים נוספים" />
            <TextField fullWidth label="סכום כולל ספק" />
            <TextField fullWidth label="הערות ספק" multiline rows={3} />
            <FormControlLabel control={<Checkbox />} label="הגיש חשבונית" />
          </Box>
        </Section>

        <Box display="flex" justifyContent="flex-end" mt={4} gap={2}>
          <Button variant="contained" color="primary" onClick={getCustomers}>
            שלח
          </Button>
          <Button variant="outlined" color="secondary">
            חזור
          </Button>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
}

export default NewReservation;
