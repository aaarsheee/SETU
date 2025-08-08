const express = require("express");
const router = express.Router();
const Contact = require("../model/Contact"); // adjust path as needed

router.post("/contact", async (req, res) => {
  const { fullName, email, subject, category, message } = req.body;

  if (!fullName || !email || !subject || !category || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newContact = new Contact({
      fullName,
      email,
      subject,
      category,
      message,
    });

    await newContact.save();

    res.status(201).json({ message: "Contact message saved successfully." });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

module.exports = router;
