import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import httpProxy from "express-http-proxy";

const app = express();
const PORT = process.env.PORT || 8757;

// Microservice URLs
const AUTH_SERVICE_URL = "http://localhost:3001";
const LIVENESS_SERVICE_URL = "http://localhost:3002";

// Middleware
app.use(cors());
app.use(express.json());

// Route to Auth Service
app.use("/api/v1/auth", httpProxy(AUTH_SERVICE_URL));

// Route to Liveness Service
app.use("/api/v1/liveness", httpProxy(LIVENESS_SERVICE_URL));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler: ", err);
  res.status(500).json({
    success: false,
    message: "An internal server error occurred",
  });
});

// Start Gateway
app.listen(PORT, () => {
  console.log(`Gateway is running on http://localhost:${PORT}`);
});
