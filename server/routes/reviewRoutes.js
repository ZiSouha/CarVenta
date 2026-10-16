import express from 'express';
import { createReview, getCarReviews, getUserReviews, respondToReview, deleteReview, canReviewBooking } from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const reviewRouter = express.Router();

reviewRouter.post('/create', protect, createReview);
reviewRouter.get('/car/:carId', getCarReviews);
reviewRouter.get('/user', protect, getUserReviews);
reviewRouter.post('/respond', protect, respondToReview);
reviewRouter.post('/delete', protect, deleteReview);
reviewRouter.get('/can-review/:bookingId', protect, canReviewBooking);

export default reviewRouter;
