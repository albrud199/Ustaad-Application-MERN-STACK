// src/models/Payment.ts
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    
    referenceType: {
      type: String,
      enum: ["booking", "subscription", "service"],
      required: true,
    },
    referenceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    
    amount: { type: Number, required: true },
    currency: { type: String, default: "BDT" },
    
    paymentMethod: {
      type: String,
      enum: ["card", "bank_transfer", "cash", "wallet"],
      required: true,
    },
    
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    
    transactionId: { type: String, unique: true },
    
    description: String,
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
export default Payment;