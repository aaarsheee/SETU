const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    productId: { type: String, ref: "DonationProgram", required: true },
    amount: { type: Number, required: true, min: 1 },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
