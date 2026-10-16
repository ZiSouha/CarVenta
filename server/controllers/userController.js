import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Car from "../models/Car.js";
import { emitEvent } from "../socket.js";
import crypto from 'crypto';
import { sendVerificationEmail, sendPasswordResetEmail } from "../utils/emailService.js";



// Generate JWT Token
const generateToken = (userId, role) => {
    const payload = { id: userId, role };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password || password.length < 8) {
            return res.json({ success: false, message: 'Fill all the fields properly (password min 8 chars)' })
        }

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.json({ success: false, message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        // Email Verification Token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        // RBAC: Check for configured Super Admin email
        const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
        const role = (adminEmail && email.toLowerCase() === adminEmail) ? 'super-admin' : 'user';

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            emailVerificationToken: verificationToken,
            emailVerificationExpires: verificationExpires
        })

        // Send Verification Email
        await sendVerificationEmail(email, verificationToken, name);

        const token = generateToken(user._id.toString(), user.role)
        res.json({ success: true, token, user: { name: user.name, email: user.email, role: user.role, image: user.image }, message: "Registration successful. Please verify your email." })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// LoginUser

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        if (user.isBlocked) {
            return res.json({ success: false, message: "Your account has been blocked. Contact support." });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        // Guarantee Super Admin role for configured ADMIN_EMAIL
        const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
        if (adminEmail && user.email.toLowerCase() === adminEmail && user.role !== 'super-admin') {
            user.role = 'super-admin';
            await user.save();
        }

        const token = generateToken(user._id.toString(), user.role)
        res.json({ success: true, token, user: { name: user.name, email: user.email, role: user.role, image: user.image } })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

// Admin: Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const isSuperAdminUser = req.user?.role === 'super-admin' || req.user?.role === 'admin';

        if (!isSuperAdminUser) {
            // Return preview showcase user list for visitors & non-super-admins
            return res.json({
                success: true,
                isDemoPreview: true,
                users: [
                    {
                        _id: "usr_admin_default",
                        name: "System Administrator",
                        email: "admin@carventa.com",
                        role: "super-admin",
                        isBlocked: false,
                        createdAt: new Date().toISOString()
                    },
                    {
                        _id: "usr_preview_alexander",
                        name: "Alexander Vance",
                        email: "a.vance@enterprise.com",
                        role: "user",
                        isBlocked: false,
                        createdAt: new Date(Date.now() - 86400000 * 12).toISOString()
                    },
                    {
                        _id: "usr_preview_elena",
                        name: "Elena Rostova",
                        email: "elena.r@luxurydrive.com",
                        role: "user",
                        isBlocked: false,
                        createdAt: new Date(Date.now() - 86400000 * 20).toISOString()
                    }
                ]
            });
        }

        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json({ success: true, users });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Super Admin: Update User Role
export const updateUserRole = async (req, res) => {
    try {
        const { userId, newRole } = req.body;

        if (req.user?.role !== 'super-admin') {
            return res.status(403).json({ success: false, message: "Action Restricted: Only Super Admin can modify user roles." });
        }

        // Validate role
        if (!['user', 'admin', 'owner'].includes(newRole)) {
            return res.json({ success: false, message: "Invalid role assignment." });
        }

        const targetUser = await User.findById(userId);
        if (!targetUser) return res.json({ success: false, message: "User not found" });

        if (targetUser.role === 'super-admin') {
            return res.json({ success: false, message: "Cannot modify Super Admin account." });
        }

        targetUser.role = newRole;
        await targetUser.save();

        emitEvent("USER_UPDATED", targetUser);
        res.json({ success: true, message: `User role updated to ${newRole}` });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Block User
export const blockUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (req.user?.role !== 'super-admin' && req.user?.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Action Restricted: Administrator privileges required to block users." });
        }

        const targetUser = await User.findById(userId);
        if (!targetUser) return res.json({ success: false, message: "User not found" });

        if (targetUser.role === 'super-admin') {
            return res.json({ success: false, message: "Cannot block Super Admin" });
        }

        targetUser.isBlocked = true;
        await targetUser.save();

        emitEvent("USER_UPDATED", targetUser);
        res.json({ success: true, message: "User Blocked" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Unblock User
export const unblockUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (req.user?.role !== 'super-admin' && req.user?.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Action Restricted: Administrator privileges required to unblock users." });
        }

        await User.findByIdAndUpdate(userId, { isBlocked: false });
        const targetUser = await User.findById(userId);

        emitEvent("USER_UPDATED", targetUser);
        res.json({ success: true, message: "User Unblocked" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Get User data using Token (JWT)
export const getUserData = async (req, res) => {
    try {
        const { user } = req;
        res.json({ success: true, user })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// API to Update User Profile
export const updateUserProfile = async (req, res) => {
    try {
        const { _id } = req.user;
        const { name } = req.body; // Only allow name updates, not email

        const updatedUser = await User.findByIdAndUpdate(_id, { name }, { new: true }).select("-password");

        // Notify admins about user update
        emitEvent("USER_UPDATED", updatedUser);

        res.json({ success: true, message: "Profile Updated", user: updatedUser });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Get All Cars for the Frontend
export const getCars = async (req, res) => {
    try {
        const cars = await Car.find({ isAvaliable: true })
        res.json({ success: true, cars })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// API to Update User Password
export const updatePassword = async (req, res) => {
    try {
        const { _id } = req.user;
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(_id);
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Current password is incorrect" });
        }

        if (newPassword.length < 8) {
            return res.json({ success: false, message: "New password must be at least 8 characters" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(_id, { password: hashedPassword });

        res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Toggle Favorite (Add/Remove from wishlist)
export const toggleFavorite = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { carId } = req.body;

        const user = await User.findById(userId);

        // Check if car is already in favorites
        const isFavorite = user.favorites.includes(carId);

        if (isFavorite) {
            // Remove from favorites
            user.favorites = user.favorites.filter(id => id.toString() !== carId);
            await user.save();
            res.json({ success: true, message: "Removed from favorites", isFavorite: false });
        } else {
            // Add to favorites
            user.favorites.push(carId);
            await user.save();
            res.json({ success: true, message: "Added to favorites", isFavorite: true });
        }

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Get User Favorites
export const getFavorites = async (req, res) => {
    try {
        const { _id: userId } = req.user;

        const user = await User.findById(userId).populate('favorites');
        res.json({ success: true, favorites: user.favorites });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Check if car is favorited
export const isFavorite = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { carId } = req.params;

        const user = await User.findById(userId);
        const isFavorite = user.favorites.includes(carId);

        res.json({ success: true, isFavorite });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: true, message: "If an account exists with this email, you will receive a reset link." });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetExpires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

        user.passwordResetToken = resetToken;
        user.passwordResetExpires = resetExpires;
        await user.save();

        await sendPasswordResetEmail(email, resetToken, user.name);

        res.json({ success: true, message: "Reset link sent successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.json({ success: false, message: "Invalid or expired reset token" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        res.json({ success: true, message: "Password reset successful" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Verify Email
export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.json({ success: false, message: "Invalid or expired verification token" });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        res.json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
