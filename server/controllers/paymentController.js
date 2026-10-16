
import Stripe from 'stripe';
import Car from '../models/Car.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';

let stripeClient = null;
const getStripeClient = () => {
    if (!process.env.STRIPE_SECRET_KEY) {
        return null;
    }
    if (!stripeClient) {
        stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
    }
    return stripeClient;
};

export const createCheckoutSession = async (req, res) => {
    try {
        const stripe = getStripeClient();
        if (!stripe) {
            return res.status(503).json({
                success: false,
                message: 'Stripe payments are not configured on this server. Set STRIPE_SECRET_KEY in your .env file.'
            });
        }
        const { carId, pickupDate, returnDate } = req.body;
        const userId = req.user._id.toString();

        if (!carId || !pickupDate || !returnDate) {
            return res.status(400).json({ success: false, message: 'Missing required parameters' });
        }

        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }

        // Calculate days with date validation
        const start = new Date(pickupDate);
        const end = new Date(returnDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date selection. Return date must be after pickup date.'
            });
        }
        const timeDiff = end - start;
        let days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        if (days === 0) days = 1; // Minimum 1 day allocation

        const totalAmount = days * car.pricePerDay;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${car.brand} ${car.model}`,
                            images: [car.image],
                            description: `Rental from ${pickupDate} to ${returnDate} (${days} days)`,
                            metadata: {
                                carId: carId
                            }
                        },
                        unit_amount: Math.round(totalAmount * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/car-details/${carId}`,
            metadata: {
                carId,
                userId,
                pickupDate,
                returnDate,
                ownerId: car.owner.toString(),
                totalAmount
            },
        });

        res.json({ success: true, url: session.url });

    } catch (error) {
        console.error('Stripe Checkout Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { sessionId } = req.body;
        const stripe = getStripeClient();
        if (!stripe) {
            return res.status(503).json({
                success: false,
                message: 'Stripe payments are not configured on this server.'
            });
        }
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log("Stripe Session Status:", session.payment_status);

        if (session.payment_status === 'paid') {
            const { carId, userId, pickupDate, returnDate, ownerId, totalAmount } = session.metadata;

            // Idempotency Check
            const existingBooking = await Booking.findOne({ transactionId: sessionId });
            if (existingBooking) {
                console.log("Booking already exists:", existingBooking._id);
                return res.json({ success: true, message: 'Booking already confirmed', bookingId: existingBooking._id });
            }

            const newBooking = new Booking({
                car: carId,
                user: userId,
                owner: ownerId,
                pickupDate,
                returnDate,
                status: 'confirmed', // Paid = Confirmed
                price: Number(totalAmount),
                transactionId: sessionId
            });

            await newBooking.save();
            console.log("Booking saved successfully:", newBooking._id);

            // Create Notification
            try {
                const Notification = (await import('../models/Notification.js')).default;
                const note = await Notification.create({
                    user: userId,
                    title: "Booking Confirmed",
                    message: `Your booking for ${carId} has been confirmed.`,
                    type: "booking",
                    link: "/my-bookings"
                });

                // Real-time Emit
                const { getIO } = await import('../socket.js');
                const io = getIO();
                io.to(userId.toString()).emit('NEW_NOTIFICATION', note);

            } catch (error) {
                console.error("Notification Error:", error);
            }

            return res.json({ success: true, message: 'Payment verified and booking created', bookingId: newBooking._id });
        } else {
            return res.json({ success: false, message: 'Payment not completed' });
        }
    } catch (error) {
        console.error('Verify Payment Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}
