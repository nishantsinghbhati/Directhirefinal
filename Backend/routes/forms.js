import express from "express";
import multer from "multer";
import { sendWhatsApp } from "../whatsapp.js";
import Contact from "../models/Contact.js";
import Hire from "../models/Hire.js";
import Job from "../models/Job.js";
import { google } from "googleapis";
import path from "path";
import stream from "stream"; 
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Google Drive setup
const SERVICE_ACCOUNT_FILE = path.join(process.cwd(), "directhire-service-account.json");
const FOLDER_ID = "1Epx5pn7xGVUBWCZ-eqQitdHM_4t5f_gE"; // Replace with your actual folder ID

async function uploadToGoogleDrive(file) {
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ["https://www.googleapis.com/auth/drive"]
  });

  const drive = google.drive({ version: "v3", auth });

  // ✅ Convert buffer to stream
  const bufferStream = new stream.PassThrough();
  bufferStream.end(file.buffer);

  const res = await drive.files.create({
    requestBody: {
      name: file.originalname,
      parents: [FOLDER_ID],
    },
    media: {
      mimeType: file.mimetype,
      body: bufferStream, // ✅ MUST be a stream
    },
    fields: "id, name"
  });

  // Make file public
  await drive.permissions.create({
    fileId: res.data.id,
    requestBody: {
      role: "reader",
      type: "anyone"
    }
  });

  const publicUrl = `https://drive.google.com/uc?id=${res.data.id}&export=download`;
  return { link: publicUrl, filename: res.data.name };
}

// ------------------ ROUTES ------------------

// 🟢 Contact Form
router.post("/contact", async (req, res) => {
  const { name, phone, email, message } = req.body;

  try {
    // Save to MongoDB
    const contact = new Contact({
      name,
      phone,
      email,
      message
    });
    await contact.save();

    // Send WhatsApp notification
    await sendWhatsApp({
      name,
      phone,
      email,
      message,
      type: "contact"
    });

    res.status(200).json({ message: "Contact form submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
});

// 🟢 Hire Talent
router.post("/hire", async (req, res) => {
  const { name, email, company, message } = req.body;

  try {
    // Save to MongoDB
    const hire = new Hire({
      name,
      email,
      company,
      message
    });
    await hire.save();

    // Send WhatsApp notification
    await sendWhatsApp({
      name,
      email,
      type: "hire",
      company,
      message
    });

    res.status(200).json({ message: "Hire form submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit hire form" });
  }
});

// 🟢 Job Seeker Form
router.post("/job", upload.single("resume"), async (req, res) => {
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
