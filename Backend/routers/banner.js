import express from "express";
import Image from '../schema/banner.js';
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images); // Make sure this returns an array
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

export default router;