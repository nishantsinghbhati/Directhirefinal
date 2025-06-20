// models/Blog.js
const mongoose = require('mongoose');

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

module.exports = mongoose.model('Blog', blogSchema);