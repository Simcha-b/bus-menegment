import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getCustomers } from "../../services/customersService";
import { getContactsByCustomerId } from "../../services/contactService";

export default function CustomerContactSelector({ setFormData, formData}) {

  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  // שליפת לקוחות
  const { data: institutions, isLoading: isLoadingInstitutions } = useQuery({
    queryKey: ["institutions"],
    queryFn: getCustomers,
  });

  // שליפת אנשי קשר של המוסד שנבחר
  const { data: contacts, isLoading: isLoadingContacts } = useQuery({
    queryKey: ["contacts", selectedInstitution?.id],
    queryFn: () => getContactsByCustomerId(selectedInstitution?.customer_id),
    enabled: !!selectedInstitution?.customer_id,
  });

  useEffect(() => {
    if (formData.customer_id && institutions) {
      const institution = institutions.find((inst) => inst.customer_id === formData.customer_id);
      setSelectedInstitution(institution);      
    }
  }, [formData.customer_id, institutions]);

  useEffect(() => {
    if (formData.contact_id && contacts) {
      const contact = contacts.find((cont) => cont.id === formData.contact_id);
      setSelectedContact(contact);
    }
  }, [formData.contact_id, contacts]);

  useEffect(() => {
    if (selectedInstitution) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        customer_id: selectedInstitution.id,
      }));
    }
  }, [selectedInstitution, setFormData]);

  useEffect(() => {
    if (selectedContact) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        contact_id: selectedContact.id,
      }));
    }
  }, [selectedContact, setFormData]);

  const institutionOptions = institutions || [];
  const contactOptions = contacts || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* בחירת מוסד */}
      <Autocomplete
        required
        disablePortal
        options={institutionOptions}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        loading={isLoadingInstitutions}
        value={formData.in||selectedInstitution}
        onChange={(event, newValue) => {
          setSelectedInstitution(newValue);
          setSelectedContact(null);
        }}
        renderInput={(params) => <TextField {...params} label="בחר מוסד" />}
      />

      {/* בחירת איש קשר */}
      <Autocomplete
        required
        disablePortal
        options={contactOptions}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        loading={isLoadingContacts}
        disabled={!selectedInstitution}
        value={selectedContact}
        onChange={(event, newValue) => {
          setSelectedContact(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="בחר איש קשר" />}
      />
    </div>
  );
}
