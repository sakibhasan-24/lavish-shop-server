import express from "express";
import cookieParser from "cookie-parser";
import connectDb from "./connection/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = 3000;

connectDb();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
