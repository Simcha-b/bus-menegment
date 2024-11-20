import express from "express";
import app from "./app.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT;

app.use(express.static(path.join(__dirname, "../client/build")));

// app.use((req, res) => {
//   res.status(404).json({ error: "Not Found" });
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});