const mongoose = require("mongoose");

const donationProgramSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    goalAmount: { type: Number, required: true, min: 0 },
    collectedAmount: { type: Number, default: 0, min: 0 },
    donors: { type: Number, default: 0, min: 0 },
    imageUrl: { type: String, default: "" },
    category: { type: String, default: "General" },
    location: { type: String, default: "" },
    urgent: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const DonationProgram = mongoose.model("DonationProgram", donationProgramSchema);

module.exports = DonationProgram;
