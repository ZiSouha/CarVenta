import mongoose from 'mongoose';

const damageReportSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    damageType: {
        type: String,
        required: true,
        enum: ['Scratches', 'Dents', 'Broken Glass', 'Tire Damage', 'Interior Damage', 'Mechanical Issue', 'Other']
    },
    description: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        required: true,
        enum: ['minor', 'moderate', 'severe'],
        default: 'minor'
    },
    images: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['pending', 'reviewing', 'approved', 'rejected'],
        default: 'pending'
    },
    adminNotes: {
        type: String
    },
    estimatedCost: {
        type: Number
    }
}, {
    timestamps: true
});

export default mongoose.model('DamageReport', damageReportSchema);
