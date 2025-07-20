import express from "express";
import path from "path";
import fs from "fs";

const router = express.Router();
const resumesPath = path.join("/root/Directhirefinal/Backend/resumes");

router.get("/resumes/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(resumesPath, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    // Optional: Add auth check here (JWT or domain-based)
    // const token = req.headers.authorization?.split(" ")[1];
    // verifyToken(token); // If needed

    res.download(filePath); // triggers download in browser
  } catch (err) {
    console.error("Resume Download Error:", err);
    res.status(500).json({ error: "Failed to download resume" });
  }
});

export default router;
