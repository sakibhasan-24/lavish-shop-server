import express from "express";
import connectDb from "./connection/db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 3000;

connectDb();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
