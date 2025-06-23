import express from 'express';
import Blogs from '../schema/blogs.js';

const router = express.Router();

// GET /api/blogs - Fetch all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blogs.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
