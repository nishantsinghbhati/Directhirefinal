import Hire from "../schema/Hire.js";
import express from "express";
import { sendWhatsApp } from "../whatsapp.js";

const router = express.Router();



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




export default router;