// src/models/Notification.ts
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    
    type: {
      type: String,
      enum: ["booking", "payment", "service", "system", "admin"],
      required: true,
    },
    
    title: { type: String, required: true },
    message: { type: String, required: true },
    
    relatedId: { type: mongoose.Schema.Types.ObjectId },
    
    isRead: { type: Boolean, default: false },
    readAt: Date,
    
    actionUrl: String,
  },
  { timestamps: true }
);

const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
export default Notification;