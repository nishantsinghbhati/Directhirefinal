import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const mobileDir = path.join(__dirname, '../uploads/banners/mobile');

// Upload Mobile Banner
router.post('/upload', (req, res) => {
  if (!req.files || !req.files.banner) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const file = req.files.banner;
  const filePath = path.join(mobileDir, file.name);

  file.mv(filePath, (err) => {
    if (err) return res.status(500).json({ message: 'Upload failed' });
    res.json({ success: true });
  });
});

// Delete Mobile Banner
router.delete('/:filename', (req, res) => {
  const filePath = path.join(mobileDir, req.params.filename);

  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ message: 'Delete failed' });
    res.json({ success: true });
  });
});

export default router;
