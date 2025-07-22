import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { verifyToken } from "../middleware/auth.js"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const mobileDir = path.join(__dirname, '../banners/mobile');

// Upload Mobile Banner
router.post('/upload',verifyToken, (req, res) => {
  if (!req.files || !req.files.banner) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const file = req.files.banner;
router.get('/', (req, res) => {
  fs.readdir(desktopDir, (err, files) => {
    if (err) return res.status(500).json({ message: 'Failed to read banners' });

    const urls = files.map(file => ({
      filename: file,
      url: `https://www.api.directhire.in/static/banners/mobile/${file}`
    }));

    res.json(urls);
  });
});
  // Optional: Get file extension (jpg/png) from uploaded file
  const extension = path.extname(file.name); // e.g., '.jpg'
  const fixedFileName = 'banner' + extension; // Save as banner.jpg / banner.png
  const filePath = path.join(mobileDir, fixedFileName);

  file.mv(filePath, (err) => {
    if (err) return res.status(500).json({ message: 'Upload failed' });
    res.json({ success: true, filename: fixedFileName });
  });
});
// Delete Mobile Banner
router.delete('/:filename',verifyToken, (req, res) => {
  const filePath = path.join(mobileDir, req.params.filename);

  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ message: 'Delete failed' });
    res.json({ success: true });
  });
});

export default router;
