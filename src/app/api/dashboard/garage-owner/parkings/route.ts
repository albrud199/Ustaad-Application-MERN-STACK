import { NextRequest, NextResponse } from "next/server";
import { resolveAuthenticatedUser } from "@/lib/server-auth";
import Parking from "@/models/Parking";

export async function GET(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request, "garage_owner");
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parkings = await Parking.find({ garageOwnerId: user._id }).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ parkings });
}

export async function DELETE(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request, "garage_owner");
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const parkingId = searchParams.get("parkingId");
  if (!parkingId) {
    return NextResponse.json({ error: "Missing parkingId" }, { status: 400 });
  }

  await Parking.deleteOne({ _id: parkingId, garageOwnerId: user._id });
  return NextResponse.json({ message: "Parking deleted successfully" });
}
