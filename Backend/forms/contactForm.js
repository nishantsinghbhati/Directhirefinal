import express from "express";
import { sendWhatsApp } from "../whatsapp.js";
import Contact from "../schema/Contact.js";


const router = express.Router();


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



export default router;