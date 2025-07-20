const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', // Optional reference to Company model
    required: false
  },
  companyLogo: {
    type: String,
    default: '' // File path to logo image
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true // Full-time, Part-time, Internship
  },
  qualifications: {
    type: String,
    default: ''
  },
  experience: {
    type: String,
    default: ''
  },
  skills: {
    type: String,
    default: ''
  },
  salary: {
    type: String,
    default: ''
  },
  perks: {
    type: String,
    default: ''
  },
  startDate: {
    type: Date
  },
  deadline: {
    type: Date
  },
  notes: {
    type: String,
    default: ''
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin', // Important: Reference to Admin who created the job
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Job', jobSchema);
