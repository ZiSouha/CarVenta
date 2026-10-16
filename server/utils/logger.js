import ActivityLog from "../models/ActivityLog.js";

export const logActivity = async (req, action, entity, entityId, details) => {
    try {
        const userId = req.user?._id;
        if (!userId) return;

        await ActivityLog.create({
            user: userId,
            action,
            entity,
            entityId,
            details,
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.headers['user-agent']
        });
    } catch (error) {
        console.error("Failed to log activity:", error.message);
    }
};
