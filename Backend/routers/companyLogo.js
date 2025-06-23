import express from "express";
import Companylogos from '../schema/companyLogo.js';
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const images = await Companylogos.find();
    res.json(images); // Make sure this returns an array
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

export default router;