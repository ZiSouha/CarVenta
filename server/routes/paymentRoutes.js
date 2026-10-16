import express from 'express';
import { createCheckoutSession, verifyPayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-checkout-session', protect, createCheckoutSession);
paymentRouter.post('/verify', verifyPayment);

export default paymentRouter;
