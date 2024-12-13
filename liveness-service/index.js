import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import livenessRoutes from "./route/liveness-route.js";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use("/api/v1/liveness", livenessRoutes);

app.listen(PORT, () => {
  console.log(`Liveness Service running on http://localhost:${PORT}`);
});
