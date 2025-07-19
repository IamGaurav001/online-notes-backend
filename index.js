import express from "express";
import noteRoutes from "./src/routes/noteRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from 'cors';
const app = express();

app.use(cors({
  origin: 'https://online-notes-frontend-gm6a.vercel.app/',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.use(express.json());


dotenv.config();
connectDB();

const port = 5001;
app.use(express.json());

app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Online Notes is running on port ${port}`);
});