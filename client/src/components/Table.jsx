import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "reservation_id", headerName: "ID", width: 70 },
  {
    field: "reservation_date",
    headerName: "תאריך",
    width: 90,
  },
  { field: "institution_name", headerName: "שם הלקוח", width: 130 },
  {
    field: "start_time",
    headerName: "שעת התחלה",
    width: 90,
  },
  {
    field: "end_time",
    headerName: "שעת סיום",
    width: 90,
  },
  {
    field: "bus_quantity",
    headerName: "כמות",
    type: "number",
    width: 90,
  },
  { field: "trip_details", headerName: "פרטי טיול", width: 250 },
  { field: "company_name", headerName: "פרטי מבצע", width: 200 },
];

const paginationModel = { page: 0, pageSize: 5 };

export function Table({ data }) {
  const rows = data;
  console.log(rows);
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.order_id}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0, direction: "rtl" }}
      />
    </Paper>
  );
}
