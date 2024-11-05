import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";

export default function ChooseYearAndMonth() {
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <Dialog month={month} year={year} open={open} onClose={handleClose}>
      <DialogTitle>בחירת שנה וחודש להצגה</DialogTitle>
      <DialogContent>
        <DialogContentText>
          בחר שנה וחודש להצגת הנתונים בטבלה{" "}
        </DialogContentText>
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
            <InputLabel htmlFor="year">year</InputLabel>
            <Select
              autoFocus
              value={year}
              onChange={handleYearChange}
              label="year"
              inputProps={{
                name: "year",
                id: "year",
              }}
            >
              <MenuItem value={false}>false</MenuItem>
              <MenuItem value="2020">2020</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
            </Select>
          </FormControl>
          {/* <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="year">year</InputLabel>
              <Select
                autoFocus
                value={year}
                onChange={handleYearChange}
                label="year"
                inputProps={{
                  name: "year",
                  id: "year",
                }}
              >
                <MenuItem value={false}>false</MenuItem>
                <MenuItem value="2020">2020</MenuItem>
                <MenuItem value="2021">2021</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2023">2023</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
              </Select>
            </FormControl> */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
