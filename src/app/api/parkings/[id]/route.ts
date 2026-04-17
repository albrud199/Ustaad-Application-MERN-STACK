import { dbConnect } from "@/lib/mongoose";
import Parking from "@/models/Parking";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid parking id" }, { status: 400 });
    }

    const parking = await Parking.findById(id)
      .populate("garageOwnerId", "name email phone")
      .lean();

    if (!parking) {
      return NextResponse.json({ error: "Parking not found" }, { status: 404 });
    }

    return NextResponse.json({ data: parking });
  } catch (error) {
    console.error("Get parking by id error:", error);
    return NextResponse.json({ error: "Failed to fetch parking" }, { status: 500 });
  }
}
