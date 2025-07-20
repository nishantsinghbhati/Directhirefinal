import express from "express";
import fs from "fs";
import path from "path";
import { verifyToken } from "../middleware/auth.js"; 

const router = express.Router();
const resumesPath = path.join("/root/Directhirefinal/Backend/resumes");

router.delete("/resumes/:filename", verifyToken, (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(resumesPath, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  try {
    fs.unlinkSync(filePath);
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (err) {
    console.error("Resume Delete Error:", err);
    res.status(500).json({ error: "Failed to delete resume" });
  }
});

export default router;
