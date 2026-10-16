import express from "express";
import { blockUser, unblockUser, getAllUsers, getCars, getUserData, loginUser, registerUser, updateUserProfile, updateUserRole, updatePassword, toggleFavorite, getFavorites, isFavorite, forgotPassword, resetPassword, verifyEmail } from "../controllers/userController.js";
import { updateUserImage, removeUserImage } from "../controllers/ownerController.js";
import { protect } from "../middleware/auth.js";
import { authLimiter, passwordResetLimiter, emailVerificationLimiter } from "../middleware/rateLimiter.js";
import upload from "../middleware/multer.js";


const userRouter = express.Router();


userRouter.post('/register', authLimiter, registerUser)
userRouter.post('/login', authLimiter, loginUser)
userRouter.get('/data', protect, getUserData)
userRouter.post('/update-profile', protect, updateUserProfile)
userRouter.post('/update-password', protect, updatePassword)
userRouter.post('/update-image', upload.single("image"), protect, updateUserImage)
userRouter.post('/remove-image', protect, removeUserImage)
userRouter.get('/cars', getCars)

// Account Security Routes
userRouter.post('/forgot-password', passwordResetLimiter, forgotPassword)
userRouter.post('/reset-password', passwordResetLimiter, resetPassword)
userRouter.get('/verify-email/:token', emailVerificationLimiter, verifyEmail)

// Favorites/Wishlist Routes
userRouter.post('/toggle-favorite', protect, toggleFavorite)
userRouter.get('/favorites', protect, getFavorites)
userRouter.get('/is-favorite/:carId', protect, isFavorite)

// Admin Routes
userRouter.get('/all-users', protect, getAllUsers)
userRouter.post('/update-role', protect, updateUserRole)
userRouter.post('/block-user', protect, blockUser)
userRouter.post('/unblock-user', protect, unblockUser)

export default userRouter;