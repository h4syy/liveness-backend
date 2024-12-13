import express from "express";
import {
  createLivenessSession,
  getLivenessSessionResults,
} from "../controllers/liveness-controller.js";
import { verifyJWT } from "../../middlewares/auth.js";

const router = express.Router();

router.post(
  "/liveness/create-liveness-session",
  verifyJWT,
  createLivenessSession
);
router.post("/liveness/results", verifyJWT, getLivenessSessionResults);

export default router;
