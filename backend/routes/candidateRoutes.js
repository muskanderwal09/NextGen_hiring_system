const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcryptjs');
const Candidate = require('../models/Candidate');
const multer = require('multer');

// Multer setup for resume upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename:    (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// ===================== Register =====================
router.post('/register', upload.single('resume'), async (req, res) => {
  try {
    const data = req.body;
    if (!req.file) {
      console.error('❌ Resume file not uploaded');
      return res.status(400).json({ error: 'Resume upload failed' });
    }
    data.resume = req.file.path;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const newCandidate = new Candidate(data);
    await newCandidate.save();

    console.log('✅ Candidate registered:', data.email);
    res.status(200).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('❌ Error in registration route:', err);
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
});

// ===================== Login =====================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await Candidate.findOne({ email });
    if (!candidate) {
      console.warn(`⚠️ Candidate not found with email: ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, candidate.password);
    if (!isMatch) {
      console.warn('⚠️ Invalid password');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log(`✅ Candidate login successful: ${email}`);
    res.status(200).json({ message: 'Login successful', candidate });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// ===================== Get Candidate Info (for job application) =====================
router.get('/getInfo', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: 'Email is required in query' });
    }

    const candidate = await Candidate.findOne({ email });
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    res.status(200).json({
      fullName:      candidate.fullName,
      email:         candidate.email,
      mobile:        candidate.mobile,
      dob:           candidate.dob,
      gender:        candidate.gender,
      location:      candidate.location,
      qualification: candidate.qualification,
      experience:    candidate.experience,
      preferredRole: candidate.preferredRole,
      skills:        candidate.skills,
      linkedIn:      candidate.linkedIn,
      resume:        candidate.resume
    });
  } catch (error) {
    console.error('❌ Error fetching candidate info:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});


// ===================== Get Candidate Profile by ID (for profile page) =====================
router.get('/:userId', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.userId).select('-password');
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.status(200).json(candidate);
  } catch (error) {
    console.error('❌ Error fetching candidate profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
