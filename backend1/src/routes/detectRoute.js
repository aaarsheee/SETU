const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/detect-asl", async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    const response = await axios.post("http://127.0.0.1:8000/predict", { image });
    res.json(response.data);
  } catch (error) {
    console.error("❌ ASL detection error:", error.message);
    res.status(500).json({ error: "Failed to detect sign" });
  }
});

module.exports = router;
