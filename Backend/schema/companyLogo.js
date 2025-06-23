import mongoose from 'mongoose';

const companyLogoSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  imageBuffer: Buffer,
 
  // Add other fields as needed (e.g., category, tags, imageURL)
});

const Companylogos = mongoose.model('Companylogos', companyLogoSchema);
export default Companylogos;