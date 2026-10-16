import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["owner", "user", "admin", "super-admin"], default: 'user' },
    isBlocked: { type: Boolean, default: false },
    image: { type: String, default: '' },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
    // Email Verification
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date },
    // Password Reset
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User