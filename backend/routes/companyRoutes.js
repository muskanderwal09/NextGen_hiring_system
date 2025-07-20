const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Company = require('../models/Company');

// ── Multer Config ──
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ── POST: Register Company ──
router.post('/register', upload.single('logo'), async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const logo = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

    const newCompany = new Company({ name, email, phone, logo });
    await newCompany.save();
    res.status(201).json({ message: 'Company registered', company: newCompany });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// ── GET: All Companies ──
router.get('/', async (req, res) => {
  const companies = await Company.find({});
  res.json(companies);
});

module.exports = router;
