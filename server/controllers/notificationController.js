
import Notification from '../models/Notification.js';

export const getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const markAsRead = async (req, res) => {
    try {
        const { id } = req.body;
        await Notification.findByIdAndUpdate(id, { read: true });
        res.json({ success: true, message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteNotification = async (req, res) => {
    try {
        const { id } = req.body;
        await Notification.findByIdAndDelete(id);
        res.json({ success: true, message: 'Notification deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
