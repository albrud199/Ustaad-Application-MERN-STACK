// src/models/User.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ["car_owner", "garage_owner", "admin"], 
      required: true 
    },
    status: {
      type: String,
      enum: ["active", "suspended", "banned"],
      default: "active",
    },
    nidStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    nidNumber: { type: String },
    nidSubmittedAt: { type: Date },
    nidDocuments: {
      frontImage: { type: String },
      backImage: { type: String },
      selfieImage: { type: String },
    },
    phone: { type: String },
    profilePicture: { type: String },
    
    // Car Owner specific
    vehicles: [
      {
        vehicleId: mongoose.Schema.Types.ObjectId,
        licensePlate: String,
        model: String,
        color: String,
        year: Number,
        registrationNumber: String,
      }
    ],
    
    // Garage Owner specific
    garage: {
      name: String,
      location: String,
      city: String,
      latitude: Number,
      longitude: Number,
      capacity: Number,
      availableSpots: Number,
      operatingHours: { 
        open: String,
        close: String 
      },
      pricePerHour: Number,
      facilities: [String], // ["24/7", "CCTV", "Covered", etc.]
    },
    
    // For all users
    ratings: {
      average: { type: Number, default: 5 },
      count: { type: Number, default: 0 },
    },
    
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
  },
  { timestamps: true }
);

// Prevent duplicate model creation
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;