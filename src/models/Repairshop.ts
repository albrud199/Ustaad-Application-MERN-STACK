import mongoose from "mongoose";

const repairshopSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    location: { type: String, default: "" },
    city: { type: String, default: "" },
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
    services: { type: [String], default: ["general", "emergency", "repair", "maintenance"] },
    emergencyAvailable: { type: Boolean, default: true },
    responseTimeMinutes: { type: Number, default: 30 },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    operatingHours: {
      open: { type: String, default: "08:00" },
      close: { type: String, default: "20:00" },
    },
    status: {
      type: String,
      enum: ["pending", "active", "inactive"],
      default: "active",
    },
    ratings: {
      average: { type: Number, default: 5 },
      count: { type: Number, default: 0 },
    },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Repairshop = mongoose.models.Repairshop || mongoose.model("Repairshop", repairshopSchema);
export default Repairshop;