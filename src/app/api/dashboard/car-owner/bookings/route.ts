import { NextRequest, NextResponse } from "next/server";
import { resolveAuthenticatedUser } from "@/lib/server-auth";
import Booking from "@/models/Booking";

export async function GET(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request, "car_owner");
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "all";
  const now = new Date();

  const filter: Record<string, unknown> = { carOwnerId: user._id };
  if (status === "active") {
    filter.status = { $in: ["confirmed", "active"] };
    filter.endTime = { $gte: now };
  } else if (status === "upcoming") {
    filter.status = { $in: ["pending", "confirmed"] };
    filter.startTime = { $gte: now };
  } else if (status === "past") {
    filter.$or = [{ endTime: { $lt: now } }, { status: { $in: ["completed", "cancelled"] } }];
  }

  const bookings = await Booking.find(filter)
    .populate("parkingId", "name location city pricePerHour images")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ bookings });
}
