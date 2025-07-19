import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./models/db.js";

import apiRoutes from "./routers/formSApi.js";
import imageRoutes from "./routers/banner.js";        // Existing MongoDB banner (desktop)
import bannerRoutes from "./routers/banner2.js";      // Existing MongoDB banner (mobile)
import companylogosRoutes from "./routers/companyLogo.js";
import blogRoutesRoutes from './routers/blogRoutes.js';

dotenv.config();

// Connect to MongoDB for existing features (form, blog, logos)
connectDB();

const app = express();

// CORS Config
app.use(cors());

app.use(express.json());

// ✅ Serve Resume Uploads (if still used)
app.use("/uploads", express.static("uploads"));

// ✅ NEW: Serve banner images from VPS file system
app.use("/static/banners/desktop", express.static("uploads/banners/desktop"));
app.use("/static/banners/mobile", express.static("uploads/banners/mobile"));

// ✅ Existing MongoDB-based routes (still needed)
app.use("/api", apiRoutes);
app.use("/apis/images", imageRoutes);           // Fetch desktop banner from MongoDB (optional)
app.use("/apis/banners", bannerRoutes);         // Fetch mobile banner from MongoDB (optional)
app.use("/apis/logos", companylogosRoutes);
app.use("/api/blogs", blogRoutesRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Main backend running on port ${PORT}`));
