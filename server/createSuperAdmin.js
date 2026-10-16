import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import User from './models/User.js';

const adminEmail = (process.env.ADMIN_EMAIL || process.argv[2] || 'admin@carventa.com').toLowerCase();
const passwordToSet = process.env.ADMIN_PASSWORD || process.argv[3] || 'Admin@CarVenta2026!';
const adminName = process.env.ADMIN_NAME || 'System Administrator';

if (!process.env.MONGODB_URI) {
    console.error('Error: MONGODB_URI environment variable is required to create super admin.');
    process.exit(1);
}

try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'car-rental' });
    const hashedPassword = await bcrypt.hash(passwordToSet, 10);

    let user = await User.findOne({ email: adminEmail });
    if (user) {
        user.name = user.name || adminName;
        user.password = hashedPassword;
        user.role = 'super-admin';
        user.isEmailVerified = true;
        user.isBlocked = false;
        await user.save();
        console.log(`SUCCESS: Existing account for "${adminEmail}" updated to role "super-admin".`);
    } else {
        user = await User.create({
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            role: 'super-admin',
            isEmailVerified: true,
            isBlocked: false
        });
        console.log(`SUCCESS: Created new super-admin account for "${adminEmail}".`);
    }
    console.log(`Login credentials: Email: ${adminEmail} | Password configured successfully.`);
    process.exit(0);
} catch (error) {
    console.error('Error creating super admin:', error.message);
    process.exit(1);
}
