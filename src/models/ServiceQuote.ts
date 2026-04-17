// src/models/ServiceQuote.ts
import mongoose from "mongoose";

const serviceQuoteSchema = new mongoose.Schema(
  {
    serviceRequestId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "ServiceRequest", 
      required: true 
    },
    
    garageOwnerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    
    carOwnerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    
    estimatedCost: { type: Number, required: true },
    estimatedDays: { type: Number, required: true },
    description: { type: String, required: true },
    
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
    
    acceptedAt: Date,
    rejectedAt: Date,
    completedAt: Date,
    
    notes: String,
  },
  { timestamps: true }
);

const ServiceQuote = mongoose.models.ServiceQuote || mongoose.model("ServiceQuote", serviceQuoteSchema);
export default ServiceQuote;