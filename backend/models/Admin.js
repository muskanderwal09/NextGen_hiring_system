// backend/models/Admin.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // Don't send password to frontend
  company: String,
  number: String,
  dob: Date,
});

module.exports = mongoose.model("Admin", adminSchema);
