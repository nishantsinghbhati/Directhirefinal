import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./models/db.js";
import fileUpload from "express-fileupload"; // ✅ New

import apiRoutes from "./routers/formSApi.js";
import imageRoutes from "./routers/banner.js";
import bannerRoutes from "./routers/banner2.js";
import companylogosRoutes from "./routers/companyLogo.js";
import blogRoutesRoutes from './routers/blogRoutes.js';

import desktopBannerRoutes from "./routers/desktopBannerRoutes.js";  // ✅ New
import mobileBannerRoutes from "./routers/mobileBannerRoutes.js";    // ✅ New

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload()); // ✅ New

// Serve static images
app.use("/uploads", express.static("uploads"));
app.use("/static/banners/desktop", express.static("uploads/banners/desktop"));
app.use("/static/banners/mobile", express.static("uploads/banners/mobile"));

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
