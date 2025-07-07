import mongoose from 'mongoose';


const bannerSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  imageBuffer: Buffer,
});
const Banner = mongoose.model('Banner', bannerSchema);
export default Banner;