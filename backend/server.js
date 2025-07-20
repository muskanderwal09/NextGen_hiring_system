const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs'); // ✅ Added bcrypt for password security

// Load environment variables
dotenv.config();

// Import Models and Routes
const Admin = require('./models/Admin');
const candidateRoutes = require('./routes/candidateRoutes');
const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────
app.use(express.json()); // Parsing JSON requests
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// ─── Static Uploads Folder ─────────────────────────────────────
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath)); // ✅ Serve static files

// ─── MongoDB Connection ────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hr-registration', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ─── Admin Register ────────────────────────────────────────────
app.post('/admin-register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // ✅ Hashing password
    const newAdmin = new Admin({ ...req.body, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully', adminId: newAdmin._id });
  } catch (error) {
    console.error('❌ Admin Register Error:', error);
    res.status(500).json({ error: 'Error registering admin' });
  }
});

// ─── Admin Login ───────────────────────────────────────────────
app.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', adminId: admin._id });
  } catch (error) {
    console.error('❌ Admin Login Error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// ─── Admin Profile ─────────────────────────────────────────────
app.get('/admin-profile/:adminId', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.adminId).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ admin });
  } catch (error) {
    console.error('❌ Admin Profile Error:', error);
    res.status(500).json({ message: 'Error fetching admin profile' });
  }
});

// ─── Job Listings API ──────────────────────────────────────────
const Job = require('./models/Job'); // ✅ Ensure Job model is imported

app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find(); // ✅ Corrected database query
    res.status(200).json(jobs);
  } catch (error) {
    console.error('❌ Job Listings Error:', error);
    res.status(500).json({ error: 'Error fetching job listings' });
  }
});

// ─── API Routes ────────────────────────────────────────────────
app.use('/api/candidate', candidateRoutes);
app.use('/api/applications', applicationRoutes);

// ─── Default Route ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.send('🎉 HR Registration Server is running');
});

// ─── Global Error Handling ─────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Unexpected error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ─── Start Server ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
