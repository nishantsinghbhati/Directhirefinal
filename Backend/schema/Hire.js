import mongoose from 'mongoose';

const hireSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    enum: ['remote', 'onsite', 'hybrid'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Hire = mongoose.model('Hire', hireSchema);

export default Hire;
