import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getCompanies } from "../services/companiesService.js";
export function CompanySelector({ setFormData }) {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const { data: companies, isLoading: isLoadingCompanies } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  useEffect(() => {
    if (selectedCompany) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        company_id: selectedCompany.id,
      }));
    }
  }, [selectedCompany, setFormData]);
  const companyOptions = companies || [];

  return (
    <Autocomplete
      disablePortal
      id="company"
      options={companyOptions}
      loading={isLoadingCompanies}
      value={selectedCompany}
      sx={{ width: 300 }}
      onChange={(event, value) => {
        setSelectedCompany(value);
      }}
      renderInput={(params) => <TextField {...params} label="בחר חברה" />}
    />
  );
}
