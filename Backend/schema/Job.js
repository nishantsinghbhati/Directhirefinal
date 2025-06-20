import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  currentctc: {
    type: String,
    required: true
  },
  expectedctc: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  resume: {
    link: String,
    filename: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Job = mongoose.model('Job', jobSchema);
export default Job; 