import { NextRequest, NextResponse } from "next/server";
import { resolveAuthenticatedUser } from "@/lib/server-auth";
import Payment from "@/models/Payment";
import Booking from "@/models/Booking";

export async function GET(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request, "car_owner");
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payments = await Payment.find({ userId: user._id })
    .populate({ path: "referenceId", populate: { path: "parkingId", select: "name location city" } })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ payments });
}

export async function POST(request: NextRequest) {
  const user = await resolveAuthenticatedUser(request, "car_owner");
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const payment = await Payment.create({
    userId: user._id,
    referenceType: body.referenceType || "booking",
    referenceId: body.referenceId,
    amount: Number(body.amount || 0),
    currency: body.currency || "BDT",
    paymentMethod: body.paymentMethod || "card",
    status: body.status || "completed",
    transactionId: body.transactionId || `TXN-${Date.now()}`,
    description: body.description || "Parking payment",
    metadata: body.metadata || {},
  });

  if (payment.referenceType === "booking" && payment.referenceId) {
    await Booking.findByIdAndUpdate(payment.referenceId, {
      paymentStatus: payment.status === "completed" ? "paid" : "pending",
      paymentMethod: payment.paymentMethod,
      transactionId: payment.transactionId,
      status: payment.status === "completed" ? "confirmed" : undefined,
    });
  }

  return NextResponse.json({ message: "Payment saved successfully", payment }, { status: 201 });
}
