import express from "express";
import cors from "cors";
import customersRoutes from "./routes/customersRoutes.js";
import reservationsRoutes from "./routes/reservationsRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/customers", customersRoutes);
app.use("/api/reservations", reservationsRoutes);

export default app;
