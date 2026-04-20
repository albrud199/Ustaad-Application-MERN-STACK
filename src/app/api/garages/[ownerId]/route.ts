import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/mongoose";
import User from "@/models/User";
import Parking from "@/models/Parking";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ ownerId: string }> }
) {
  try {
    await dbConnect();

    const { ownerId } = await params;
    if (!ownerId || !mongoose.Types.ObjectId.isValid(ownerId)) {
      return NextResponse.json({ error: "Invalid garage owner id" }, { status: 400 });
    }

    const owner = await User.findById(ownerId)
      .select("name email phone ratings garage role status")
      .lean();

    if (!owner || owner.role !== "garage_owner") {
      return NextResponse.json({ error: "Garage not found" }, { status: 404 });
    }

    const parkings = await Parking.find({ garageOwnerId: ownerId, status: "active" })
      .sort({ createdAt: -1 })
      .select("_id name location city latitude longitude pricePerHour totalSpots availableSpots images facilities allowedVehicleTypes")
      .lean();

    return NextResponse.json({
      garage: {
        ownerId: String(owner._id),
        ownerName: owner.name || "",
        ownerEmail: owner.email || "",
        ownerPhone: owner.phone || "",
        ratings: owner.ratings || { average: 5, count: 0 },
        name: owner.garage?.name || `${owner.name || "Garage Owner"} Garage`,
        location: owner.garage?.location || "",
        city: owner.garage?.city || "",
        latitude: Number(owner.garage?.latitude || 0),
        longitude: Number(owner.garage?.longitude || 0),
        capacity: Number(owner.garage?.capacity || 0),
        availableSpots: Number(owner.garage?.availableSpots || 0),
      },
      parkings,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
