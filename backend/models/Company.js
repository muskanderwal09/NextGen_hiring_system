const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  logo: String // will store image URL
});

module.exports = mongoose.model('Company', companySchema);
