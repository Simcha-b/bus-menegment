import express from "express";
import cors from "cors";
import customersRoutes from "./routes/customersRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import contactsRoutes from "./routes/contactRoutes.js";
// import institutionsRoutes from "./routes/institutionsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/customers", customersRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/contacts", contactsRoutes);
// app.use("/api/institutions", institutionsRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
  });
  
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  });

export default app;
