import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Car from './models/Car.js';
import User from './models/User.js';

dotenv.config();

const sampleCars = [
  {
    brand: "Porsche",
    model: "911 GT3 RS",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
    ],
    year: 2024,
    category: "Sports",
    seating_capacity: 2,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 480,
    location: "Los Angeles",
    description: "The uncompromising track-bred masterpiece. Featuring active aero telemetry, a naturally aspirated 4.0-liter boxer engine revving to 9,000 RPM, and Porsche Doppelkupplung (PDK) precision transmission.",
    isAvaliable: true,
    engine_size: "4.0L Naturally Aspirated",
    horsepower: 518,
    doors: 2,
    drive_type: "RWD",
    color_exterior: "GT Silver Metallic",
    color_interior: "Black Race-Tex w/ Guards Red",
    mileage: 2400,
    features: ["Active Aerodynamics", "PCCB Carbon Brakes", "Telemetry HUD", "Chrono Package"],
    averageRating: 5.0,
    totalReviews: 42
  },
  {
    brand: "Mercedes-Benz",
    model: "S 580 Maybach",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop"
    ],
    year: 2024,
    category: "Sedan",
    seating_capacity: 5,
    fuel_type: "Hybrid",
    transmission: "Automatic",
    pricePerDay: 420,
    location: "New York",
    description: "The pinnacle of executive luxury and whisper-quiet motoring. Equipped with rear executive recliner suites, Burmester 4D High-End audio, and active road noise cancellation.",
    isAvaliable: true,
    engine_size: "4.0L Biturbo V8 w/ EQ Boost",
    horsepower: 496,
    doors: 4,
    drive_type: "AWD",
    color_exterior: "Obsidian Black Metallic",
    color_interior: "Exclusive Nappa Macchiato Beige",
    mileage: 4100,
    features: ["Burmester 4D Audio", "Chauffeur Package", "Panoramic Sliding Roof"],
    averageRating: 4.9,
    totalReviews: 38
  },
  {
    brand: "BMW",
    model: "M4 Competition xDrive",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop"
    ],
    year: 2024,
    category: "Sports",
    seating_capacity: 4,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 295,
    location: "Chicago",
    description: "Unfiltered track agility engineered with German precision. TwinPower Turbo inline-6 pushing 503 HP through an M xDrive all-wheel system with switchable 2WD drift mode.",
    isAvaliable: true,
    engine_size: "3.0L BMW M TwinPower Turbo",
    horsepower: 503,
    doors: 2,
    drive_type: "AWD",
    color_exterior: "Isle of Man Green",
    color_interior: "Kyalami Orange Merino Leather",
    mileage: 6200,
    features: ["M Carbon Bucket Seats", "Head-Up Display", "Adaptive M Suspension"],
    averageRating: 4.9,
    totalReviews: 55
  },
  {
    brand: "Tesla",
    model: "Model S Plaid",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1200&auto=format&fit=crop"
    ],
    year: 2024,
    category: "Sedan",
    seating_capacity: 5,
    fuel_type: "Electric",
    transmission: "Automatic",
    pricePerDay: 265,
    location: "Los Angeles",
    description: "0 to 60 mph in 1.99 seconds. The world's fastest accelerating production sedan with tri-motor all-wheel drive, full glass roof, and immersive gaming-grade cockpit.",
    isAvaliable: true,
    engine_size: "Tri-Motor AWD Electric",
    horsepower: 1020,
    doors: 4,
    drive_type: "AWD",
    color_exterior: "Pearl White Multi-Coat",
    color_interior: "All Black Premium with Carbon Fiber",
    mileage: 8900,
    features: ["Full Self-Driving Capable", "Yoke Steering", "Track Mode"],
    averageRating: 4.8,
    totalReviews: 64
  },
  {
    brand: "Land Rover",
    model: "Range Rover SV",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop"
    ],
    year: 2024,
    category: "SUV",
    seating_capacity: 5,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 360,
    location: "New York",
    description: "The gold standard of luxury SUVs. Effortless power from a 523 HP twin-turbo V8, electronic air suspension, all-wheel steering, and an ultra-refined handcrafted interior.",
    isAvaliable: true,
    engine_size: "4.4L Twin-Turbocharged V8",
    horsepower: 523,
    doors: 4,
    drive_type: "AWD",
    color_exterior: "Santorini Black",
    color_interior: "Semi-Aniline Deep Garnet Leather",
    mileage: 5100,
    features: ["All-Wheel Steering", "Meridian Signature Sound", "Executive Class Seating"],
    averageRating: 4.9,
    totalReviews: 29
  },
  {
    brand: "Audi",
    model: "RS6 Avant Performance",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop"
    ],
    year: 2024,
    category: "Sedan",
    seating_capacity: 5,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 320,
    location: "Houston",
    description: "A 621-horsepower hyper-wagon delivering supercar velocity with daily functionality. Quattro permanent all-wheel drive and RS sport exhaust system.",
    isAvaliable: true,
    engine_size: "4.0L Bi-Turbo V8",
    horsepower: 621,
    doors: 5,
    drive_type: "AWD",
    color_exterior: "Nardo Gray",
    color_interior: "Valcona Leather w/ RS Honeycomb",
    mileage: 7300,
    features: ["Bang & Olufsen 3D Sound", "RS Dynamic Package Plus", "Ceramic Brakes"],
    averageRating: 5.0,
    totalReviews: 47
  },
  {
    brand: "Lamborghini",
    model: "Urus Performante",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop"
    ],
    year: 2024,
    category: "SUV",
    seating_capacity: 5,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 580,
    location: "Los Angeles",
    description: "The world's premier Super Sport Utility Vehicle. Aggressive aerodynamic styling, carbon fiber bonnet and roof, Akrapovič titanium exhaust, and explosive Italian V8 torque.",
    isAvaliable: true,
    engine_size: "4.0L Twin-Turbo V8",
    horsepower: 657,
    doors: 4,
    drive_type: "AWD",
    color_exterior: "Giallo Inti (Yellow)",
    color_interior: "Nero Cosmus Alcantara",
    mileage: 3800,
    features: ["Akrapovic Titanium Exhaust", "Carbon Ceramic Brakes", "ANIMA Drive Modes"],
    averageRating: 4.9,
    totalReviews: 31
  },
  {
    brand: "Ferrari",
    model: "F8 Tributo",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1200&auto=format&fit=crop"
    ],
    year: 2023,
    category: "Sports",
    seating_capacity: 2,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 650,
    location: "New York",
    description: "A celebration of excellence honoring the most powerful V8 in Ferrari history. 710 horsepower, S-Duct aerodynamic wizardry, and instantaneous throttle response.",
    isAvaliable: true,
    engine_size: "3.9L Twin-Turbo 90° V8",
    horsepower: 710,
    doors: 2,
    drive_type: "RWD",
    color_exterior: "Rosso Corsa",
    color_interior: "Nero Leather w/ Rosso Stitching",
    mileage: 2100,
    features: ["Carbon Fiber Racing Seats", "Side Slip Control", "Suspension Lifter"],
    averageRating: 5.0,
    totalReviews: 24
  },
  {
    brand: "Porsche",
    model: "Taycan Turbo S",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop"
    ],
    year: 2024,
    category: "Sedan",
    seating_capacity: 4,
    fuel_type: "Electric",
    transmission: "Automatic",
    pricePerDay: 330,
    location: "Chicago",
    description: "Pure Porsche soul electrified. 800-volt architecture delivering repeat launches to 60 mph in 2.6 seconds, rear-axle steering, and instant electric torque curve.",
    isAvaliable: true,
    engine_size: "Permanent Magnet Electric Motors",
    horsepower: 750,
    doors: 4,
    drive_type: "AWD",
    color_exterior: "Frozen Blue Metallic",
    color_interior: "Black & Slate Grey Leather-Free",
    mileage: 6500,
    features: ["Porsche Electric Sport Sound", "Passenger Display", "Burmester 3D Surround"],
    averageRating: 4.8,
    totalReviews: 40
  },
  {
    brand: "Cadillac",
    model: "Escalade-V Supercharged",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1200&auto=format&fit=crop"
    ],
    year: 2024,
    category: "SUV",
    seating_capacity: 7,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 375,
    location: "Houston",
    description: "The most powerful full-size luxury SUV on the road. Hand-built 682 HP supercharged V8, 38-inch curved OLED display, and AKG Studio Reference 36-speaker sound system.",
    isAvaliable: true,
    engine_size: "6.2L Hand-Built Supercharged V8",
    horsepower: 682,
    doors: 4,
    drive_type: "AWD",
    color_exterior: "Dark Emerald Metallic",
    color_interior: "Jet Black Semi-Aniline Leather",
    mileage: 4900,
    features: ["38-inch Curved OLED", "AKG 36-Speaker Sound", "Super Cruise Hands-Free"],
    averageRating: 4.9,
    totalReviews: 33
  },
  {
    brand: "Ford",
    model: "Mustang Dark Horse",
    image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=1200&auto=format&fit=crop"
    ],
    year: 2024,
    category: "Sports",
    seating_capacity: 4,
    fuel_type: "Petrol",
    transmission: "Manual",
    pricePerDay: 195,
    location: "Chicago",
    description: "Raw American muscle engineered with track-focused performance. 500-horsepower naturally aspirated Coyote V8 with TREMEC 6-speed manual transmission and MagneRide damping.",
    isAvaliable: true,
    engine_size: "5.0L Gen-4 Coyote V8",
    horsepower: 500,
    doors: 2,
    drive_type: "RWD",
    color_exterior: "Blue Ember Metallic",
    color_interior: "Deep Indigo Leather & Suede",
    mileage: 7800,
    features: ["TREMEC 6-Speed Manual", "Brembo 6-Piston Brakes", "MagneRide Damping"],
    averageRating: 4.7,
    totalReviews: 51
  },
  {
    brand: "Chevrolet",
    model: "Corvette Z06 3LZ",
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop"
    ],
    year: 2024,
    category: "Sports",
    seating_capacity: 2,
    fuel_type: "Petrol",
    transmission: "Automatic",
    pricePerDay: 325,
    location: "Los Angeles",
    description: "American supercar royalty. Powered by the LT6 5.5L flat-plane crank V8 — the highest horsepower naturally aspirated V8 ever put in a production car.",
    isAvaliable: true,
    engine_size: "5.5L Flat-Plane Crank V8",
    horsepower: 670,
    doors: 2,
    drive_type: "RWD",
    color_exterior: "Torch Red",
    color_interior: "Adrenaline Red Napa Leather",
    mileage: 3200,
    features: ["Z07 Performance Package", "Carbon Aero Package", "Performance Data Recorder"],
    averageRating: 5.0,
    totalReviews: 39
  }
];

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'car-rental',
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected successfully!");

    // Find default owner or super-admin
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@carventa.com').toLowerCase();
    let ownerUser = await User.findOne({ role: { $in: ['super-admin', 'owner', 'admin'] } });
    if (!ownerUser) {
      ownerUser = await User.findOne({ email: adminEmail });
    }
    if (!ownerUser) {
      ownerUser = await User.findOne();
    }

    const ownerId = ownerUser ? ownerUser._id : new mongoose.Types.ObjectId();

    console.log("Clearing existing car collection...");
    await Car.deleteMany({});

    console.log("Inserting 12 premium showcase vehicles...");
    const carsToInsert = sampleCars.map(c => ({
      ...c,
      owner: ownerId
    }));

    const inserted = await Car.insertMany(carsToInsert);
    console.log(`Successfully seeded ${inserted.length} cars into MongoDB!`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
}

seedDatabase();
