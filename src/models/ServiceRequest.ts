// src/models/ServiceRequest.ts
import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    carOwnerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    
    serviceType: { type: String, required: true },
    serviceMode: {
      type: String,
      enum: ["general", "emergency"],
      default: "general",
    },
    
    problemDescription: { type: String, required: true },
    
    carDetails: {
      licensePlate: String,
      model: String,
      color: String,
      year: Number,
    },
    
    location: { type: String, required: true },
    latitude: Number,
    longitude: Number,
    
    preferredDate: Date,
    preferredTime: String,
    
    status: { 
      type: String, 
      enum: ["open", "assigned", "in_progress", "completed", "cancelled"], 
      default: "open" 
    },
    
    assignedGarageId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedRepairshopId: { type: mongoose.Schema.Types.ObjectId, ref: "Repairshop" },
    assignedRepairshopOwnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedAt: Date,

    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
    
    estimatedCost: Number,
    actualCost: Number,
    
    images: [String],
    notes: String,
  },
  { timestamps: true }
);

const ServiceRequest = mongoose.models.ServiceRequest || mongoose.model("ServiceRequest", serviceRequestSchema);
export default ServiceRequest;