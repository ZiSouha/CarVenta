import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    documentType: { type: String, enum: ['driver_license', 'passport', 'id_card'], default: 'driver_license' },
    documentNumber: { type: String, required: true },
    documentImage: { type: String, required: true }, // URL to storage
    status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    expiryDate: { type: Date },
    verifiedAt: { type: Date },
    rejectionReason: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Verification = mongoose.models.Verification || mongoose.model('Verification', verificationSchema);
export default Verification;
