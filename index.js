import express from "express";
import noteRoutes from "./src/routes/noteRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Online Notes is running on port ${port}`);
});
