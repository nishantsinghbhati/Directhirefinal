import express from "express";
import contactformRoutes from "../forms/contactForm.js";
import joobseekerformRoutes from "../forms/hireForm.js";
import hireformRoutes from "../forms/jobSeekerForm.js";

const router = express.Router();

router.use( contactformRoutes);
router.use( joobseekerformRoutes);
router.use( hireformRoutes);

export default router;