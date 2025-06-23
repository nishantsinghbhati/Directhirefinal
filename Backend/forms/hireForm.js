import Hire from "../schema/Hire.js";
import express from "express";
import { sendWhatsApp } from "../whatsapp.js";

const router = express.Router();

// 🟢 Hire Talent
router.post("/hire", async (req, res) => {
  const {
    company,
    contact,
    email,
    phone,
    title,
    description,
    mode,
    location,
    salary,
    experience,
  } = req.body;

  try {
    // Save to MongoDB
    const hire = new Hire({
      company,
      contact,
      email,
      phone,
      title,
      description,
      mode,
      location,
      salary,
      experience,
    });

    await hire.save();

    // Send WhatsApp notification (you can customize message formatting inside sendWhatsApp)
    await sendWhatsApp({
      type: "hire",
      contact,
      email,
      phone,
      title,
      company,
    });

    res.status(200).json({ message: "Hire form submitted successfully" });
  } catch (err) {
    console.error("Hire form error:", err);
    res.status(500).json({ error: "Failed to submit hire form" });
  }
});

export default router;
