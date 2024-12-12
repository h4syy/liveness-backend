import { Router } from "express";
import { startAuth } from "../controllers/auth-controller.js";

const router = Router();

router.post("/start-auth", startAuth);

export default router;
