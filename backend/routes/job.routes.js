import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { 
    getAdminJobs, 
    getAllJobs, 
    getJobById, 
    postJob,
    saveJob,
    unsaveJob,
    getSavedJobs
} from "../controllers/job.controller.js";

const router = express.Router();

// Job CRUD routes
router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);

// Job save/unsave routes
router.post("/save", isAuthenticated, saveJob);
router.post("/unsave", isAuthenticated, unsaveJob);
router.get("/saved", isAuthenticated, getSavedJobs);

export default router;