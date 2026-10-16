import imagekit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs";
import { emitEvent } from "../socket.js";
import { logActivity } from "../utils/logger.js";
import ActivityLog from "../models/ActivityLog.js";
import SiteConfig from "../models/SiteConfig.js";

export const isSuperAdmin = (user) => {
    const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
    return Boolean(
        user && (
            user.role === 'super-admin' ||
            (adminEmail && user.email && user.email.toLowerCase() === adminEmail)
        )
    );
};

export const isOwnerOrAdmin = (user) => {
    return Boolean(
        user && (
            isSuperAdmin(user) ||
            ['owner', 'admin', 'super-admin'].includes(user.role)
        )
    );
};

// API to Change Role of User
export const changeRolToOwner = async (req, res) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { role: "owner" })
        res.json({ success: true, message: "Now you can list cars" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// API to List Car
export const addCar = async (req, res) => {
    try {
        if (!isOwnerOrAdmin(req.user)) {
            return res.status(403).json({
                success: false,
                message: "Action Restricted: Owner or Admin privileges required to list vehicles."
            });
        }

        const { _id } = req.user;
        let car = JSON.parse(req.body.carData);
        // Assuming req.files contains multiple files if sent
        const mainImageFile = req.files['image'] ? req.files['image'][0] : null; // Multer field name for main image
        const galleryFiles = req.files['gallery'] || []; // Multer field name for gallery

        if (!mainImageFile) {
            return res.json({ success: false, message: "Main image is required" });
        }

        // Helper to upload to ImageKit and clean up local temp files
        const uploadToImageKit = async (file, folder) => {
            try {
                let fileBuffer;
                if (file.buffer) {
                    fileBuffer = file.buffer;
                } else if (file.path) {
                    fileBuffer = fs.readFileSync(file.path);
                } else {
                    throw new Error("Invalid file upload");
                }

                const response = await imagekit.upload({
                    file: fileBuffer,
                    fileName: file.originalname,
                    folder: folder
                });
                return imagekit.url({
                    path: response.filePath,
                    transformation: [{ width: '1280' }, { quality: 'auto' }, { format: 'webp' }]
                });
            } finally {
                if (file.path) {
                    try {
                        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
                    } catch (e) {
                        // Ignore cleanup failure
                    }
                }
            }
        };

        const image = await uploadToImageKit(mainImageFile, '/cars');

        const gallery = [];
        for (const file of galleryFiles) {
            const url = await uploadToImageKit(file, '/cars');
            gallery.push(url);
        }

        const newCar = await Car.create({ ...car, owner: _id, image, gallery });

        emitEvent("CAR_ADDED", newCar);
        await logActivity(req, 'CREATE', 'CAR', newCar._id, `Added car: ${newCar.brand} ${newCar.model}`);

        res.json({ success: true, message: "Car Added", car: newCar })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// API to List Owner Cars
export const getOwnerCars = async (req, res) => {
    try {
        const { _id } = req.user;
        // If super admin, fetch all registered cars in the fleet. If regular owner, fetch their own cars.
        const filter = isSuperAdmin(req.user) ? {} : { owner: _id };
        const cars = await Car.find(filter)
        res.json({ success: true, cars, isSuperAdmin: isSuperAdmin(req.user) })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// API to Toggle Car Availability
export const toggleCarAvailability = async (req, res) => {
    try {
        if (!isOwnerOrAdmin(req.user)) {
            return res.status(403).json({
                success: false,
                message: "Action Restricted: Owner or Admin privileges required."
            });
        }

        const { carId } = req.body
        const car = await Car.findById(carId)

        if (!car) {
            return res.json({ success: false, message: "Car not found" });
        }

        if (!isSuperAdmin(req.user) && car.owner && car.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized: You can only modify your own vehicles." });
        }

        car.isAvaliable = !car.isAvaliable;
        await car.save()

        emitEvent("CAR_UPDATED", car);
        await logActivity(req, 'UPDATE', 'CAR', car._id, `Toggled availability to ${car.isAvaliable}`);

        res.json({ success: true, message: "Availability Toggled", car })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// API to Delete a car
export const deleteCar = async (req, res) => {
    try {
        if (!isOwnerOrAdmin(req.user)) {
            return res.status(403).json({
                success: false,
                message: "Action Restricted: Owner or Admin privileges required."
            });
        }

        const { carId } = req.body
        const car = await Car.findById(carId)

        if (!car) {
            return res.json({ success: false, message: "Car not found" });
        }

        if (!isSuperAdmin(req.user) && car.owner && car.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized: You can only delete your own vehicles." });
        }

        car.owner = null;
        car.isAvaliable = false;
        await car.save()

        emitEvent("CAR_DELETED", carId);
        await logActivity(req, 'DELETE', 'CAR', carId, `Removed car`);

        res.json({ success: true, message: "Car Removed" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// API to Update a car
export const updateCar = async (req, res) => {
    try {
        if (!isOwnerOrAdmin(req.user)) {
            return res.status(403).json({
                success: false,
                message: "Action Restricted: Owner or Admin privileges required."
            });
        }

        const { carId, carData } = req.body;
        const existingCar = await Car.findById(carId);

        if (!existingCar) {
            return res.json({ success: false, message: "Car not found" });
        }

        if (!isSuperAdmin(req.user) && existingCar.owner && existingCar.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized: You can only update your own vehicles." });
        }

        const updatedCar = await Car.findByIdAndUpdate(carId, carData, { new: true });

        emitEvent("CAR_UPDATED", updatedCar);
        await logActivity(req, 'UPDATE', 'CAR', carId, `Updated car details`);

        res.json({ success: true, message: "Car Updated", car: updatedCar });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Bulk Operations
export const bulkDeleteCars = async (req, res) => {
    try {
        if (!isOwnerOrAdmin(req.user)) {
            return res.status(403).json({
                success: false,
                message: "Action Restricted: Owner or Admin privileges required."
            });
        }

        const { carIds } = req.body;

        const filter = isSuperAdmin(req.user) 
            ? { _id: { $in: carIds } }
            : { _id: { $in: carIds }, owner: req.user._id };

        await Car.updateMany(
            filter,
            { owner: null, isAvaliable: false }
        );

        emitEvent("BULK_CARS_DELETED", carIds);
        await logActivity(req, 'DELETE', 'CAR_BULK', null, `Deleted ${carIds.length} cars`);

        res.json({ success: true, message: `${carIds.length} cars removed` });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const bulkUpdateAvailability = async (req, res) => {
    try {
        if (!isOwnerOrAdmin(req.user)) {
            return res.status(403).json({
                success: false,
                message: "Action Restricted: Owner or Admin privileges required."
            });
        }

        const { carIds, status } = req.body;

        const filter = isSuperAdmin(req.user) 
            ? { _id: { $in: carIds } }
            : { _id: { $in: carIds }, owner: req.user._id };

        await Car.updateMany(
            filter,
            { isAvaliable: status }
        );

        emitEvent("BULK_CARS_UPDATED", carIds);
        await logActivity(req, 'UPDATE', 'CAR_BULK', null, `Updated availability to ${status} for ${carIds.length} cars`);

        res.json({ success: true, message: `Updated ${carIds.length} cars` });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Site Config / CMS
export const getSiteConfig = async (req, res) => {
    try {
        let config = await SiteConfig.findOne();
        if (!config) {
            config = await SiteConfig.create({});
        }
        res.json({ success: true, config });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const updateSiteConfig = async (req, res) => {
    try {
        if (!isSuperAdmin(req.user)) {
            return res.status(403).json({
                success: false,
                message: "Action Restricted: Super Admin privileges required to update site settings."
            });
        }

        const config = await SiteConfig.findOneAndUpdate({}, req.body, { upsert: true, new: true });
        await logActivity(req, 'UPDATE', 'SITE_CONFIG', null, `Updated homepage content`);

        res.json({ success: true, message: "Site configuration updated", config });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Activity Logs
export const getActivityLogs = async (req, res) => {
    try {
        if (!isOwnerOrAdmin(req.user)) {
            // Return realistic showcase audit logs for visitor previewers
            return res.json({
                success: true,
                isDemoPreview: true,
                logs: [
                    {
                        _id: "log_preview_01",
                        action: "UPDATE",
                        entityType: "SYSTEM",
                        details: "Super Admin privileges secured for System Administrator",
                        user: { name: "System Administrator", email: "admin@carventa.com" },
                        createdAt: new Date().toISOString()
                    },
                    {
                        _id: "log_preview_02",
                        action: "CREATE",
                        entityType: "FLEET",
                        details: "12 Premium showcase fleet models loaded into showroom",
                        user: { name: "Fleet Manager", email: "fleet@carventa.com" },
                        createdAt: new Date(Date.now() - 3600000).toISOString()
                    },
                    {
                        _id: "log_preview_03",
                        action: "UPDATE",
                        entityType: "SECURITY",
                        details: "System security policy initialized with RBAC controls",
                        user: { name: "Security Daemon" },
                        createdAt: new Date(Date.now() - 7200000).toISOString()
                    }
                ]
            });
        }

        const logs = await ActivityLog.find().populate('user', 'name email image').sort({ createdAt: -1 }).limit(100);
        res.json({ success: true, logs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// API to get Dashboard Data (Now acts as Analytics)
export const getDashboardData = async (req, res) => {
    try {
        // If not owner or admin, return realistic showcase preview data for visitors
        if (!isOwnerOrAdmin(req.user)) {
            return res.json({
                success: true,
                isDemoPreview: true,
                dashboardData: {
                    totalCars: 12,
                    totalBookings: 148,
                    totalRevenue: 128450,
                    activeTrips: 8,
                    utilization: "84.6",
                    recentBookings: [
                        {
                            _id: "preview_bk_01",
                            car: { brand: "Porsche", model: "911 GT3 RS", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800" },
                            user: { name: "Alexander Vance", email: "a.vance@enterprise.com" },
                            pickupDate: new Date().toISOString(),
                            returnDate: new Date(Date.now() + 86400000 * 4).toISOString(),
                            price: 1440,
                            status: "confirmed"
                        },
                        {
                            _id: "preview_bk_02",
                            car: { brand: "Ferrari", model: "F8 Tributo", image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800" },
                            user: { name: "Elena Rostova", email: "elena.r@luxurydrive.com" },
                            pickupDate: new Date().toISOString(),
                            returnDate: new Date(Date.now() + 86400000 * 2).toISOString(),
                            price: 1780,
                            status: "confirmed"
                        },
                        {
                            _id: "preview_bk_03",
                            car: { brand: "Mercedes-AMG", model: "G63", image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=800" },
                            user: { name: "Marcus Sterling", email: "m.sterling@capital.io" },
                            pickupDate: new Date().toISOString(),
                            returnDate: new Date(Date.now() + 86400000 * 5).toISOString(),
                            price: 3250,
                            status: "pending"
                        }
                    ],
                    dailyRevenue: [
                        { _id: "2026-10-09", dailyTotal: 14200 },
                        { _id: "2026-10-10", dailyTotal: 18500 },
                        { _id: "2026-10-11", dailyTotal: 16900 },
                        { _id: "2026-10-12", dailyTotal: 22400 },
                        { _id: "2026-10-13", dailyTotal: 19800 },
                        { _id: "2026-10-14", dailyTotal: 24600 },
                        { _id: "2026-10-15", dailyTotal: 28350 }
                    ],
                    topCars: [
                        { name: "Porsche 911 GT3 RS", revenue: 42800, count: 28 },
                        { name: "Ferrari F8 Tributo", revenue: 38500, count: 21 },
                        { name: "Mercedes-AMG G63", revenue: 31200, count: 19 }
                    ],
                    categoryWise: [
                        { _id: "Exotic & Supercar", count: 4 },
                        { _id: "Luxury Sedan", count: 3 },
                        { _id: "Luxury SUV", count: 3 },
                        { _id: "Grand Tourer", count: 2 }
                    ]
                }
            });
        }

        // Live database aggregation for administrator or owner fleet
        const isGlobalAdmin = isSuperAdmin(req.user) || req.user.role === 'admin';
        const filter = isGlobalAdmin ? {} : { owner: req.user._id };
        const bookingFilter = isGlobalAdmin ? {} : { owner: req.user._id };

        const cars = await Car.find(filter)
        const bookings = await Booking.find(bookingFilter).populate('car').populate('user').limit(50).sort({ createdAt: -1 });

        const totalBookingsCount = await Booking.countDocuments(bookingFilter);

        // Calculate Revenue from Confirmed Bookings
        const revenueAggregation = await Booking.aggregate([
            { $match: { ...bookingFilter, status: 'confirmed' } },
            { $group: { _id: null, total: { $sum: '$price' } } }
        ]);
        const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].total : 0;

        // Active Trips (Pickup <= Now <= Return)
        const now = new Date();
        const activeTrips = await Booking.countDocuments({
            ...bookingFilter,
            status: 'confirmed',
            pickupDate: { $lte: now },
            returnDate: { $gte: now }
        });

        // Recent Bookings
        const recentBookings = bookings.slice(0, 5); // get top 5

        // Utilization: Active Trips / Total Cars
        const utilization = cars.length > 0 ? ((activeTrips / cars.length) * 100).toFixed(1) : 0;

        // Revenue Trend (Last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const dailyRevenue = await Booking.aggregate([
            {
                $match: {
                    ...bookingFilter,
                    status: 'confirmed',
                    createdAt: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    dailyTotal: { $sum: "$price" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Top Performing Vehicles (by Revenue)
        const topCars = await Booking.aggregate([
            { $match: { ...bookingFilter, status: 'confirmed' } },
            {
                $group: {
                    _id: "$car",
                    revenue: { $sum: "$price" },
                    count: { $sum: 1 }
                }
            },
            { $sort: { revenue: -1 } },
            { $limit: 3 },
            {
                $lookup: {
                    from: "cars",
                    localField: "_id",
                    foreignField: "_id",
                    as: "carDetails"
                }
            },
            { $unwind: "$carDetails" },
            {
                $project: {
                    name: { $concat: ["$carDetails.brand", " ", "$carDetails.model"] },
                    revenue: 1,
                    count: 1
                }
            }
        ]);

        // Category Distribution
        const categoryWise = await Car.aggregate([
            { $match: filter },
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: totalBookingsCount,
            totalRevenue,
            activeTrips,
            utilization,
            recentBookings,
            dailyRevenue,
            topCars,
            categoryWise
        }

        res.json({ success: true, dashboardData });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// API to update user image


export const updateUserImage = async (req, res) => {
    try {
        const { _id } = req.user;
        const imageFile = req.file;

        if (!imageFile) {
            return res.json({ success: false, message: "No image file provided" });
        }

        // Upload Image to ImageKit
        let fileBuffer;
        if (imageFile.buffer) {
            fileBuffer = imageFile.buffer;
        } else if (imageFile.path) {
            fileBuffer = fs.readFileSync(imageFile.path);
        } else {
            return res.json({ success: false, message: "Unable to process uploaded file" });
        }

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname || `user-${_id}-${Date.now()}.jpg`,
            folder: '/users'
        });

        // Clean up temporary file from disk if present
        if (imageFile.path) {
            try {
                fs.unlinkSync(imageFile.path);
            } catch (e) {
                // Non-critical cleanup failure
            }
        }

        // Optimization through ImageKit URL transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { width: '400' },
                { quality: 'auto' },
                { format: 'webp' }
            ]
        });

        const image = optimizedImageUrl;

        const updatedUser = await User.findByIdAndUpdate(_id, { image }, { new: true }).select("-password");
        
        try {
            await logActivity(req.user, "USER_AVATAR_UPDATE", "Updated profile picture");
        } catch (e) {
            // ignore
        }

        res.json({ success: true, message: "Profile photo updated successfully", image, user: updatedUser });

    } catch (error) {
        console.log("updateUserImage error:", error.message);
        res.json({ success: false, message: error.message });
    }
}

// API to remove user image and revert to initials avatar
export const removeUserImage = async (req, res) => {
    try {
        const { _id } = req.user;
        const updatedUser = await User.findByIdAndUpdate(_id, { image: "" }, { new: true }).select("-password");
        
        try {
            await logActivity(req.user, "USER_AVATAR_REMOVE", "Removed profile picture");
        } catch (e) {
            // ignore
        }

        res.json({ success: true, message: "Profile photo removed", image: "", user: updatedUser });
    } catch (error) {
        console.log("removeUserImage error:", error.message);
        res.json({ success: false, message: error.message });
    }
}