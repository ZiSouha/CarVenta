import Booking from "../models/Booking.js"
import Car from "../models/Car.js";
import { emitEvent } from "../socket.js";




const checkAvailability = async (car, pickupDate, returnDate) => {
    const bookings = await Booking.find({
        car,
        status: { $ne: 'cancelled' },
        pickupDate: { $lte: returnDate },
        returnDate: { $gte: pickupDate },
    })
    return bookings.length === 0;
}



// Function to Check Availability of Car for a given Date
export const checkAvailabilityOfCar = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body

        // fetch all available cars for the given location
        const cars = await Car.find({ location, isAvaliable: true })

        // check car availability for the given date range using promise
        const availableCarsPromises = cars.map(async (car) => {
            const isAvaliable = await checkAvailability(car._id, pickupDate, returnDate)
            return { ...car._doc, isAvaliable: isAvaliable }
        })
        let availableCars = await Promise.all(availableCarsPromises);
        availableCars = availableCars.filter(car => car.isAvaliable === true)

        res.json({ success: true, availableCars })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// API to Create Booking

export const createBooking = async (req, res) => {
    try {
        const { _id } = req.user;
        const { car, pickupDate, returnDate } = req.body;

        const isAvaliable = await checkAvailability(car, pickupDate, returnDate)
        if (!isAvaliable) {
            return res.json({ success: false, message: "Car is not available" })
        }

        const carData = await Car.findById(car)

        // Calculate price based on pickupDate and returnDate
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
        const price = carData.pricePerDay * noOfDays;

        const booking = await Booking.create({ car, owner: carData.owner, user: _id, pickupDate, returnDate, price })

        // Notify owner about new booking
        emitEvent("BOOKING_CREATED", booking, carData.owner.toString());

        // Notify admin dashboard (if global admin exists)
        emitEvent("GLOBAL_BOOKING_CREATED", booking);

        res.json({ success: true, message: "Booking Created" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// API to List User Bookings
export const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;
        const bookings = await Booking.find({ user: _id }).populate("car").sort({ createdAt: -1 })
        res.json({ success: true, bookings })


    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


// API to get Owner Bookings
export const getOwnerBookings = async (req, res) => {
    try {
        const isOwnerOrAdmin = ['owner', 'admin', 'super-admin'].includes(req.user?.role);

        if (!isOwnerOrAdmin) {
            // Return realistic showcase bookings for visitor previewers
            return res.json({
                success: true,
                isDemoPreview: true,
                bookings: [
                    {
                        _id: "bk_preview_01",
                        car: {
                            _id: "car_911_gt3",
                            brand: "Porsche",
                            model: "911 GT3 RS",
                            image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800"
                        },
                        user: { name: "Alexander Vance", email: "a.vance@enterprise.com" },
                        pickupDate: new Date().toISOString(),
                        returnDate: new Date(Date.now() + 86400000 * 3).toISOString(),
                        price: 1440,
                        status: "confirmed",
                        createdAt: new Date().toISOString()
                    },
                    {
                        _id: "bk_preview_02",
                        car: {
                            _id: "car_f8_tributo",
                            brand: "Ferrari",
                            model: "F8 Tributo",
                            image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800"
                        },
                        user: { name: "Elena Rostova", email: "elena.r@luxurydrive.com" },
                        pickupDate: new Date(Date.now() + 86400000 * 2).toISOString(),
                        returnDate: new Date(Date.now() + 86400000 * 5).toISOString(),
                        price: 2670,
                        status: "pending",
                        createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
                    }
                ]
            });
        }

        const isGlobalAdmin = ['admin', 'super-admin'].includes(req.user.role);
        const filter = isGlobalAdmin ? {} : { owner: req.user._id };

        const bookings = await Booking.find(filter).populate('car user').select("-user.password").sort({ createdAt: -1 });
        res.json({ success: true, bookings });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// API to change Bookings
export const changeBookingStatus = async (req, res) => {
    try {
        const isOwnerOrAdmin = ['owner', 'admin', 'super-admin'].includes(req.user?.role);
        if (!isOwnerOrAdmin) {
            return res.status(403).json({
                success: false,
                message: "Action Restricted: Owner or Admin privileges required to update booking status."
            });
        }

        const { bookingId, status } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.json({ success: false, message: "Booking not found" });
        }

        // Non-admins can only change status of bookings for their own cars
        const isGlobalAdmin = ['admin', 'super-admin'].includes(req.user.role);
        if (!isGlobalAdmin && booking.owner && booking.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: You can only update bookings for your own vehicles."
            });
        }

        booking.status = status;
        await booking.save();

        // Notify user about status update
        emitEvent("BOOKING_STATUS_UPDATED", booking, booking.user.toString());

        // Notify owner dashboard
        emitEvent("BOOKING_UPDATED", booking, booking.owner?.toString());

        res.json({ success: true, message: `Booking status updated to ${status}` });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Cancel Booking (User can cancel their own pending bookings)
export const cancelBooking = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.json({ success: false, message: "Booking not found" });
        }

        // Check if booking belongs to user
        if (booking.user.toString() !== userId.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        // Only pending bookings can be cancelled
        if (booking.status !== 'pending') {
            return res.json({ success: false, message: "Only pending bookings can be cancelled" });
        }

        booking.status = 'cancelled';
        await booking.save();

        // Notify owner about cancellation
        emitEvent("BOOKING_CANCELLED", booking, booking.owner.toString());

        res.json({ success: true, message: "Booking cancelled successfully" });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
