const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
module.exports = Contact;