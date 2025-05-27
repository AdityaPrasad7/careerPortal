import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // Check for token in cookies first
        let token = req.cookies.token;
        console.log('Token from cookie:', token);
        
        // If not in cookies, check Authorization header
        if (!token && req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
            console.log('Token from Authorization header:', token);
        }
        
        if (!token) {
            console.log('No token found in request');
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        try {
            console.log('Verifying token with secret key:', process.env.SECRET_KEY);
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            console.log('Decoded token:', decode);
            
            if (!decode || !decode.userId) {
                console.log('Token verification failed - invalid token format');
                return res.status(401).json({
                    message: "Invalid token format",
                    success: false
                });
            }

            req.id = decode.userId;
            console.log('Authentication successful, userId:', req.id);
            next();
        } catch (jwtError) {
            console.error('JWT verification error:', jwtError);
            return res.status(401).json({
                message: "Invalid or expired token",
                success: false
            });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({
            message: "Authentication error",
            success: false
        });
    }
};

export default isAuthenticated;