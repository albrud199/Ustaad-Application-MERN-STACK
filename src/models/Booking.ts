// src/models/Booking.ts
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    carOwnerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    parkingId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Parking", 
      required: true 
    },
    
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "User.vehicles" },
    vehicleDetails: {
      licensePlate: String,
      model: String,
      color: String,
    },
    
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number }, // in hours
    
    totalPrice: { type: Number, required: true },
    
    status: { 
      type: String, 
      enum: ["pending", "confirmed", "active", "completed", "cancelled"], 
      default: "pending" 
    },
    
    paymentStatus: { 
      type: String, 
      enum: ["pending", "paid", "refunded"], 
      default: "pending" 
    },
    
    paymentMethod: { type: String }, // "card", "cash", "wallet"
    transactionId: { type: String },
    
    notes: String,
    
    cancelledBy: String,
    cancellationReason: String,
  },
  { timestamps: true }
);

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
export default Booking;