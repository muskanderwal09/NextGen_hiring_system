const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = 'uploads/companyLogos';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ─── Multer Config ─────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// ─── POST: Create Job ──────────────────────────────────────────
router.post('/create', upload.single('companyLogo'), async (req, res) => {
  try {
    const {
      title, company, companyId, location, type, qualifications, experience, skills, salary, perks,
      startDate, deadline, description, notes, postedBy
    } = req.body;

    if (!title || !company || !location || !type || !description || !postedBy) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const companyLogoPath = req.file ? `/uploads/companyLogos/${req.file.filename}` : '';

    const newJob = new Job({
      title, company, companyId, companyLogo: companyLogoPath, location, type, qualifications,
      experience, skills, salary, perks, startDate, deadline, description, notes, postedBy
    });

    await newJob.save();
    res.status(201).json({ message: 'Job created successfully', job: newJob });
  } catch (err) {
    console.error('❌ Error creating job:', err);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// ─── GET: All Jobs ────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    console.error('❌ Error fetching jobs:', err);
    res.status(500).json({ error: 'Failed to retrieve job listings' });
  }
});

// ─── GET: Jobs by Admin ───────────────────────────────────────
router.get('/admin/:adminId', async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.params.adminId }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error('❌ Error fetching admin jobs:', err);
    res.status(500).json({ error: 'Failed to fetch jobs for admin' });
  }
});

// ─── PUT: Edit Job by ID ──────────────────────────────────────
router.put('/edit/:id', upload.single('companyLogo'), async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    if (job.postedBy.toString() !== req.body.postedBy) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.companyLogo = `/uploads/companyLogos/${req.file.filename}`;
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json({ message: 'Job updated successfully', job: updatedJob });
  } catch (err) {
    console.error('❌ Error editing job:', err);
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// ─── DELETE: Delete Job by ID ─────────────────────────────────
router.delete('/delete/:id', async (req, res) => {
  try {
    const { adminId } = req.body;
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    if (job.postedBy.toString() !== adminId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting job:', err);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

// ─── GET: Single Job by ID ────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    console.error('❌ Error fetching job:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ─── GET: Search & Filter ─────────────────────────────────────
router.get('/search/filter', async (req, res) => {
  try {
    const { title, location, type, skills } = req.query;
    const filter = {};
    if (title) filter.title = new RegExp(title, 'i');
    if (location) filter.location = new RegExp(location, 'i');
    if (type) filter.type = type;
    if (skills) filter.skills = new RegExp(skills, 'i');

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error('❌ Error filtering jobs:', err);
    res.status(500).json({ error: 'Failed to filter jobs' });
  }
});

module.exports = router;
