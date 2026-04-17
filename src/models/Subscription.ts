// src/models/Subscription.ts
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    
    planType: {
      type: String,
      enum: ["monthly_parking", "premium_service", "unlimited_access"],
      required: true,
    },
    
    price: { type: Number, required: true },
    currency: { type: String, default: "BDT" },
    
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    
    autoRenew: { type: Boolean, default: true },
    
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
    
    benefits: [String],
  },
  { timestamps: true }
);

const Subscription = mongoose.models.Subscription || mongoose.model("Subscription", subscriptionSchema);
export default Subscription;