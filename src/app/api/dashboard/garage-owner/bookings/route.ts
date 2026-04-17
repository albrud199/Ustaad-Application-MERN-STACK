import { NextRequest, NextResponse } from "next/server";
import { resolveAuthenticatedUser } from "@/lib/server-auth";
import Parking from "@/models/Parking";
import Booking from "@/models/Booking";

export async function GET(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request, "garage_owner");
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parkingIds = await Parking.find({ garageOwnerId: user._id }).distinct("_id");
  const bookings = await Booking.find({ parkingId: { $in: parkingIds } })
    .populate("carOwnerId", "name email")
    .populate("parkingId", "name location city pricePerHour")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ bookings });
}
