
import express from 'express';
import { getUserNotifications, markAsRead, deleteNotification } from '../controllers/notificationController.js';
import { protect } from '../middleware/auth.js';

const notificationRouter = express.Router();

notificationRouter.get('/user', protect, getUserNotifications);
notificationRouter.post('/mark-read', protect, markAsRead);
notificationRouter.post('/delete', protect, deleteNotification);

export default notificationRouter;
