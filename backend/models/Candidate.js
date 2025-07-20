const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // import bcryptjs

const candidateSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
  resume: String,  // Store file path
  linkedIn: String,
  dob: String,
  gender: String,
  location: String,
  qualification: String,
  experience: String,
  preferredRole: String,
  skills: String,
});


// Update your schema to hash passwords
candidateSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});


module.exports = mongoose.model('Candidate', candidateSchema);
