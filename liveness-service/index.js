import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import livenessRoutes from "./route/liveness-route.js";

const app = express();
const PORT = process.env.LIVENESS_PORT || 4001; // Use a separate port for liveness-service

app.use(cors());
app.use(express.json());

app.use("/api/v1/liveness", livenessRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Liveness-Service Error Handler: ", err);
  res.status(500).json({
    success: false,
    message: "An internal server error occurred in Liveness-Service",
  });
});

app.listen(PORT, () => {
  console.log(`Liveness-Service is running on http://localhost:${PORT}`);
});
