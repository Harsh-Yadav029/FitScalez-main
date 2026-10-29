import { Router } from "express";
import { trackVisitor, getAnalyticsStats } from "../controllers/analytics.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// public tracking endpoint
router.route("/track").post(trackVisitor);

// secured admin analytics endpoint
router.route("/stats").get(verifyJWT, getAnalyticsStats);

export default router;

