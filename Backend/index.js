import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./models/db.js";
import fileUpload from "express-fileupload"; // ✅ New
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";
import apiRoutes from "./routers/formSApi.js";
import imageRoutes from "./routers/banner.js";
import bannerRoutes from "./routers/banner2.js";
import companylogosRoutes from "./routers/companyLogo.js";
import blogRoutesRoutes from './routers/blogRoutes.js';

import desktopBannerRoutes from "./routers/desktopBannerRoutes.js";  // ✅ New
import mobileBannerRoutes from "./routers/mobileBannerRoutes.js";    // ✅ New

dotenv.config();
connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

const allowedOrigins = [
    'https://www.directhire.in' ,
    'https://directhire.in',
    'directhire.in' // Optional, covers some local setups
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));;
app.use(express.json()); // for JSON payloads
app.use("/uploads", express.static("uploads")); // to serve resume files
app.use(express.json());


// Serve static images

// Serve static images from correct folder inside the project
app.use("/static/banners/desktop", express.static(path.join(__dirname, "banners/desktop")));
app.use("/static/banners/mobile", express.static(path.join(__dirname, "banners/mobile")));

// API routes
app.use("/api", apiRoutes);
app.use("/apis/images", imageRoutes);
app.use("/apis/banners", bannerRoutes);
app.use("/apis/logos", companylogosRoutes);
app.use("/api/blogs", blogRoutesRoutes);

// ✅ New: Banner upload/delete routes
app.use("/api/banners/desktop", desktopBannerRoutes);
app.use("/api/banners/mobile", mobileBannerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`Main backend running on port ${PORT}`));
