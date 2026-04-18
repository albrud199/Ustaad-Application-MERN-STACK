// src/app/api/bookings/cancel/route.ts
import { dbConnect } from "@/lib/mongoose";
import Booking from "@/models/Booking";
import Parking from "@/models/Parking";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch {
    return null;
  }
}

/**
 * POST /api/bookings/cancel
 * Cancel a booking and refund if applicable
 */
export async function POST(request: NextRequest) {
  try {
    // ===== VERIFY TOKEN =====
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.slice(7);
    const decoded = verifyToken(token) as any;
    
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    await dbConnect();

    // ===== GET REQUEST BODY =====
    const body = await request.json();
    const { bookingId, cancellationReason } = body;

    // ===== VALIDATE REQUIRED FIELDS =====
    if (!bookingId) {
      return NextResponse.json(
        { error: "Missing bookingId" },
        { status: 400 }
      );
    }

    // ===== GET BOOKING =====
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // ===== VERIFY USER IS THE BOOKING OWNER =====
    if (booking.carOwnerId.toString() !== decoded.userId) {
      return NextResponse.json(
        { error: "Unauthorized: This booking does not belong to you" },
        { status: 403 }
      );
    }

    // ===== CHECK IF ALREADY CANCELLED =====
    if (booking.status === "cancelled") {
      return NextResponse.json(
        { error: "This booking is already cancelled" },
        { status: 400 }
      );
    }

    // ===== UPDATE BOOKING =====
    booking.status = "cancelled";
    booking.cancelledBy = "car_owner";
    booking.cancellationReason = cancellationReason || "User initiated cancellation";
    await booking.save();

    // ===== RESTORE PARKING AVAILABILITY =====
    await Parking.findByIdAndUpdate(
      booking.parkingId,
      { $inc: { availableSpots: 1 } }
    );

    // ===== RETURN RESPONSE =====
    return NextResponse.json(
      {
        message: "✅ Booking cancelled successfully",
        booking: {
          _id: booking._id,
          status: booking.status,
          cancellationReason: booking.cancellationReason,
        },
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ Booking cancellation error:", error);
    return NextResponse.json(
      { error: "Failed to cancel booking" },
      { status: 500 }
    );
  }
}
