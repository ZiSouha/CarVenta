import mongoose from 'mongoose';
import 'dotenv/config';

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error("FAILURE: MONGODB_URI environment variable is not defined in .env file.");
    process.exit(1);
}

console.log("Attempting to connect to MongoDB...");

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => {
        console.log("SUCCESS: Connected to MongoDB successfully!");
        process.exit(0);
    })
    .catch((err) => {
        console.error("FAILURE: Could not connect to MongoDB.");
        console.error(err.message);
        process.exit(1);
    });
