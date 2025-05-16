import express from "express";
import { 
    registerCompany,
    getCompany,
    getCompanyById,
    updateCompany
} from "../controller/company.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Register a new company
router.post("/register", isAuthenticated, registerCompany);

// Get all companies of the logged-in user
router.get("/", isAuthenticated, getCompany);

// Get a specific company by ID
router.get("/:id", isAuthenticated, getCompanyById);

// Update a specific company by ID
router.put("/:id", isAuthenticated, updateCompany);

export default router;
