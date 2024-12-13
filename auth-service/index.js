import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./route/auth-route.js";

const app = express();
const PORT = process.env.AUTH_PORT || 4000; // Use a separate port for auth-service

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Auth-Service Error Handler: ", err);
  res.status(500).json({
    success: false,
    message: "An internal server error occurred in Auth-Service",
  });
});

app.listen(PORT, () => {
  console.log(`Auth-Service is running on http://localhost:${PORT}`);
});
