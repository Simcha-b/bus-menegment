import express from "express";
import app from "./app.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3001;

// שנה את הנתיב כאן
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});