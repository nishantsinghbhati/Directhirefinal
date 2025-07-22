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

const desktopDir = path.join(__dirname, '../banners/desktop');

// Make sure the directory exists
if (!fs.existsSync(desktopDir)) {
  fs.mkdirSync(desktopDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, desktopDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, 'banner' + ext); // Save as banner.jpg or banner.png
  },
});

const upload = multer({ storage });

// ✅ GET All Desktop Banners
router.get('/', (req, res) => {
  fs.readdir(desktopDir, (err, files) => {
    if (err) return res.status(500).json({ message: 'Failed to read banners' });

    const urls = files.map(file => ({
      filename: file,
      url: `https://www.api.directhire.in/static/banners/desktop/${file}`
    }));

    res.json(urls);
  });
});

// ✅ Upload Desktop Banner using multer
router.post('/upload', verifyToken, upload.single('banner'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.json({
    success: true,
    filename: req.file.filename,
    url: `https://www.api.directhire.in/static/banners/desktop/${req.file.filename}`,
  });
});

// ✅ Delete Desktop Banner
router.delete('/:filename', verifyToken, (req, res) => {
  const filePath = path.join(desktopDir, req.params.filename);

  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ message: 'Delete failed' });
    res.json({ success: true });
  });
});

export default router;
