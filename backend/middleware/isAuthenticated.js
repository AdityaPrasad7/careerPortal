import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Check if the token exists in cookies
        const token = req.cookies.token; // Access token from cookies

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated", // Token is missing
                success: false
            });
        }

        // Verify the token
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.id = decode.userId; // Attach the userId to the request object

        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        console.error("Authentication error:", error); // Log the error

        // Check if the error is due to token expiration
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired, please log in again", // Token expired
                success: false
            });
        }

        return res.status(401).json({
            message: "Invalid or expired token", // Invalid or expired token
            success: false
        });
    }
};

export default isAuthenticated;
