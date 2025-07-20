import Job from "../schema/Job.js";
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { sendWhatsApp } from "../whatsapp.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Change this to match your domain and route
const BASE_URL = "https://www.directhire.in";

router.post("/job", upload.single("resume"), async (req, res) => {
  
  try {
     const allowedDomains = ["https://www.directhire.in"];
    const origin = req.headers.origin || req.headers.referer;

    if (!allowedDomains.some(domain => origin?.startsWith(domain))) {
      return res.status(403).json({ error: "Unauthorized origin" });
    }

    const {
      fullname,
      dob,
      email,
      phone,
      city,
      currentctc,
      expectedctc,
      gender,
      company,
      experience,
      education
    } = req.body;

    let resumeLink = null;

    if (req.file) {
      const ext = path.extname(req.file.originalname);
      const filename = `${uuidv4()}${ext}`;
      const savePath = path.join("/root/Directhirefinal/Backend/resumes", filename);
      fs.writeFileSync(savePath, req.file.buffer);

      // ✅ Generate private backend route link (not publicly served)
      resumeLink = `${BASE_URL}/api/resumes/${filename}`;
    }

    const job = new Job({
      fullname,
      dob,
      email,
      phone,
      city,
      currentctc,
      expectedctc,
      gender,
      company,
      experience,
      education,
      resume: resumeLink, // Save full secure download link
    });

    await job.save();

    await sendWhatsApp({
      fullname,
      dob,
      email,
      phone,
      city,
      currentctc,
      expectedctc,
      gender,
      company,
      experience,
      education,
      type: "job"
    });

    res.status(200).json({ message: "Job seeker form submitted successfully" });
  } catch (err) {
    console.error("Job Form Error:", err);
    res.status(500).json({ error: "Failed to submit job seeker form" });
  }
});

export default router;
