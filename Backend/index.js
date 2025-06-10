import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import formRoutes from "./routes/forms.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // for JSON payloads
app.use("/uploads", express.static("uploads")); // to serve resume files

app.use("/api", formRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
