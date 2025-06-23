import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./models/db.js";
import apiRoutes from "./routers/formSApi.js";
import imageRoutes from "./routers/banner.js"
import companylogosRoutes from "./routers/companyLogo.js"
import blogRoutesRoutes from './routers/blogRoutes.js';
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // for JSON payloads
app.use("/uploads", express.static("uploads")); // to serve resume files

app.use("/api", apiRoutes);
app.use('/apis/images', imageRoutes);
app.use('/apis/logos', companylogosRoutes);
app.use('/api/blogs', blogRoutesRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
