import { NextRequest, NextResponse } from "next/server";
import { resolveAuthenticatedUser } from "@/lib/server-auth";
import Parking from "@/models/Parking";
import Booking from "@/models/Booking";
import Payment from "@/models/Payment";

export async function GET(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request, "garage_owner");
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parkingIds = await Parking.find({ garageOwnerId: user._id }).distinct("_id");
  const bookings = await Booking.find({ parkingId: { $in: parkingIds } }).lean();
  const payments = await Payment.find({ referenceType: "booking", referenceId: { $in: bookings.map((booking) => booking._id) }, status: "completed" }).lean();

  const totalRevenue = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const activeBookings = bookings.filter((booking) => ["confirmed", "active"].includes(String(booking.status))).length;
  const pendingBookings = bookings.filter((booking) => String(booking.status) === "pending").length;

  return NextResponse.json({
    stats: {
      totalParkings: parkingIds.length,
      totalBookings: bookings.length,
      activeBookings,
      pendingBookings,
      totalRevenue,
    },
  });
}