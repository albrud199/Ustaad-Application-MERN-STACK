import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ["car_owner", "garage_owner", "admin"], 
      required: true 
    },
    // Account status for admin control
    status: {
      type: String,
      enum: ["active", "suspended", "banned"],
      default: "active",
    },
    // NID Verification
    nidStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    nidNumber: { type: String },
    // Car Owner specific fields
    vehicles: [
      {
        vehicleId: mongoose.Schema.Types.ObjectId,
        licensePlate: String,
        model: String,
      }
    ],
    // Garage Owner specific fields
    garage: {
      name: String,
      location: String,
      capacity: Number,
      operatingHours: { open: String, close: String },
    },
    profilePicture: String,
    phone: String,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;