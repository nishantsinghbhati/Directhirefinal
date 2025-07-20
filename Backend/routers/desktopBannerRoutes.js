import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { verifyToken } from "../middleware/auth.js"; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const desktopDir = path.join(__dirname, '../banners/desktop');

// Upload Desktop Banner
router.post('/upload',verifyToken, (req, res) => {
  if (!req.files || !req.files.banner) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const file = req.files.banner;

  // Optional: Get file extension (jpg/png) from uploaded file
  const extension = path.extname(file.name); // e.g., '.jpg'
  const fixedFileName = 'banner' + extension; // Save as banner.jpg / banner.png
  const filePath = path.join(desktopDir, fixedFileName);

  file.mv(filePath, (err) => {
    if (err) return res.status(500).json({ message: 'Upload failed' });
    res.json({ success: true, filename: fixedFileName });
  });
});


// Delete Desktop Banner
router.delete('/:filename',verifyToken, (req, res) => {
  const filePath = path.join(desktopDir, req.params.filename);

  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ message: 'Delete failed' });
    res.json({ success: true });
  });
});

export default router;
