import { Router } from "express";
import {
    createApplication,
    getAllApplications,
    updateApplicationStatus,
    deleteApplication
} from "../controllers/application.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// public application submit
router.route("/").post(createApplication);

// secured admin routes
router.route("/").get(verifyJWT, getAllApplications);
router.route("/:id/status").patch(verifyJWT, updateApplicationStatus);
router.route("/:id").delete(verifyJWT, deleteApplication);

export default router;

