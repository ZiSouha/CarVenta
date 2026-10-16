import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const protect = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.json({ success: false, message: "not authorized" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // Handle both string payload (legacy) and object payload (new)
        const userId = typeof decoded === 'object' ? decoded.id : decoded;

        if (!userId) {
            return res.json({ success: false, message: "not authorized" })
        }

        // Find user
        req.user = await User.findById(userId).select("-password")

        if (!req.user) {
            return res.json({ success: false, message: "User not found" })
        }

        next();
    } catch (error) {
        console.log("Auth Error:", error.message);
        return res.json({ success: false, message: "not authorized" })
    }
}