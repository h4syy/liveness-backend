import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./route/auth-route.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Auth Service running on http://localhost:${PORT}`);
});
