const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  name:{
   type: String},
  img: {
    data: Buffer,
    contentType: String,
  },
});

export default mongoose.model("banner", bannerSchema);
