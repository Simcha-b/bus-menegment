import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getInstitutions } from "../../services/institutionsService";
import { getContactsByInstitutionId } from "../../services/contactService";
import { Box } from "@mui/material";

export default function InstitutionContactSelector({ setFormData }) {
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  // שליפת מוסדות
  const { data: institutions, isLoading: isLoadingInstitutions } = useQuery({
    queryKey: ["institutions"],
    queryFn: getInstitutions,
  });

  // שליפת אנשי קשר של המוסד שנבחר
  const { data: contacts, isLoading: isLoadingContacts } = useQuery({
    queryKey: ["contacts", selectedInstitution?.id],
    queryFn: () => getContactsByInstitutionId(selectedInstitution?.id),
    enabled: !!selectedInstitution?.id,
  });

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
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        width: "100%",
      }}
    >
      {/* בחירת מוסד */}
      <Autocomplete
        required
        disablePortal
        options={institutionOptions}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        loading={isLoadingInstitutions}
        value={selectedInstitution}
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
        sx={{ width: 300, marginTop: 2 }}
        loading={isLoadingContacts}
        disabled={!selectedInstitution}
        value={selectedContact}
        onChange={(event, newValue) => {
          setSelectedContact(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="בחר איש קשר" />}
      />
    </Box>
  );
}
