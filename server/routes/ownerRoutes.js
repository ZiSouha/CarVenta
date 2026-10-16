import express from "express";
import { protect } from "../middleware/auth.js";
import {
    addCar,
    changeRolToOwner,
    deleteCar,
    getDashboardData,
    getOwnerCars,
    toggleCarAvailability,
    updateCar,
    updateUserImage,
    removeUserImage,
    bulkDeleteCars,
    bulkUpdateAvailability,
    getSiteConfig,
    updateSiteConfig,
    getActivityLogs
} from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, changeRolToOwner)
ownerRouter.post("/add-car", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 5 }]), protect, addCar)
ownerRouter.get("/cars", protect, getOwnerCars)
ownerRouter.post("/toggle-car", protect, toggleCarAvailability)
ownerRouter.post("/delete-car", protect, deleteCar)
ownerRouter.post("/update-car", protect, updateCar)
ownerRouter.get('/dashboard', protect, getDashboardData)
ownerRouter.post('/update-image', upload.single("image"), protect, updateUserImage)
ownerRouter.post('/remove-image', protect, removeUserImage)

// Bulk Operations
ownerRouter.post("/bulk-delete", protect, bulkDeleteCars)
ownerRouter.post("/bulk-availability", protect, bulkUpdateAvailability)

// CMS / Activity Logs
ownerRouter.get("/site-config", protect, getSiteConfig)
ownerRouter.post("/update-site-config", protect, updateSiteConfig)
ownerRouter.get("/activity-logs", protect, getActivityLogs)

export default ownerRouter;