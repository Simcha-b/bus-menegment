import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  IconButton,
  Input,
  Box,
} from "@mui/material";
import { addNewCustomer } from "../../services/customersService";

const AddNewCustomer = ({ customers, setCustomers }) => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    contacts: [{ name: "", phone: "", email: "" }],
  });
  const [open, setOpen] = useState(false);

  const handleAddCustomer = async (newCustomer) => {
    const res = await addNewCustomer(newCustomer);
    if (res) {
      setCustomers([...customers, newCustomer]);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCustomer({
      name: "",
      email: "",
      phone: "",
      address: "",
      contacts: [""],
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };
  const handleContactChange = (index, field, value) => {
    const newContacts = [...customer.contacts];
    newContacts[index] = {
      ...newContacts[index],
      [field]: value,
    };
    setCustomer({
      ...customer,
      contacts: newContacts,
    });
  };

  const addContactField = () => {
    setCustomer({
      ...customer,
      contacts: [...customer.contacts, ""],
    });
  };

  const handleSubmit = () => {
    // Send customer data to the database
    handleAddCustomer(customer);
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          gridColumn: "1/-1",
          justifySelf: "start",
          maxWidth: "180px",
          minWidth: "140px",
          height: "36px",
        }}
        onClick={() => setOpen(true)}
      >
        הוסף לקוח חדש
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>הוסף לקוח חדש</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="שם"
            type="text"
            fullWidth
            variant="standard"
            value={customer.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="אימייל"
            type="email"
            fullWidth
            variant="standard"
            value={customer.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="טלפון"
            type="text"
            fullWidth
            variant="standard"
            value={customer.phone}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="כתובת"
            type="text"
            fullWidth
            variant="standard"
            value={customer.address}
            onChange={handleChange}
          />
          {customer.contacts.map((contact, index) => (
            <Box key={index} sx={{ display: "flex" }}>
              איש קשר {index + 1}
              <TextField
                margin="dense"
                label={`שם איש קשר ${index + 1}`}
                type="text"
                fullWidth
                variant="outlined"
                value={contact.name}
                onChange={(e) =>
                  handleContactChange(index, "name", e.target.value)
                }
              />
              <TextField
                variant="outlined"
                margin="dense"
                label={`טלפון איש קשר ${index + 1}`}
                type="text"
                fullWidth
                value={contact.phone}
                onChange={(e) =>
                  handleContactChange(index, "phone", e.target.value)
                }
              />
              <TextField
                variant="outlined"
                margin="dense"
                label={`אימייל איש קשר ${index + 1}`}
                type="email"
                fullWidth
                value={contact.email}
                onChange={(e) =>
                  handleContactChange(index, "email", e.target.value)
                }
              />
            </Box>
          ))}
          <Button variant="contained" onClick={addContactField}>
            הוסף איש קשר
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ביטול</Button>
          <Button onClick={handleSubmit}>הוסף</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNewCustomer;
