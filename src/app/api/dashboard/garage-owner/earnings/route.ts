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
  const bookings = await Booking.find({ parkingId: { $in: parkingIds } }).distinct("_id");
  const payments = await Payment.find({ referenceType: "booking", referenceId: { $in: bookings }, status: "completed" })
    .sort({ createdAt: -1 })
    .lean();

  const total = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
  const now = new Date();
  const thisMonth = payments.reduce((sum, payment) => {
    const createdAt = new Date(payment.createdAt as string);
    return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear()
      ? sum + (payment.amount || 0)
      : sum;
  }, 0);

  const thisWeek = payments.reduce((sum, payment) => {
    const createdAt = new Date(payment.createdAt as string);
    const diffDays = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7 ? sum + (payment.amount || 0) : sum;
  }, 0);

  return NextResponse.json({
    earnings: {
      thisMonth,
      thisWeek,
      total,
      transactions: payments.map((payment) => ({
        id: String(payment._id),
        date: payment.createdAt,
        amount: payment.amount,
        bookingId: String(payment.referenceId),
      })),
    },
  });
}
