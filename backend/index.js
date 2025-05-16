import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js"; // ✅ Corrected spelling
import userRoutes from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js";
import jobRoutes from "./routes/job.routes.js"; // ✅ Corrected spelling
import applicationRoutes from "./routes/application.routes.js"

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

// User Routes
app.use("/api/v1/user", userRoutes);

//company Routes
app.use("/api/v1/company", companyRoutes);

//Job Routes
app.use("/api/v1/job", jobRoutes);

//application Routes
app.use("/api/v1/application", applicationRoutes); // ✅ Corrected spelling


// Server Listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
    connectDB(); // ✅ Fixed function name
    console.log(`Server running on port ${port}`);
});
