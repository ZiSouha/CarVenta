import express from 'express';
import multer from 'multer';
import path from 'path';
import DamageReport from '../models/DamageReport.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/damage-reports/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only image files are allowed!'));
    }
});

// @route   POST /api/damage-reports
// @desc    Submit a damage report
// @access  Private
router.post('/', protect, upload.array('images', 5), async (req, res) => {
    try {
        const { bookingId, damageType, description, severity } = req.body;

        if (!bookingId || !damageType || !description || !severity) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const images = req.files ? req.files.map(file => file.path.replace(/\\/g, '/')) : [];

        const damageReport = await DamageReport.create({
            booking: bookingId,
            user: req.user._id,
            damageType,
            description,
            severity,
            images,
            status: 'pending'
        });

        res.status(201).json({
            success: true,
            message: 'Damage report submitted successfully',
            damageReport
        });

    } catch (error) {
        console.error('Damage report error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   GET /api/damage-reports/booking/:bookingId
// @desc    Get damage reports for a booking
// @access  Private
router.get('/booking/:bookingId', protect, async (req, res) => {
    try {
        const Booking = (await import('../models/Booking.js')).default;
        const booking = await Booking.findById(req.params.bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        const isAuthorized = 
            ['admin', 'super-admin'].includes(req.user.role) ||
            booking.user.toString() === req.user._id.toString() ||
            (booking.owner && booking.owner.toString() === req.user._id.toString());

        if (!isAuthorized) {
            return res.status(403).json({ success: false, message: 'Unauthorized to view reports for this booking' });
        }

        const reports = await DamageReport.find({
            booking: req.params.bookingId
        }).populate('user', 'name email');

        res.json({
            success: true,
            reports
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   GET /api/damage-reports/user
// @desc    Get all damage reports for current user
// @access  Private
router.get('/user', protect, async (req, res) => {
    try {
        const reports = await DamageReport.find({
            user: req.user._id
        }).populate('booking');

        res.json({
            success: true,
            reports
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   GET /api/damage-reports/all
// @desc    Get all damage reports (Admin only)
// @access  Private/Admin
router.get('/all', protect, async (req, res) => {
    try {
        // Check if user is admin/owner/super-admin
        if (!['owner', 'admin', 'super-admin'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin or Owner privileges required.'
            });
        }

        const reports = await DamageReport.find()
            .populate('user', 'name email')
            .populate('booking')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            reports
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @route   PUT /api/damage-reports/:id/status
// @desc    Update damage report status (Admin only)
// @access  Private/Admin
router.put('/:id/status', protect, async (req, res) => {
    try {
        // Check if user is admin/owner/super-admin
        if (!['owner', 'admin', 'super-admin'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin or Owner privileges required.'
            });
        }

        const { status, adminNotes, estimatedCost } = req.body;

        const report = await DamageReport.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Damage report not found'
            });
        }

        report.status = status || report.status;
        if (adminNotes) report.adminNotes = adminNotes;
        if (estimatedCost) report.estimatedCost = estimatedCost;

        await report.save();

        res.json({
            success: true,
            message: 'Report updated successfully',
            report
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default router;
