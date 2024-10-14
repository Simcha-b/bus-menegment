import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicDatePicker({ formData, setFormData }) {
  function handleDateChange(newDate) {
    const formattedDate = newDate.toISOString().split("T")[0]; // המרת התאריך לפורמט YYYY-MM-DD
    setFormData({ ...formData, date: formattedDate });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onChange={(newValue) => {
         handleDateChange(newValue);
        }}
      />
    </LocalizationProvider>
  );
}
