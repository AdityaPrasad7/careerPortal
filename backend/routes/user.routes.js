import express from "express";
import {
    login,
    logout,
    register,
    updateProfile
} from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { singleUpload, multipleUpload } from "../middleware/multer.js";

const router = express.Router();

// Auth routes
router.post("/register", singleUpload, register);
router.post("/login", login);
router.get("/logout", logout);

// Profile routes
router.put("/update", isAuthenticated, multipleUpload, updateProfile);

export default router;
