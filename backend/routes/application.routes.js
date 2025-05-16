import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus
} from "../controller/application.controller.js";

const router = express.Router();

// Apply to a job
// POST /api/v1/application/apply/:id
router.route("/apply/:id").post(isAuthenticated, applyJob);

// Get all jobs applied to (for the logged in user)
router.route("/applied").get(isAuthenticated, getAppliedJobs);

// Get all applicants for a specific job (for admin use)
// :id here is the Job ID
router.route("/applicants/:id").get(isAuthenticated, getApplicants);

// Update status for a specific application (for admin use)
// :id here is the Application ID
router.route("/status/:id").put(isAuthenticated, updateStatus);

export default router;
