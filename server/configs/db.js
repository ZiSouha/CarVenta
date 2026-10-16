import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return;
    }
    if (!process.env.MONGODB_URI) {
        console.error("Critical: MONGODB_URI environment variable is missing on this server!");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'car-rental',
            serverSelectionTimeoutMS: 5000,
        });
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Critical: Could not connect to MongoDB Atlas:", error.message);
    }
}

export default connectDB;