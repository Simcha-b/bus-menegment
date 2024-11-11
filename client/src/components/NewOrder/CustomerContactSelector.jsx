import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getCustomers } from "../../services/customersService";
import { getContactsByCustomerId } from "../../services/contactService";
import AddNewCustomer from "../customers/AddNewCustomer";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Box,
} from "@mui/material";
export default function CustomerContactSelector({
  setFormData,
  formData,
  errors,
}) {
  const [value, setValue] = useState("old");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  // שליפת לקוחות
  const { data: customers, isLoading: isLoadingCustomers } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  // שליפת אנשי קשר של המוסד שנבחר
  const { data: contacts, isLoading: isLoadingContacts } = useQuery({
    queryKey: ["contacts", selectedCustomer?.id],
    queryFn: () => getContactsByCustomerId(selectedCustomer?.customer_id),
    enabled: !!selectedCustomer?.customer_id,
  });

  useEffect(() => {
    if (formData.customer_id && customers) {
      const customer = customers.find(
        (inst) => inst.customer_id === formData.customer_id
      );
      setSelectedCustomer(customer);
    }
  }, [formData.customer_id, customers]);

  useEffect(() => {
    if (formData.contact_id && contacts) {
      const contact = contacts.find((cont) => cont.id === formData.contact_id);
      setSelectedContact(contact);
    }
  }, [formData.contact_id, contacts]);

  useEffect(() => {
    if (selectedCustomer) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        customer_id: selectedCustomer.customer_id,
      }));
    }
  }, [selectedCustomer, setFormData]);

  useEffect(() => {
    if (selectedContact) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        contact_id: selectedContact.id,
      }));
    }
  }, [selectedContact, setFormData]);

  const customerOptions = customers || [];
  const contactOptions = contacts || [];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <FormControl>
        <FormLabel>בחירת לקוח</FormLabel>
        <RadioGroup
          row
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <FormControlLabel value="old" control={<Radio />} label="לקוח קיים" />
          <FormControlLabel value="new" control={<Radio />} label="לקוח חדש" />
        </RadioGroup>
      </FormControl>

      {value === "new" && <AddNewCustomer />}
      {value === "old" && (
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <Autocomplete
            required
            disablePortal
            fullWidth
            options={customerOptions}
            getOptionLabel={(option) => option.name}
            loading={isLoadingCustomers}
            value={selectedCustomer}
            onChange={(event, newValue) => {
              setSelectedCustomer(newValue);
              setSelectedContact(null);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="בחר מוסד"
                error={!!errors.customer_id}
                helperText={errors.customer_id}
              />
            )}
          />

          <Autocomplete
            required
            disablePortal
            fullWidth
            options={contactOptions}
            getOptionLabel={(option) => option.name}
            loading={isLoadingContacts}
            disabled={!selectedCustomer}
            value={selectedContact}
            onChange={(event, newValue) => {
              setSelectedContact(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="בחר איש קשר"
                error={!!errors.contact_id}
                helperText={errors.contact_id}
              />
            )}
          />
        </Box>
      )}
    </Box>
  );
}
