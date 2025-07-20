import Job from "../schema/Job.js";
import uploadToGoogleDrive from "../models/googleDriveUpload.js"
import express from "express";
import multer from "multer";
import { sendWhatsApp } from "../whatsapp.js";



const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


// 🟢 Job Seeker Form
router.post("/job", upload.single("resume"), async (req, res) => {
   console.log("Body:", req.body);
  console.log("File:", req.file); 
  const { fullname, dob, email, phone, city, currentctc, expectedctc, gender, company, experience, education } = req.body;
  const resumeFile = req.file;

  try {
    let resumeData = null;
    if (resumeFile) {
      resumeData = await uploadToGoogleDrive(resumeFile);
    }

    // Save to MongoDB
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
      resume: resumeData
    });
    await job.save();

    // Send WhatsApp notification
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
    console.error(err);
    res.status(500).json({ error: "Failed to submit job seeker form" });
  }
});




export default router;