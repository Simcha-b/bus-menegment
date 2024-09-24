import express from "express";
import cors from "cors";
import customersRoutes from "./routes/customersRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/customers", customersRoutes);


export default app;
