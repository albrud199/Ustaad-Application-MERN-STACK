// src/models/Parking.ts
import mongoose from "mongoose";

const parkingSchema = new mongoose.Schema(
  {
    garageOwnerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    city: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    
    totalSpots: { type: Number, required: true },
    availableSpots: { type: Number, required: true },
    
    pricePerHour: { type: Number, required: true },
    pricePerDay: { type: Number },
    pricePerMonth: { type: Number },
    
    operatingHours: {
      open: { type: String, default: "06:00" },
      close: { type: String, default: "22:00" },
    },
    
    facilities: [String], // ["CCTV", "24/7", "Covered", "Guarded"]
    allowedVehicleTypes: {
      type: [String],
      default: ["sedan", "suv", "truck", "ev", "motorbike"],
    },
    
    images: [String],
    
    status: {
      type: String,
      enum: ["pending", "active", "inactive"],
      default: "pending",
    },
    
    ratings: {
      average: { type: Number, default: 5 },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Parking = mongoose.models.Parking || mongoose.model("Parking", parkingSchema);
export default Parking;