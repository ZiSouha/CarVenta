import Review from "../models/Review.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// Create a review (only for completed bookings)
export const createReview = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { bookingId, carId, rating, comment } = req.body;

        // Validate rating
        if (rating < 1 || rating > 5) {
            return res.json({ success: false, message: "Rating must be between 1 and 5" });
        }

        // Check if booking exists and belongs to user
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.json({ success: false, message: "Booking not found" });
        }

        if (booking.user.toString() !== userId.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        // Check if booking is confirmed (completed)
        if (booking.status !== 'confirmed') {
            return res.json({ success: false, message: "You can only review confirmed bookings" });
        }

        // Check if review already exists for this booking
        const existingReview = await Review.findOne({ booking: bookingId });
        if (existingReview) {
            return res.json({ success: false, message: "You have already reviewed this booking" });
        }

        // Create review
        const review = await Review.create({
            car: carId,
            user: userId,
            booking: bookingId,
            rating,
            comment
        });

        // Update car's average rating
        await updateCarRating(carId);

        const populatedReview = await Review.findById(review._id).populate('user', 'name image');

        res.json({ success: true, message: "Review submitted successfully", review: populatedReview });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Get reviews for a car
export const getCarReviews = async (req, res) => {
    try {
        const { carId } = req.params;

        const reviews = await Review.find({ car: carId })
            .populate('user', 'name image')
            .populate('response.respondedBy', 'name')
            .sort({ createdAt: -1 });

        res.json({ success: true, reviews });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Get user's reviews
export const getUserReviews = async (req, res) => {
    try {
        const { _id: userId } = req.user;

        const reviews = await Review.find({ user: userId })
            .populate('car', 'brand model image')
            .populate('response.respondedBy', 'name')
            .sort({ createdAt: -1 });

        res.json({ success: true, reviews });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Owner responds to a review
export const respondToReview = async (req, res) => {
    try {
        const { _id: userId, role } = req.user;
        const { reviewId, responseText } = req.body;

        const review = await Review.findById(reviewId).populate('car');
        if (!review) {
            return res.json({ success: false, message: "Review not found" });
        }

        // Check if user is owner of the car or admin
        if (role !== 'admin' && role !== 'super-admin' && review.car.owner.toString() !== userId.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        review.response = {
            text: responseText,
            respondedBy: userId,
            respondedAt: new Date()
        };

        await review.save();

        const populatedReview = await Review.findById(review._id)
            .populate('user', 'name image')
            .populate('response.respondedBy', 'name');

        res.json({ success: true, message: "Response added successfully", review: populatedReview });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Delete a review (user can delete their own, admin can delete any)
export const deleteReview = async (req, res) => {
    try {
        const { _id: userId, role } = req.user;
        const { reviewId } = req.body;

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.json({ success: false, message: "Review not found" });
        }

        // Check authorization
        if (role !== 'admin' && role !== 'super-admin' && review.user.toString() !== userId.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const carId = review.car;
        await Review.findByIdAndDelete(reviewId);

        // Update car's average rating
        await updateCarRating(carId);

        res.json({ success: true, message: "Review deleted successfully" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Helper function to update car's average rating
const updateCarRating = async (carId) => {
    const reviews = await Review.find({ car: carId });

    if (reviews.length === 0) {
        await Car.findByIdAndUpdate(carId, {
            averageRating: 0,
            totalReviews: 0
        });
        return;
    }

    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    await Car.findByIdAndUpdate(carId, {
        averageRating: Math.round(avgRating * 10) / 10, // Round to 1 decimal
        totalReviews: reviews.length
    });
};

// Check if user can review a booking
export const canReviewBooking = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { bookingId } = req.params;

        const booking = await Booking.findById(bookingId);
        if (!booking || booking.user.toString() !== userId.toString()) {
            return res.json({ success: false, canReview: false });
        }

        if (booking.status !== 'confirmed') {
            return res.json({ success: false, canReview: false, message: "Booking must be confirmed" });
        }

        const existingReview = await Review.findOne({ booking: bookingId });
        if (existingReview) {
            return res.json({ success: false, canReview: false, message: "Already reviewed" });
        }

        res.json({ success: true, canReview: true });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
