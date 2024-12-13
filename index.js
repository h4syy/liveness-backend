import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import livenessRoutes from "./liveness/route/liveness-route.js";
import authRoutes from "./auth/route/auth-route.js";

const app = express();
const PORT = process.env.PORT || 8757;

app.use(cors());
app.use(express.json());

app.use("/api/v1/liveness", livenessRoutes);
app.use("/api/v1/auth", authRoutes);

app.use((err, req, res, next) => {
  console.error("Global Error Handler: ", err);
  res.status(500).json({
    success: false,
    message: "An internal server error occurred",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
