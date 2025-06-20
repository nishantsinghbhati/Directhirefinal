// models/Blog.js
const mongoose = require('mongoose');

const companyLogoSchema = new mongoose.Schema({
 name:{
    type: String
 },
 img: {
    data: Buffer,
    contentType: String,
  },
 
  // Add other fields as needed (e.g., category, tags, imageURL)
});

module.exports = mongoose.model('CompanyLogo', companyLogoSchema);