import { Router } from "express";
import {
    createLead,
    getAllLeads,
    getLeadById,
    updateLeadStatus,
    deleteLead,
    exportLeadsCSV
} from "../controllers/lead.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// public route to submit contact inquiry
router.route("/").post(createLead);

// secured admin routes
router.route("/").get(verifyJWT, getAllLeads);
router.route("/export-csv").get(verifyJWT, exportLeadsCSV);
router.route("/:id").get(verifyJWT, getLeadById);
router.route("/:id/status").patch(verifyJWT, updateLeadStatus);
router.route("/:id").delete(verifyJWT, deleteLead);

export default router;

