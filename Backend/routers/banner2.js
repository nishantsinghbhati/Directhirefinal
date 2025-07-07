import express from "express";
import Banner from '../schema/banner2.js';
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners); // Make sure this returns an array
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch banner" });
  }
});

export default router;