// models/Blog.js
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
 title:{
    type: String
 },
 preview:{
    type: String
 },
  content:{
    type: String
 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Add other fields as needed (e.g., category, tags, imageURL)
});

const Blogs = mongoose.model('Blogs', blogSchema);
export default Blogs;