import { Router } from "express";
import { startAuth } from "../controller/auth-controller.js";

const router = Router();

router.post("/start-auth", startAuth);

export default router;
