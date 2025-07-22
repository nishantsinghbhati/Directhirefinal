import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { verifyToken } from "../middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();
const mobileDir = path.join(__dirname, '../banners/mobile');

// Make sure the directory exists
if (!fs.existsSync(mobileDir)) {
  fs.mkdirSync(mobileDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, mobileDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, 'banner' + ext); // Save as banner.jpg or banner.png
  },
});

const upload = multer({ storage });

// ✅ GET All Mobile Banners
router.get('/', (req, res) => {
  fs.readdir(mobileDir, (err, files) => {
    if (err) return res.status(500).json({ message: 'Failed to read banners' });

    const urls = files.map(file => ({
      filename: file,
      url: `https://www.api.directhire.in/static/banners/mobile/${file}`
    }));

    res.json(urls);
  });
});

// ✅ Upload Mobile Banner using multer
router.post('/upload', verifyToken, upload.single('banner'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json({
    success: true,
    filename: req.file.filename,
    url: `https://www.api.directhire.in/static/banners/mobile/${req.file.filename}`,
  });
});

// ✅ Delete Mobile Banner
router.delete('/:filename', verifyToken, (req, res) => {
  const filePath = path.join(mobileDir, req.params.filename);

  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ message: 'Delete failed' });
    res.json({ success: true });
  });
});

export default router;
