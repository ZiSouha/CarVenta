import mongoose from "mongoose";

const siteConfigSchema = new mongoose.Schema({
    heroTitle: { type: String, default: "Find, book, and rent a car in easy steps." },
    heroSubtitle: { type: String, default: "Get a car wherever and whenever you need it with our iOS and Android app." },
    heroImage: { type: String, default: "" },
    contactEmail: { type: String, default: "support@carventa.com" },
    contactPhone: { type: String, default: "+1 234 567 890" },
    socialLinks: {
        facebook: { type: String, default: "" },
        twitter: { type: String, default: "" },
        instagram: { type: String, default: "" }
    },
    featuredCarIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'car' }]
}, { timestamps: true });

const SiteConfig = mongoose.models.siteConfig || mongoose.model('siteConfig', siteConfigSchema);

export default SiteConfig;
