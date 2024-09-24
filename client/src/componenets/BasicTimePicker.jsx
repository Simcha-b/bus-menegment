import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

export default function BasicTimePicker({ label, formData, setFormData }) {
  function handleTimeChange(newTime) {
    const formattedTime = dayjs(newTime).format("HH:mm");
    console.log(formattedTime);
    setFormData({ ...formData, [label]: formattedTime });
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        onChange={(newValue) => handleTimeChange(newValue)}
      />
    </LocalizationProvider>
  );
}
