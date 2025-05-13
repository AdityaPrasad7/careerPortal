import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js"; // ✅ Corrected spelling
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ Function call added

const corsOptions = {
    origin: "http://localhost:5173", // ✅ Fixed URL typo
    credentials: true
};
app.use(cors(corsOptions));

// Test Route
app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "Backend responding",
        success: true
    });
});
// "http://localhost:8000/api/v1/user/register"
// "http://localhost:8000/api/v1/user/login"
// "http://localhost:8000/api/v1/user/profile/update"
// User Routes
app.use("/api/v1/user", userRoutes);

// Server Listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
    connectDB(); // ✅ Fixed function name
    console.log(`Server running on port ${port}`);
});
