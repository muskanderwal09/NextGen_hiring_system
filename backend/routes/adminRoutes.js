const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

// ─── Register ─────────────────────────────────────────────────────────────────
router.post("/register", async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    await newAdmin.save();
    res.status(200).json({
      message: "Admin registered successfully",
      adminId: newAdmin._id
    });
  } catch (error) {
    console.error("Admin registration error:", error);
    res.status(500).json({ error: "Error saving admin" });
  }
});

// ─── Login ────────────────────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    if (admin.password !== password)
      return res.status(401).json({ error: "Incorrect password" });

    res.status(200).json({
      message: "Login successful",
      adminId: admin._id
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ─── Profile ──────────────────────────────────────────────────────────────────
router.get("/profile/:adminId", async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = await Admin.findById(adminId).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json({ admin });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
