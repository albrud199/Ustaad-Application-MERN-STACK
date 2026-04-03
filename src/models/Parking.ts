import mongoose from "mongoose";

const parkingSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    totalSlots: { type: Number, required: true },
    availableSlots: { type: Number, required: true },
    images: [{ type: String }],
    status: { type: String, enum: ["pending", "approved"], default: "pending" },
  },
  { timestamps: true }
);

const Parking = mongoose.models.Parking || mongoose.model("Parking", parkingSchema);
export default Parking;
