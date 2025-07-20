const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  resume: {
    type: String, // File path or URL
    default: '',
  },
  linkedIn: {
    type: String,
    trim: true,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  location: {
    type: String,
    trim: true,
  },
  qualification: {
    type: String,
    trim: true,
  },
  experience: {
    type: String,
    trim: true,
  },
  preferredRole: {
    type: String,
    trim: true,
  },
  skills: {
    type: String,
    required: true,
    trim: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // or 'Candidate' if you're using a Candidate model
    required: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
