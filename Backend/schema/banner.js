import mongoose from 'mongoose';


const imageSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  imageBuffer: Buffer,
});
const Image = mongoose.model('Image', imageSchema);
export default Image;