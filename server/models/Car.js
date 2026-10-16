import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types


const carSchema = new mongoose.Schema({
    owner: { type: ObjectId, ref: 'User' },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    year: { type: Number, required: true },
    category: { type: String, required: true },
    seating_capacity: { type: Number, required: true },
    fuel_type: { type: String, required: true },
    transmission: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    isAvaliable: { type: Boolean, default: true },
    // Advanced Details
    engine_size: { type: String },
    horsepower: { type: Number },
    doors: { type: Number },
    drive_type: { type: String },
    color_exterior: { type: String },
    color_interior: { type: String },
    mileage: { type: Number },
    features: [{ type: String }],
    license_plate: { type: String },
    vin: { type: String },
    insurance_policy: { type: String },
    // Reviews
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
}, { timestamps: true })

carSchema.index({ owner: 1 });
carSchema.index({ location: 1 });
carSchema.index({ category: 1 });
carSchema.index({ pricePerDay: 1 });
carSchema.index({ brand: 1, model: 1 });

const Car = mongoose.model('Car', carSchema)

export default Car