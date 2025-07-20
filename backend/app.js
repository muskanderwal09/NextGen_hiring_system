// app.js (Backend code)
const multer = require('multer');
const path = require('path');

// Configure storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Save to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with unique filename
  },
});

const upload = multer({ storage: storage });

// Route for uploading the profile image
app.post('/upload-profile-image', upload.single('profileImage'), (req, res) => {
  if (req.file) {
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.json({ message: 'Image uploaded successfully', imageUrl });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});
