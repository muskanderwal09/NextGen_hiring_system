const express = require('express'); 
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Application = require('../models/Application');
const Job = require('../models/Job');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage });

// ============================================
// POST: Submit a job application with resume
// ============================================
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const {
      fullName, email, mobile, linkedIn,
      dob, gender, location, qualification,
      experience, preferredRole, skills,
      jobId, userId
    } = req.body;

    if (!fullName || !email || !mobile || !skills || !jobId || !userId) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // ✅ Check if user has already applied for this job
    const existingApplication = await Application.findOne({ jobId, userId });
    if (existingApplication) {
      return res.status(400).json({ message: '⚠️ You have already applied for this job.' });
    }

    const resumePath = req.file ? `uploads/${req.file.filename}` : '';

    const newApplication = new Application({
      fullName,
      email,
      mobile,
      resume: resumePath,
      linkedIn,
      dob,
      gender,
      location,
      qualification,
      experience,
      preferredRole,
      skills,
      jobId,
      userId,
    });

    await newApplication.save();

    res.status(200).json({ message: '✅ Application submitted successfully' });
  } catch (error) {
    console.error('❌ Application submission error:', error);
    res.status(500).json({ error: 'Server error during application submission' });
  }
});

// ============================================
// GET: Get all applications for a user
// ============================================
router.get('/:userId', async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.params.userId })
      .populate('jobId');

    if (applications.length === 0) {
      return res.status(404).json({ message: 'No applications found for this user' });
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error('❌ Error fetching applications:', error);
    res.status(500).json({ error: 'Server error while fetching applications' });
  }
});

// ============================================
// DELETE: Delete a single application by ID
// ============================================
router.delete('/:id', async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(req.params.id);

    if (!deletedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json({ message: '✅ Application deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting application:', error);
    res.status(500).json({ error: 'Server error while deleting application' });
  }
});

module.exports = router;
