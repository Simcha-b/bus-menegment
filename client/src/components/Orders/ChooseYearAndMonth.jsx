import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

export default function ChooseYearAndMonth(props) {
  const navigate = useNavigate();
  const setOpenProps = props.setOpen;
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  

  //לשנות את הפונקציה לתאריך מינימום
  const years = [
    new Date().getFullYear().toString(),
    (new Date().getFullYear() - 1).toString(),
    (new Date().getFullYear() - 2).toString(),
    (new Date().getFullYear() - 3).toString(),
  ];
  const handleClose = () => {
    // setOpen(false);
    setOpenProps(false);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <Dialog month={month} year={year} open={props.open} onClose={handleClose}>
      <DialogTitle> שנה וחודש</DialogTitle>
      <DialogContent>
        <DialogContentText>בחר שנה וחודש להצגת הנתונים בטבלה</DialogContentText>
        <Box
          noValidate
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            width: "fit-content",
          }}
        >
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <InputLabel htmlFor="year">שנה</InputLabel>
            <Select
              value={year}
              onChange={handleYearChange}
              label="year"
              inputProps={{
                name: "year",
                id: "year",
              }}
            >
              {years.map((year) => (
                <MenuItem value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <InputLabel htmlFor="month">חודש</InputLabel>
            <Select
              value={month}
              onChange={handleMonthChange}
              label="month"
              inputProps={{
                name: "month",
                id: "month",
              }}
            >
              <MenuItem value="">בחר חודש</MenuItem>
              <MenuItem value="01">ינואר</MenuItem>
              <MenuItem value="02">פברואר</MenuItem>
              <MenuItem value="03">מרץ</MenuItem>
              <MenuItem value="04">אפריל</MenuItem>
              <MenuItem value="05">מאי</MenuItem>
              <MenuItem value="06">יוני</MenuItem>
              <MenuItem value="07">יולי</MenuItem>
              <MenuItem value="08">אוגוסט</MenuItem>
              <MenuItem value="09">ספטמבר</MenuItem>
              <MenuItem value="10">אוקטובר</MenuItem>
              <MenuItem value="11">נובמבר</MenuItem>
              <MenuItem value="12">דצמבר</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            navigate("/orders/past", {
              state: {
                year: year,
                month: month,
              },
            });
          }}
        >
          אישור
        </Button>
        <Button onClick={handleClose}>ביטול</Button>
      </DialogActions>
    </Dialog>
  );
}
