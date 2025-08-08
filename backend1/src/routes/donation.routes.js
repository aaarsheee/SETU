const express = require("express");
const DonationProgram = require("../model/DonationProgram.model");

const router = express.Router();

// Create a new donation program (for admin use)
router.post("/donations/programs", async (req, res) => {
  try {
    console.log("✅ Headers:", req.headers);
    console.log("✅ Raw body:", req.body);

    const {
      title,
      description,
      goalAmount,
      imageUrl,
      category = "General",
      location = "Unknown",
      urgent = false,
    } = req.body;

    if (!title || !description || !goalAmount) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const program = new DonationProgram({
      title,
      description,
      goalAmount,
      collectedAmount: 0,    // default to 0 on creation
      donors: 0,             // default to 0 on creation
      imageUrl,
      category,
      location,
      urgent,
    });

    await program.save();
    res.status(201).json({ success: true, program });
  } catch (err) {
    console.error("❌ Error creating donation program:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// Get all donation programs
router.get("/donations/programs", async (req, res) => {
  try {
    const programs = await DonationProgram.find();
    res.status(200).json({ success: true, programs });
  } catch (err) {
    console.error("❌ Error fetching programs:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
