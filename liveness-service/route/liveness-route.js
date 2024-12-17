import express from "express";
import {
  createLivenessSession,
  getLivenessSessionResults,
} from "../controller/liveness-controller.js";
import { verifyJWT } from "../middlewares/auth.js";
import asyncHandler from "../utils/handler.js";

const router = express.Router();

router.post(
  "/liveness/create-liveness-session",
  verifyJWT,
  asyncHandler(createLivenessSession)
);
router.post(
  "/liveness/results",
  verifyJWT,
  asyncHandler(getLivenessSessionResults)
);

export default router;
