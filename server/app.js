import express from "express";
import cors from "cors";
import customersRoutes from "./routes/customersRoutes.js";
import reservationsRoutes from "./routes/reservationsRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/customers", customersRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/companies", companyRoutes);

export default app;
