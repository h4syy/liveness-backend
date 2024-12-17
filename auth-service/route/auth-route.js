import { Router } from "express";
import { startAuth } from "../controller/auth-controller.js";
import asyncHandler from "../utils/handler.js";
const router = Router();

router.post("/auth/start-auth", asyncHandler(startAuth));

export default router;
