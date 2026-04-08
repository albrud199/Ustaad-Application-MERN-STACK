import mongoose from "mongoose";

const serviceQuoteSchema = new mongoose.Schema(
  {
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest", required: true },
    garageId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true },
    message: { type: String },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

const ServiceQuote = mongoose.models.ServiceQuote || mongoose.model("ServiceQuote", serviceQuoteSchema);
export default ServiceQuote;
