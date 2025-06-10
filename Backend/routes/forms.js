import express from "express";
import multer from "multer";
import { sendMail } from "../mailer.js";
import { sendWhatsApp } from "../whatsapp.js";

const router = express.Router();

// Multer config (only for job route)
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage: multer.memoryStorage() });


// ------------------ ROUTES ------------------

// 🟢 Contact Form (No File)
router.post("/contact", async (req, res) => {
  const { name, phone, email, message } = req.body;

  try {
    await sendMail({
      subject: "New Contact Form",
      body: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    });
    res.status(200).send("Contact form submitted");
  } catch (err) {
    res.status(500).send("Failed to send contact form");
  }
});

// 🟢 Hire Talent (❌ No Resume Upload)
router.post("/hire", async (req, res) => {
  const { name, email, company, message } = req.body;

  try {
    await sendMail({
      subject: "Hire Talent Form",
      body: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nMessage: ${message}`,
    });

    await sendWhatsApp({ name, email, type: "hire", company, message });

    res.status(200).send("Hire form submitted");
  } catch (err) {
    res.status(500).send("Failed to send hire form");
  }
});

// 🟢 Job Seeker Form (✅ With Resume Upload)
router.post("/job", upload.single("resume"), async (req, res) => {
  const { fullname, dob, email, phone,city,currentctc,expectedctc,gender,company,experience ,education } = req.body;
  const resumeFile = req.file;

  try {
    await sendMail({
      subject: "Job Seeker Form",
      body: `Fullname: ${fullname}\nDob: ${dob}\nEmail: ${email}\nPhone: ${phone}\nCity: ${city}\nCurrentctc: ${currentctc}\nExpectedctc: ${expectedctc}\nGender: ${gender}\nCompany: ${company}\nExperience: ${experience}\nEducation: ${education}`,
      attachment: {
        filename: resumeFile.originalname,
        content: resumeFile.buffer,
      },
    });

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
     experience ,
     education ,
     type: "job",
      // resumeFile.buffer can be used if your WhatsApp API supports it
    });

    res.status(200).send("Job seeker form submitted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send job seeker form");
  }
});


export default router;
