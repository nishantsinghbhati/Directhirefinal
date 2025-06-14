import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://directhire21:ULJd44Z0aqp6p5bq@directhire.vrozhnv.mongodb.net/?retryWrites=true&w=majority&appName=directhire');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Initialize GridFS after connection
  
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB; 